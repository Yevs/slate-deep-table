'use strict';

var TablePosition = require('../TablePosition');

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Change} change
 * @return {Slate.Change}
 */
function toggleHeaders(opts, change) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = TablePosition.create(value, startBlock, opts);
    var table = pos.table;


    var currentSetting = !!table.get('data').get('headless');

    change.setNodeByKey(table.key, {
        data: {
            headless: !currentSetting
        }
    });

    return change;
}

module.exports = toggleHeaders;