var path = require('path');
var React = require('react');

function StaticJsxPlugin(filename, props) {
  this.filename = filename;
  this.props = props || {};
}

StaticJsxPlugin.prototype.apply = function(compiler) {

  compiler.plugin('emit', function(compiler, done) {
    var asset = compiler.assets[this.filename];
    if (!asset) {
      return done(new Error('File not found: "' + this.filename + '"'));
    }

    var context = {};
    Object.keys(compiler.options.externals || {}).forEach(function(k) {
      var external = compiler.options.externals[k];
      context[external] = require(k);
    });

    var source = 'module.exports =\n' + asset.source();
    var reactClass = requireFromString(source, this.filename, context);
    var Component = React.createFactory(reactClass);

    if (!this.props.scripts) this.props.scripts = [];
    this.props.scripts.push('/' + path.basename(this.filename));

    var element = Component(this.props);
    var html = React.renderToStaticMarkup(element);

    compiler.assets['index.html'] = createAsset(html);
    done();
  }.bind(this));
}

function createAsset(source) {
  return {
    source: function() {
      return source;
    },
    size: function() {
      return source.length;
    }
  };
};

function requireFromString(content, filename, context) {
  Object.keys(context || {}).forEach(function(k) {
    global[k] = context[k];
  });
  var Module = module.constructor;
  var m = new Module();
  m.paths = module.paths;
  m._compile(content, filename);
  return m.exports;
}

module.exports = StaticJsxPlugin;
