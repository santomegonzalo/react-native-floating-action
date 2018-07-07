const path = require('path');

module.exports = {
  extraNodeModules: {
    "react-native": path.resolve(__dirname, "node_modules/react-native"),
    "react": path.resolve(__dirname, "node_modules/react"),
    "prop-types": path.resolve(__dirname, "node_modules/prop-types"),
    "react-native-floating-action": path.resolve(__dirname, "component")
  },
  getProjectRoots: () => [path.join(__dirname, "..", ".."), __dirname]
};
