module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "**/__tests__/**/*.test.{ts,tsx}",
    "**/*.test.{ts,tsx}"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        jsx: "react-jsx"
      }
    }],
    "^.+\\.jsx?$": ["ts-jest", {
      useESM: true,
    }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@faker-js|@testing-library|msw)/)"
  ],
};
