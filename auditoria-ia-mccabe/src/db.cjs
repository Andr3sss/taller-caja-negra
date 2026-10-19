const { DatabaseSync } = require('node:sqlite');
function openDb(path = ':memory:') {
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY, patient TEXT NOT NULL, age INTEGER NOT NULL CHECK(age BETWEEN 0 AND 120),
      doctor TEXT NOT NULL CHECK(doctor IN ('adulta','pediatrica')), start INTEGER NOT NULL, end INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmada' CHECK(status IN ('confirmada','cancelada')),
      fee INTEGER NOT NULL DEFAULT 0 CHECK(fee >= 0), emergency INTEGER NOT NULL DEFAULT 0
    );
    CREATE UNIQUE INDEX IF NOT EXISTS active_slot ON appointments(doctor,start) WHERE status='confirmada';`);
  return db;
}
module.exports = { openDb };
