const request=require('supertest');
const {openDb}=require('../src/db.cjs');
const {createApp}=require('../src/app.cjs');
let db,app,now;
const booking={patient:'Paciente de prueba',age:30,doctor:'adulta',start:'2026-10-20T09:00'};
beforeEach(()=>{db=openDb();now=new Date('2026-10-19T09:00:00-05:00');app=createApp(db,()=>now);});
afterEach(()=>db.close());
test('catálogo con ambos profesionales',async()=>{const r=await request(app).get('/api/doctors');expect(r.status).toBe(200);expect(r.body.map(d=>d.id)).toEqual(['adulta','pediatrica']);});
test('agenda inicialmente vacía',async()=>{const r=await request(app).get('/api/appointments');expect(r.body).toEqual([]);});
test('reserva persistida y listada con duración de 30 minutos',async()=>{
  const r=await request(app).post('/api/appointments').send(booking);expect(r.status).toBe(201);
  expect(r.body).toMatchObject({id:1,patient:booking.patient,status:'confirmada',fee:0});expect(r.body.end-r.body.start).toBe(1800000);
  const rows=await request(app).get('/api/appointments');expect(rows.body).toEqual([r.body]);
});
test('doble reserva rechazada sin duplicar registros',async()=>{
  await request(app).post('/api/appointments').send(booking);
  const r=await request(app).post('/api/appointments').send(booking);expect(r.status).toBe(409);expect(r.body.code).toBe('CONFLICT');
  expect(db.prepare('SELECT count(*) n FROM appointments').get().n).toBe(1);
});
test('dos peticiones concurrentes no reservan el mismo espacio',async()=>{
  const results=await Promise.all([request(app).post('/api/appointments').send(booking),request(app).post('/api/appointments').send(booking)]);
  expect(results.map(r=>r.status).sort()).toEqual([201,409]);expect(db.prepare('SELECT count(*) n FROM appointments').get().n).toBe(1);
});
test('solapamiento parcial también se bloquea',async()=>{
  const start=new Date('2026-10-20T08:45:00-05:00').getTime();
  db.prepare('INSERT INTO appointments(patient,age,doctor,start,end) VALUES (?,?,?,?,?)').run('Otro paciente',30,'adulta',start,start+1800000);
  const r=await request(app).post('/api/appointments').send(booking);expect(r.status).toBe(409);expect(r.body.code).toBe('CONFLICT');
});
test('citas contiguas permitidas',async()=>{await request(app).post('/api/appointments').send(booking);const r=await request(app).post('/api/appointments').send({...booking,start:'2026-10-20T09:30'});expect(r.status).toBe(201);});
test('otro profesional puede reservar la misma hora',async()=>{await request(app).post('/api/appointments').send(booking);const r=await request(app).post('/api/appointments').send({...booking,age:17,doctor:'pediatrica'});expect(r.status).toBe(201);});
test.each([[false,1000],[true,0]])('cancelación tardía emergencia %s, cargo %i',async(emergency,fee)=>{
  await request(app).post('/api/appointments').send(booking);now=new Date('2026-10-20T08:00:00-05:00');
  const r=await request(app).post('/api/appointments/1/cancel').send({emergency});expect(r.status).toBe(200);expect(r.body).toMatchObject({status:'cancelada',fee,emergency:Number(emergency)});
  expect(db.prepare('SELECT fee FROM appointments WHERE id=1').get().fee).toBe(fee);
});
test('24 horas exactas: sin cargo',async()=>{await request(app).post('/api/appointments').send(booking);const r=await request(app).post('/api/appointments/1/cancel').send({emergency:false});expect(r.body.fee).toBe(0);});
test('cancelar libera el horario',async()=>{await request(app).post('/api/appointments').send(booking);await request(app).post('/api/appointments/1/cancel').send({emergency:false});const r=await request(app).post('/api/appointments').send(booking);expect(r.status).toBe(201);});
test('segunda cancelación no modifica el cargo',async()=>{await request(app).post('/api/appointments').send(booking);now=new Date('2026-10-20T08:00:00-05:00');await request(app).post('/api/appointments/1/cancel').send({emergency:false});const r=await request(app).post('/api/appointments/1/cancel').send({emergency:true});expect(r.status).toBe(409);expect(r.body.code).toBe('CANCELLED');expect(db.prepare('SELECT fee FROM appointments WHERE id=1').get().fee).toBe(1000);});
test('cita iniciada no cambia su estado',async()=>{await request(app).post('/api/appointments').send(booking);now=new Date('2026-10-20T09:00:00-05:00');const r=await request(app).post('/api/appointments/1/cancel').send({emergency:false});expect(r.status).toBe(409);expect(r.body.code).toBe('STARTED');expect(db.prepare('SELECT status FROM appointments WHERE id=1').get().status).toBe('confirmada');});
test('cita inexistente',async()=>{const r=await request(app).post('/api/appointments/999/cancel').send({emergency:false});expect(r.status).toBe(404);expect(r.body.code).toBe('NOT_FOUND');});
test('entrada incorrecta rechazada antes de persistir',async()=>{const r=await request(app).post('/api/appointments').send({...booking,age:-1});expect(r.status).toBe(400);expect(r.body.code).toBe('AGE');expect(db.prepare('SELECT count(*) n FROM appointments').get().n).toBe(0);});
test('JSON malformado',async()=>{const r=await request(app).post('/api/appointments').set('Content-Type','application/json').send('{');expect(r.status).toBe(400);expect(r.body.code).toBe('JSON');});
test('ruta desconocida',async()=>{const r=await request(app).get('/no-existe');expect(r.status).toBe(404);});
test('POST sin objeto JSON no produce error interno',async()=>{const r=await request(app).post('/api/appointments');expect(r.status).toBe(400);expect(r.body.code).toBe('BODY');});
test('error interno no filtra información de SQLite',async()=>{const log=jest.spyOn(console,'error').mockImplementation(()=>{});db.close();const r=await request(app).get('/api/appointments');expect(r.status).toBe(500);expect(r.body).toEqual({code:'INTERNAL',error:'No se pudo completar la operación.'});log.mockRestore();db=openDb();});
test.each(['/','/app.js','/style.css','/vendor/cdn.min.js','/assets/source-sans-3.ttf'])('recurso frontend: %s',async(url)=>{const r=await request(app).get(url);expect(r.status).toBe(200);expect(r.body || r.text).toBeTruthy();});
