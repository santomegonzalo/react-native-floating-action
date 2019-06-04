const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');

console.log(path.resolve(__dirname, '..', '..', 'node_modules'));
console.log(escape(path.resolve(__dirname, '..', '..', 'node_modules')));
module.exports = {
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, '..', '..')],
  resolver: {
    blacklistRE: blacklist([
      path.resolve(__dirname, '..', '..', 'node_modules'),
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', '..', 'node_modules'))}\\/.*$`
      ),
    ]),
    providesModuleNodeModules: [
      'react-native',
      'react',
      'prop-types'
    ],
  },
};
