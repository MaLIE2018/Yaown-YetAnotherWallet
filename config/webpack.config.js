import path from "path";

module.exports = {
  resolve: {
    extensions: ["js", "ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/components"),
      "@components": path.resolve(__dirname, "src/components"),
      "@stTypes": path.resolve(__dirname, "../../../store/types"),
      // ...etc
    },
  },
};
