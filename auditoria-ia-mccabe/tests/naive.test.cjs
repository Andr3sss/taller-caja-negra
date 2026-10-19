const { penalty } = require(process.env.PENALTY_MODULE || '../src/penalty.cjs');
test('Test zombi: ejecuta todas las sentencias, no comprueba resultados', () => {
  penalty(true, false);
  penalty(false, false);
});
