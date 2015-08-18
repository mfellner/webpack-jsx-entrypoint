var StaticJsxPlugin = require('./src/static-jsx-plugin');

module.exports = {
  target: 'web',
  entry: './src/index.jsx',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
  },
  externals: {
    'react': 'React'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel?optional[]=runtime&stage=1',
    }, {
      test: /\.ico$/,
      loader: 'file',
    }]
  },
  plugins: [
    new StaticJsxPlugin('bundle.js', {
      scripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js'
      ]
    })
  ]
}
