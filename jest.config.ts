import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.spec.ts', '**/?(*.)+(spec|test).ts'],
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  clearMocks: true,
};

export default config;
