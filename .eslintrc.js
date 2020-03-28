module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["eslint:recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": [
        "error",
            {
                printWidth: 120,
                tabWidth: 4,
                bracketSpacing: false,
                parser: "babel",
                trailingComma: "none",
                singleQuote: true
            }],
    }
};