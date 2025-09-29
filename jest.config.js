/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node', // Since you are testing a Node.js backend
  verbose: true,           // Show detailed test results
  testPathIgnorePatterns: ['/node_modules/'], // Ignore node_modules folder
};

module.exports = config;
