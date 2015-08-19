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
    'react': 'React',
    'jquery': 'jQuery'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel?optional[]=runtime&stage=1',
    }, {
      test: /\.(ico|gif)$/,
      loader: 'file',
    }]
  },
  plugins: [
    new StaticJsxPlugin('bundle.js', {
      styles: ['https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css'],
      scripts: ['https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js']
    })
  ]
}
