const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './dist/app.js', // arquivo de entrada
    target: 'node',
    mode:'production',
    output: {
      path: path.resolve(__dirname, 'build'), // pasta de saída
      filename: 'bundle.js' // nome do arquivo de saída
    },
    externals: [nodeExternals({
      allowlist: [/^(?!(ffi|ref)-napi$)[\w-]+$/] // Faz os bundles de todas as libs, exceto 'ffi-napi' e 'ref-napi'
    })],
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
        new Dotenv({
          path:"./.env.production",
          expand: true
        }),
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