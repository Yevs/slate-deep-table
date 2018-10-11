'use strict';

var TablePosition = require('./TablePosition');
var moveSelectionBy = require('./changes/moveSelectionBy');
var insertRow = require('./changes/insertRow');

/**
 * Select all text of current block.
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function selectAllText(change) {
    var value = change.value;
    var startBlock = value.startBlock;


    return change.moveToRangeOfNode(startBlock);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(event, change, opts) {
    var _change = change,
        value = _change.value;

    event.preventDefault();
    var direction = event.shiftKey ? -1 : +1;

    // Create new row if needed
    var startBlock = value.startBlock;

    var pos = TablePosition.create(value, startBlock, opts);

    if (pos.isFirstCell() && direction === -1) {
        change = insertRow(opts, change, 0);
    } else if (pos.isLastCell() && direction === 1) {
        change = insertRow(opts, change);
    }

    // Move
    change = moveSelectionBy(opts, change, direction, 0);

    // Select all cell.
    return selectAllText(change);
}

module.exports = onTab;