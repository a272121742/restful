Package.describe({
  summary: "meteor use restful api with server"
});

Package.on_use(function (api) {
  api.use('iron-router', 'server');
  api.imply && api.imply('iron-router','server');
  api.add_files([
    'rest.js',
    'internal.api.js'
  ], 'server');
  if(typeof api.export !== 'undefined'){
    api.export('REST','server');
  }
});
