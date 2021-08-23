var path = require("path");

module.exports = {
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, "../src/assets/"),
      Components: path.resolve(__dirname, "../src/components/"),
      StoreTypes: path.resolve(__dirname, "../src/store/types/"),
      AppTypes: path.resolve(__dirname, "../src/types/"),
    },
  },
};
