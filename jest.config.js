module.exports = {
  preset: "ts-jest",
  // testEnvironment: "jest-environment-jsdom-fourteen",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/src/app/test/enzyme-setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "<rootDir>/src/app/test/tsconfig.jest.json",
    },
  },
  collectCoverageFrom: ["src/app/**/*.{ts,tsx}"],
};
