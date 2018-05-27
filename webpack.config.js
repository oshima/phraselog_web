var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread'
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
