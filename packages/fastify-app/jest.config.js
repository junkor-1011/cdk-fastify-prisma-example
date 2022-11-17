module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // preset: 'ts-jest/presets/default-esm',
  globals: {
    '@swc/jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  globalSetup: './jest.global-setup.js',
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',

    // '^axios$': require.resolve('axios'),
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  // testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      'esbuild-jest',
      {
        sourceMaps: true,
        module: {
          type: 'commonjs',
        },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          // transform: {
          //   react: {
          //     runtime: 'automatic',
          //   },
          // },
        },
      },
    ],
    // '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    // '^.+\\.module\\.(css|sass|scss)$',
  ],
};
