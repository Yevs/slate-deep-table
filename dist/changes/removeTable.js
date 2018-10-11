'use strict';

var TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeTable(opts, change, at) {
  var value = change.value;
  var startBlock = value.startBlock;


  var pos = TablePosition.create(value, startBlock, opts);
  var table = pos.table;


  return change.deselect().removeNodeByKey(table.key);
}

module.exports = removeTable;