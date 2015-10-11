#!/usr/bin/env node

var yargs = require('yargs')
  .usage('Usage: $0 <command>')
  .command('install', 'Install service')
  .command('uninstall', 'Uninstall service');

switch (yargs.argv._[0]) {
case 'install':
  require('../').installService();
  break;
case 'uninstall':
  require('../').uninstallService();
  break;
default:
  yargs.showHelp();
}
