'use strict';

var TablePosition = require('./TablePosition');
var moveSelectionBy = require('./changes/moveSelectionBy');

function onUpDown(event, change, opts) {
    var _change = change,
        value = _change.value;

    var direction = event.key === 'ArrowUp' ? -1 : +1;
    var startBlock = value.startBlock;

    var pos = TablePosition.create(value, startBlock, opts);

    if (pos.isFirstRow() && direction === -1 || pos.isLastRow() && direction === +1) {
        // Let the default behavior move out of the table
        return change;
    } else {
        event.preventDefault();

        change = moveSelectionBy(opts, change, 0, event.key === 'ArrowUp' ? -1 : +1);

        return change;
    }
}

module.exports = onUpDown;