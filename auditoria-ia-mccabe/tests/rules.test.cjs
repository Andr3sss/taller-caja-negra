const { checkPatient, parseStart, checkSchedule, cancellationFee } = require('../src/rules.cjs');
const now = new Date('2026-10-19T07:00:00-05:00');
describe('Edad y datos del paciente', () => {
  test.each([[0,'pediatrica'],[17,'pediatrica'],[18,'adulta'],[120,'adulta']])('edad %i: %s', (age,doctor)=>expect(checkPatient({patient:'  Ana Pérez  ',age,doctor})).toBe('Ana Pérez'));
  test.each([
    [{patient:null,age:20,doctor:'adulta'},'PATIENT'],[{patient:'A',age:20,doctor:'adulta'},'PATIENT'],
    [{patient:'A'.repeat(101),age:20,doctor:'adulta'},'PATIENT'],[{patient:'Ana',age:18.5,doctor:'adulta'},'AGE'],
    [{patient:'Ana',age:'18',doctor:'adulta'},'AGE'],[{patient:'Ana',age:-1,doctor:'pediatrica'},'AGE'],
    [{patient:'Ana',age:121,doctor:'adulta'},'AGE'],[{patient:'Ana',age:17,doctor:'adulta'},'SPECIALTY'],
    [{patient:'Ana',age:18,doctor:'pediatrica'},'SPECIALTY'],[{patient:'Ana',age:18,doctor:'desconocido'},'SPECIALTY']
  ])('rechaza entrada inválida %#', (data,code)=>expect(()=>checkPatient(data)).toThrow(expect.objectContaining({code})));
});
describe('Fechas reales y horario local fijo de Quito', () => {
  test('convierte de Quito a UTC',()=>expect(parseStart('2026-10-19T08:00').toISOString()).toBe('2026-10-19T13:00:00.000Z'));
  test.each([null,'ayer','2026-02-30T09:00','2026-13-19T09:00','2026-10-19T25:00','2026-10-19T09:00Z'])('rechaza %s',v=>expect(()=>parseStart(v)).toThrow(expect.objectContaining({code:'DATE'})));
  test.each(['2026-10-19T08:00','2026-10-19T11:30','2026-10-19T13:00','2026-10-19T16:30'])('acepta %s',v=>expect(()=>checkSchedule(parseStart(v),now)).not.toThrow());
  test.each([
    ['2026-10-19T07:00','PAST'],['2026-10-18T08:00','PAST'],['2026-10-24T08:00','SCHEDULE'],
    ['2026-10-25T08:00','SCHEDULE'],['2026-10-20T07:30','SCHEDULE'],['2026-10-19T17:00','SCHEDULE'],
    ['2026-10-19T12:00','SCHEDULE'],['2026-10-19T12:30','SCHEDULE'],['2026-10-19T08:15','SCHEDULE']
  ])('bloquea %s', (v,code)=>expect(()=>checkSchedule(parseStart(v),now)).toThrow(expect.objectContaining({code})));
});
describe('Frontera de las 24 horas',()=>{
  const t=now.getTime();
  test.each([[86400001,false,0],[86400000,false,0],[86399999,false,1000],[1,false,1000],[86399999,true,0]])('%i ms, emergencia %s: %i centavos',(delta,emergency,fee)=>expect(cancellationFee(t+delta,t,emergency)).toBe(fee));
  test.each([0,-1])('cita iniciada (%i)',d=>expect(()=>cancellationFee(t+d,t,false)).toThrow(expect.objectContaining({code:'STARTED'})));
  test.each([undefined,'false',0])('emergencia debe ser booleana: %s',v=>expect(()=>cancellationFee(t+86400000,t,v)).toThrow(expect.objectContaining({code:'EMERGENCY'})));
});
