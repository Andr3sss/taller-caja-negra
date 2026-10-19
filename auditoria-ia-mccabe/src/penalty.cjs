// Dos predicados por cortocircuito; V(G) = 2 + 1 = 3.
function penalty(late, emergency) {
  if (late && !emergency) {
    return 1000;
  }
  return 0;
}
module.exports = { penalty };
