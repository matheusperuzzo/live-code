/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@errors': '<rootDir>/src/presentation/errors/index.ts',
    '@http-helpers': '<rootDir>/src/presentation/helpers/http/http-helper.ts',
    '@models/(.*)': '<rootDir>/src/domain/protocols/models/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@signup-protocols': '<rootDir>/src/presentation/protocols/signup/signup-controller-protocols.ts',
    '@root/(.*)': '<rootDir>/$1'
  }
}
