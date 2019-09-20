module.exports = {
  presets: ['next/babel', '@babel/preset-env'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: '.',
        cwd: 'babelrc',
        alias: {
          '~': './',
        },
      },
    ],
    '@babel/plugin-transform-runtime',
  ],
}
