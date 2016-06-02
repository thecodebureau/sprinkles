'use strict';

module.exports = function jsp(value) {
  return JSON.stringify(value, null, '\t');
};
