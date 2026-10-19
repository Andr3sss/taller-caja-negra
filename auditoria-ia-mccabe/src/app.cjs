const express = require('express');
const path = require('node:path');
const { doctors, RuleError, checkPatient, parseStart, checkSchedule, cancellationFee } = require('./rules.cjs');
function createApp(db, clock = () => new Date()) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));
  app.use((req, _res, next) => {
    if (req.method !== 'POST') return next();
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) throw new RuleError('BODY', 'Envía un objeto JSON con los datos de la operación.');
    next();
  });
  app.get('/api/doctors', (_req, res) => res.json(doctors));
  app.get('/api/appointments', (_req, res) => res.json(db.prepare('SELECT * FROM appointments ORDER BY start,id').all()));
  app.post('/api/appointments', (req, res) => {
    const patient = checkPatient(req.body);
    const start = parseStart(req.body.start);
    checkSchedule(start, clock());
    const end = start.getTime() + 30 * 60000;
    db.exec('BEGIN IMMEDIATE');
    try {
      const conflict = db.prepare("SELECT id FROM appointments WHERE status='confirmada' AND doctor=? AND start < ? AND end > ?").get(req.body.doctor, end, start.getTime());
      if (conflict) throw new RuleError('CONFLICT', 'Ese horario ya está reservado. Selecciona otro.', 409);
      const result = db.prepare('INSERT INTO appointments(patient,age,doctor,start,end) VALUES (?,?,?,?,?)').run(patient, req.body.age, req.body.doctor, start.getTime(), end);
      const row = db.prepare('SELECT * FROM appointments WHERE id=?').get(result.lastInsertRowid);
      db.exec('COMMIT');
      res.status(201).json(row);
    } catch (error) { db.exec('ROLLBACK'); throw error; }
  });
  app.post('/api/appointments/:id/cancel', (req, res) => {
    const row = db.prepare('SELECT * FROM appointments WHERE id=?').get(req.params.id);
    if (!row) throw new RuleError('NOT_FOUND', 'No se encontró la cita.', 404);
    if (row.status === 'cancelada') throw new RuleError('CANCELLED', 'La cita ya está cancelada.', 409);
    const fee = cancellationFee(row.start, clock().getTime(), req.body.emergency);
    db.prepare("UPDATE appointments SET status='cancelada',fee=?,emergency=? WHERE id=?").run(fee, Number(req.body.emergency), row.id);
    res.json(db.prepare('SELECT * FROM appointments WHERE id=?').get(row.id));
  });
  app.use('/vendor', express.static(path.join(__dirname, '../node_modules/alpinejs/dist')));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use((_req, res) => res.status(404).json({ code: 'NOT_FOUND', error: 'Ruta no encontrada.' }));
  app.use((error, _req, res, _next) => {
    if (error instanceof RuleError) return res.status(error.status).json({ code: error.code, error: error.message });
    if (error.type === 'entity.parse.failed') return res.status(400).json({ code: 'JSON', error: 'El cuerpo JSON no es válido.' });
    console.error(error);
    res.status(500).json({ code: 'INTERNAL', error: 'No se pudo completar la operación.' });
  });
  return app;
}
module.exports = { createApp };
