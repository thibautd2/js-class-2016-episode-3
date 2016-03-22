import prettyjson from 'prettyjson';

const original_methods = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
};

let is_installed = false;

export function install() {
  if (is_installed) return;

  is_installed = true;
}

export function uninstall() {
  if (! is_installed) return;

  is_installed = false;
}

function better_logger() {
  "use strict";

}
