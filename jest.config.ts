import type { Config } from 'jest';

const jestConfig: Config = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'json', 'js'],
  roots: ['<rootDir>/src'],

  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/mocks/*.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  // moduleNameMapper: {},
  // globals: {}
};

export default jestConfig;
