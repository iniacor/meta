module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: '> 1%',
        },
        useBuiltIns: 'usage',
        corejs: 3,
        node: 'current',
      },
    ],
  ],
};
