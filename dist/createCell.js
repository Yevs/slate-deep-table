'use strict';

var Slate = require('slate');
var Text = Slate.Text;

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */

function createCell(opts, text) {
    text = text || '';
    var typeCell = opts.typeCell,
        typeContent = opts.typeContent;


    return Slate.Block.create({
        type: typeCell,
        nodes: [Slate.Block.create({
            type: typeContent,
            nodes: [Text.fromJSON({
                object: 'text',
                text: text
            })]
        })]
    });
}

module.exports = createCell;