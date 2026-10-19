const { penalty } = require('./penalty.cjs');
const doctors = [
  { id: 'adulta', name: 'Dra. Sofía Torres', specialty: 'Medicina familiar · adultos' },
  { id: 'pediatrica', name: 'Dr. Mateo Ruiz', specialty: 'Medicina familiar · pediatría' }
];
class RuleError extends Error {
  constructor(code, message, status = 400) { super(message); this.code = code; this.status = status; }
}
function checkPatient(body) {
  if (typeof body.patient !== 'string') throw new RuleError('PATIENT', 'Escribe el nombre del paciente.');
  const patient = body.patient.trim();
  if (patient.length < 2) throw new RuleError('PATIENT', 'El nombre debe tener al menos 2 caracteres.');
  if (patient.length > 100) throw new RuleError('PATIENT', 'El nombre debe tener como máximo 100 caracteres.');
  if (!Number.isInteger(body.age)) throw new RuleError('AGE', 'La edad debe ser un número entero.');
  if (body.age < 0) throw new RuleError('AGE', 'La edad no puede ser negativa.');
  if (body.age > 120) throw new RuleError('AGE', 'La edad no puede superar los 120 años.');
  const expected = body.age < 18 ? 'pediatrica' : 'adulta';
  if (body.doctor !== expected) throw new RuleError('SPECIALTY', 'Selecciona la consulta que corresponde a la edad.');
  return patient;
}
function parseStart(value) {
  if (typeof value !== 'string') throw new RuleError('DATE', 'Selecciona fecha y hora de la cita.');
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new RuleError('DATE', 'Usa una fecha y hora local válidas.');
  const date = new Date(`${value}:00-05:00`);
  if (!Number.isFinite(date.getTime())) throw new RuleError('DATE', 'La fecha indicada no existe.');
  if (new Date(date.getTime() - 5 * 3600000).toISOString().slice(0, 16) !== value) throw new RuleError('DATE', 'La fecha indicada no existe.');
  return date;
}
function checkSchedule(start, now) {
  if (start <= now) throw new RuleError('PAST', 'Elige una cita posterior a la hora actual.');
  const local = new Date(start.getTime() - 5 * 3600000);
  const day = local.getUTCDay();
  if (day === 0) throw new RuleError('SCHEDULE', 'No hay atención los domingos.');
  if (day === 6) throw new RuleError('SCHEDULE', 'No hay atención los sábados.');
  const minute = local.getUTCHours() * 60 + local.getUTCMinutes();
  if (minute < 480) throw new RuleError('SCHEDULE', 'La atención comienza a las 08:00.');
  if (minute > 990) throw new RuleError('SCHEDULE', 'La última cita comienza a las 16:30.');
  if (Math.floor(minute / 60) === 12) throw new RuleError('SCHEDULE', 'De 12:00 a 13:00 no hay atención.');
  if (minute % 30 !== 0) throw new RuleError('SCHEDULE', 'Las citas deben iniciar a las :00 o :30.');
}
function cancellationFee(start, now, emergency) {
  if (typeof emergency !== 'boolean') throw new RuleError('EMERGENCY', 'Indica si la cancelación es por emergencia.');
  const remaining = start - now;
  if (remaining <= 0) throw new RuleError('STARTED', 'No se puede cancelar una cita que ya comenzó.', 409);
  const late = remaining < 24 * 3600000;
  return penalty(late, emergency);
}
module.exports = { doctors, RuleError, checkPatient, parseStart, checkSchedule, cancellationFee };
