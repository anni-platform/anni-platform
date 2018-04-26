/* config-overrides.js */
const rewireStyledComponents = require("react-app-rewire-styled-components");

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env, {
    ssr: true,
    displayName: true,
    module: {
      rules: [
        {
          test: /\.jsx?/,
          use: ["babel-loader", "stylelint-custom-processor-loader"],
          exclude: /node_modules/
        }
      ]
    }
  });
  return config;
};
