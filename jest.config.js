module.exports = {
    testMatch: [
        "<rootDir>/test/unit/**/*.(spec|test).js"
    ],
    moduleDirectories: [
        "node_modules",
        "test/utils"
    ],
    testEnvironment: "jsdom",
    transformIgnorePatterns: ['node_modules/(?!(axios|axios-mock-adapter)/)'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
};


