/* eslint-disable */
export default {
  displayName: 'smart-api',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/smart-api',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/src/utils/test/setup-tests.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/test/setup-prisma-mock.ts'],
  transformIgnorePatterns: [`/node_modules/(?!(nanoid)/)`],
};
