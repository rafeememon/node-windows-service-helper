var Service = require('node-windows').Service;
var appRootPath = require('app-root-path');

function getEnv(env) {
  return Object.keys(env || {}).map(function(key) {
    return {name: key, value: env[key]};
  });
}

function getService() {
  var packageInfo = appRootPath.require('./package');
  var serviceConfig = packageInfo.service;
  if (!serviceConfig || !serviceConfig.script) {
    throw new Error('service config required in package.json');
  }
  return new Service({
    name: packageInfo.name,
    description: packageInfo.description,
    script: appRootPath.resolve(serviceConfig.script),
    env: getEnv(serviceConfig.env)
  });
}

function installService() {
  var service = getService();
  service.on('install', function() {
    service.start();
  });
  service.install();
}

function uninstallService() {
  getService().uninstall();
}

module.exports = {
  installService: installService,
  uninstallService: uninstallService
};
