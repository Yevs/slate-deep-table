'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var insertTable = require('./changes/insertTable');
var insertRow = require('./changes/insertRow');
var removeRow = require('./changes/removeRow');
var insertColumn = require('./changes/insertColumn');
var removeColumn = require('./changes/removeColumn');
var removeTable = require('./changes/removeTable');
var moveSelection = require('./changes/moveSelection');
var moveSelectionBy = require('./changes/moveSelectionBy');
var toggleHeaders = require('./changes/toggleHeaders');

var TablePosition = require('./TablePosition');
var onTab = require('./onTab');
var onUpDown = require('./onUpDown');
var makeSchema = require('./makeSchema');
var makeRenderers = require('./defaultRenderers');

var KEY_TAB = 'Tab';
var KEY_DOWN = 'ArrowUp';
var KEY_UP = 'ArrowDown';

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @param {String} opts.typeContent The type of default content blocks
 */
function EditTable(opts) {
    opts = opts || {};
    opts.typeTable = opts.typeTable || 'table';
    opts.typeRow = opts.typeRow || 'table_row';
    opts.typeCell = opts.typeCell || 'table_cell';
    opts.typeContent = opts.typeContent || 'paragraph';

    /**
     * Is the selection in a table
     */
    function isSelectionInTable(value) {
        var startBlock = value.startBlock;

        if (!startBlock) return false;

        return TablePosition.isInCell(value, startBlock, opts);
    }

    /**
     * Bind a change
     */
    function bindChange(fn) {
        return function (change) {
            var value = change.value;


            if (!isSelectionInTable(value)) {
                return change;
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, _toConsumableArray([opts, change].concat(args)));
        };
    }

    /**
     * User is pressing a key in the editor
     */
    function onKeyDown(event, change, next) {
        var value = change.value;
        // Only handle events in cells

        if (!isSelectionInTable(value)) {
            return next();
        }

        // Build arguments list
        var args = [event, change, opts];

        switch (event.key) {
            case KEY_TAB:
                return onTab.apply(undefined, args);
            case KEY_DOWN:
            case KEY_UP:
                return onUpDown.apply(undefined, args);
        }
        return next();
    }

    var _makeSchema = makeSchema(opts),
        schema = _makeSchema.schema,
        normalizeNode = _makeSchema.normalizeNode;

    var renderNode = makeRenderers(opts);

    return {
        onKeyDown: onKeyDown,

        schema: schema,
        normalizeNode: normalizeNode,
        renderNode: renderNode,

        utils: {
            isSelectionInTable: isSelectionInTable
        },

        changes: {
            insertTable: insertTable.bind(null, opts),
            insertRow: bindChange(insertRow),
            removeRow: bindChange(removeRow),
            insertColumn: bindChange(insertColumn),
            removeColumn: bindChange(removeColumn),
            removeTable: bindChange(removeTable),
            moveSelection: bindChange(moveSelection),
            moveSelectionBy: bindChange(moveSelectionBy),
            toggleHeaders: bindChange(toggleHeaders)
        }
    };
}

module.exports = EditTable;
