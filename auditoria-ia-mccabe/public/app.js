document.addEventListener('keydown', () => { document.documentElement.dataset.keyboard = ''; });
document.addEventListener('pointerdown', () => { delete document.documentElement.dataset.keyboard; });
document.addEventListener('alpine:init', () => {
  Alpine.data('agenda', () => ({
    tab: 'agenda', appointments: [], loading: false, saving: false, error: '', message: '', search: '', filter: 'todas', cancelling: null, emergency: false,
    form: { patient: '', age: '', doctor: '', date: '', time: '' },
    today: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guayaquil', year:'numeric',month:'2-digit',day:'2-digit' }).format(new Date()),
    slots: ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'],
    async init() { await this.refresh(); },
    async request(url, options = {}) {
      const res = await fetch(url, { ...options, headers: { 'Content-Type':'application/json' } });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'No se pudo completar la operación.');
      return result;
    },
    async refresh() {
      if (this.saving || this.loading) return;
      this.loading = true; this.error = '';
      try { this.appointments = await this.request('/api/appointments'); }
      catch (e) { this.error = 'No se pudo cargar la agenda. Comprueba la conexión y pulsa Actualizar. ' + e.message; }
      finally { this.loading = false; }
    },
    chooseDoctor() { this.form.doctor = this.form.age === '' ? '' : Number(this.form.age)<18 ? 'pediatrica' : 'adulta'; },
    async book() {
      if (this.saving || this.loading) return;
      this.saving = true; this.error = ''; this.message = '';
      try {
        const item = await this.request('/api/appointments', { method:'POST', body:JSON.stringify({ patient:this.form.patient, age:Number(this.form.age), doctor:this.form.doctor, start:this.form.date+'T'+this.form.time }) });
        this.appointments.push(item); this.appointments.sort((a,b)=>a.start-b.start);
        this.search=''; this.filter='todas';
        this.message = 'Cita confirmada para ' + item.patient + ' el ' + this.dateLabel(item.start) + ' a las ' + this.time(item.start) + '.';
        this.form = { patient:'', age:'', doctor:'', date:'', time:'' };
      } catch (e) { this.error=e.message; }
      finally { this.saving=false; }
    },
    beginCancel(item) { this.cancelling=item.id; this.emergency=false; this.error=''; this.message=''; },
    focus(id) { const target=document.getElementById(id); if(target) target.focus(); },
    closeCancel(id) { this.cancelling=null; this.focus('cancel-trigger-'+id); },
    estimatedFee(item) { return item.start-Date.now()<86400000 && !this.emergency; },
    async cancel(item) {
      if (this.saving || this.loading) return;
      this.saving=true; this.error=''; this.message='';
      try {
        const updated=await this.request('/api/appointments/'+item.id+'/cancel', { method:'POST', body:JSON.stringify({ emergency:this.emergency }) });
        this.appointments=this.appointments.map(a=>a.id===updated.id ? updated : a);
        this.cancelling=null; this.focus('schedule-title');
        this.message=updated.fee ? 'Cita cancelada. Cargo registrado: '+this.money(updated.fee)+'.' : 'Cita cancelada sin cargo.';
      } catch(e) { this.error=e.message; }
      finally { this.saving=false; }
    },
    filtered() { const q=this.search.trim().toLocaleLowerCase('es'); return this.appointments.filter(a=>(this.filter==='todas'||a.status===this.filter) && a.patient.toLocaleLowerCase('es').includes(q)); },
    countLabel() { const n=this.appointments.filter(a=>a.status==='confirmada'&&a.start>Date.now()).length; return n===1 ? '1 próxima consulta confirmada' : n+' próximas consultas confirmadas'; },
    doctorName(id) { return id==='adulta' ? 'Dra. Sofía Torres' : 'Dr. Mateo Ruiz'; },
    format(value, options) { return new Intl.DateTimeFormat('es-EC', { timeZone:'America/Guayaquil', ...options }).format(new Date(value)); },
    day(v) { return this.format(v,{day:'2-digit'}); }, month(v) { return this.format(v,{month:'short'}).replace('.',''); },
    time(v) { return this.format(v,{hour:'2-digit',minute:'2-digit',hourCycle:'h23'}); },
    dateLabel(v) { return this.format(v,{weekday:'short',day:'numeric',month:'short',year:'numeric'}); },
    money(cents) { return new Intl.NumberFormat('es-EC',{style:'currency',currency:'USD'}).format(cents/100); }
  }));
});
