module.exports = {
  testMatch: ['**/tests/naive.test.cjs'], coverageProvider: 'v8',
  collectCoverageFrom: ['src/penalty.cjs'], coverageDirectory: 'evidence/naive-coverage',
  coverageReporters: ['text', 'html', 'json-summary', 'json']
};
