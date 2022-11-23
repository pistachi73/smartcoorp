/* eslint-disable */
export default {
  displayName: 'smart-backend',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/smart-backend',
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/test-setup.ts'],
};
