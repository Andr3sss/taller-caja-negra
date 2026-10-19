const { penalty } = require(process.env.PENALTY_MODULE || '../src/penalty.cjs');
describe('Base de 3 caminos independientes y pares MC/DC', () => {
  test('P1: no tardía; no aplica penalización', () => { expect(penalty(false, false)).toBe(0); });
  test('P2: tardía con emergencia; exenta', () => { expect(penalty(true, true)).toBe(0); });
  test('P3: tardía sin emergencia; cobra exactamente USD 10', () => { expect(penalty(true, false)).toBe(1000); });
});
