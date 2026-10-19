const vm=require('node:vm');const fs=require('node:fs');
let agenda,fetchMock;
beforeEach(()=>{
  const listeners={};fetchMock=jest.fn();let factory;
  const context={document:{getElementById:()=>null,addEventListener:(name,fn)=>{listeners[name]=fn;},documentElement:{dataset:{}}},Alpine:{data:(_name,f)=>{factory=f;}},fetch:fetchMock,Intl,Date,Error};
  vm.runInNewContext(fs.readFileSync('public/app.js','utf8'),context);listeners['alpine:init']();agenda=factory();
});
function respond(value,ok=true){fetchMock.mockResolvedValueOnce({ok,json:async()=>value});}
test('carga la agenda y libera el estado de espera',async()=>{respond([{id:1}]);await agenda.init();expect(agenda.appointments).toEqual([{id:1}]);expect(agenda.loading).toBe(false);});
test('un fallo de red permite reintentar y muestra recuperación',async()=>{fetchMock.mockRejectedValueOnce(new Error('Sin conexión'));await agenda.refresh();expect(agenda.error).toContain('pulsa Actualizar');expect(agenda.loading).toBe(false);respond([]);await agenda.refresh();expect(agenda.error).toBe('');});
test('reserva con datos exactos; añade confirmación y limpia formulario',async()=>{
  agenda.form={patient:'Ana',age:18,doctor:'adulta',date:'2026-10-20',time:'09:00'};
  const row={id:1,patient:'Ana',age:18,doctor:'adulta',start:1792504800000,end:1792506600000,status:'confirmada',fee:0};respond(row);await agenda.book();
  expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({patient:'Ana',age:18,doctor:'adulta',start:'2026-10-20T09:00'});
  expect(agenda.appointments[0]).toEqual(row);expect(agenda.message).toContain('Cita confirmada');expect(agenda.form.patient).toBe('');expect(agenda.saving).toBe(false);
});
test('conflicto del servidor conserva el formulario y muestra mensaje',async()=>{agenda.form.patient='Ana';respond({error:'Ese horario ya está reservado.'},false);await agenda.book();expect(agenda.error).toBe('Ese horario ya está reservado.');expect(agenda.form.patient).toBe('Ana');expect(agenda.saving).toBe(false);});
test('cancelación envía emergencia y refleja el cargo persistido',async()=>{agenda.appointments=[{id:1,status:'confirmada'}];agenda.beginCancel(agenda.appointments[0]);agenda.emergency=true;respond({id:1,status:'cancelada',fee:0});await agenda.cancel({id:1});expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({emergency:true});expect(agenda.appointments[0].status).toBe('cancelada');expect(agenda.message).toContain('sin cargo');expect(agenda.cancelling).toBe(null);});
test('filtros combinan nombre y estado',()=>{agenda.appointments=[{patient:'Ana Pérez',status:'confirmada'},{patient:'ANA',status:'cancelada'},{patient:'Luis',status:'confirmada'}];agenda.search='  ana  ';agenda.filter='confirmada';expect(agenda.filtered().map(a=>a.patient)).toEqual(['Ana Pérez']);});
test('sugerencia de especialidad cambia en los 18 años',()=>{agenda.form.age=17;agenda.chooseDoctor();expect(agenda.form.doctor).toBe('pediatrica');agenda.form.age=18;agenda.chooseDoctor();expect(agenda.form.doctor).toBe('adulta');});
test('ignora doble envío mientras hay una petición pendiente',async()=>{agenda.saving=true;await agenda.book();await agenda.cancel({id:1});expect(fetchMock).not.toHaveBeenCalled();});

test('actualización bloquea escrituras hasta resolver GET',async()=>{
 let finish;fetchMock.mockReturnValueOnce(new Promise(resolve=>{finish=resolve;}));
 const pending=agenda.refresh();expect(agenda.loading).toBe(true);
 await agenda.book();await agenda.cancel({id:1});expect(fetchMock).toHaveBeenCalledTimes(1);
 finish({ok:true,json:async()=>[]});await pending;expect(agenda.loading).toBe(false);
});
test('no se inicia GET durante reserva ni cancelación pendiente',async()=>{
 let finish;fetchMock.mockReturnValueOnce(new Promise(resolve=>{finish=resolve;}));
 const pending=agenda.book();expect(agenda.saving).toBe(true);
 await agenda.refresh();expect(fetchMock).toHaveBeenCalledTimes(1);
 finish({ok:true,json:async()=>({id:1,patient:'Ana',start:1792504800000})});await pending;
 expect(agenda.appointments).toHaveLength(1);expect(agenda.message).toContain('Cita confirmada');
});
