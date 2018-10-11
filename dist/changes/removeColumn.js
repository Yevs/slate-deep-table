'use strict';

var Slate = require('slate');
var Text = Slate.Text;

var _require = require('immutable'),
    List = _require.List;

var TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeColumn(opts, change, at) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = TablePosition.create(value, startBlock, opts);
    var table = pos.table;


    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    var rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        change.withoutNormalizing(function () {
            rows.forEach(function (row) {
                var cell = row.nodes.get(at);
                change.removeNodeByKey(cell.key);
            });
        });
    }
    // If last column, clear text in cells instead
    else {
            change.withoutNormalizing(function () {
                rows.forEach(function (row) {
                    row.nodes.forEach(function (cell) {
                        // remove all children of cells
                        // the schema will create an empty child content block in each cell
                        cell.nodes.forEach(function (node) {
                            change.removeNodeByKey(node.key);
                        });
                    });
                });
            });
        }

    // Replace the table
    return change;
}

module.exports = removeColumn;