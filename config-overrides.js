var path = require("path");
const { override, disableChunk } = require("customize-cra");

module.exports = {
  webpack: function (config, env) {
    config.entry = {
      main: [path.resolve("src/index")],
      // content: [path.resolve("src/content")],
      background: [path.resolve("src/background")]
    };
    config.output.filename = "static/js/[name].js";

    return override(
      disableChunk()
    )(config, env);
  }
};
