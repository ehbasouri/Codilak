module.exports = {
  root: true,
  extends: '@react-native-community',
  "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        // overrides
        "react/prop-types": 0,
        "quotes":["error","double"],
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn",
        "semi": ["error"]
    }
};
