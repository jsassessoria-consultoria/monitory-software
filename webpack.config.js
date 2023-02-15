const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './dist/app.js', // arquivo de entrada
    target: 'node',
    mode:'production',
    output: {
      path: path.resolve(__dirname, 'build'), // pasta de saída
      filename: 'bundle.js' // nome do arquivo de saída
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './src/views/public/',
              to: 'public/',
            },
          ],
        }),
      ]
  };