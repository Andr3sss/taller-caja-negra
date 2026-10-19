const { mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { openDb } = require('./db.cjs');
const { createApp } = require('./app.cjs');
mkdirSync(join(__dirname, '../data'), { recursive: true });
const db = openDb(join(__dirname, '../data/citas.sqlite'));
const port = Number(process.env.PORT || 3000);
const server = createApp(db).listen(port, '127.0.0.1', () => console.log(`Citas QA: http://localhost:${port}`));
process.on('SIGINT', () => server.close(() => { db.close(); process.exit(0); }));
