module.exports = {
  "extends": [
    "airbnb"
  ],
  "env": {
    "cypress/globals": true
  },
  "plugins": [
    "cypress"
  ],
  "root": true,
  "rules": {
    "arrow-parens": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "newline-per-chained-call": "off",
    "no-nested-ternary": "off",
    "no-underscore-dangle": ["error", {
      "allow": []
    }],
    "linebreak-style": "off"
  }
}
