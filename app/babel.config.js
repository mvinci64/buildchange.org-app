module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // The reanimated plugin MUST be the last entry.
    plugins: ['react-native-reanimated/plugin'],
  };
};
