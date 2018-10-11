'use strict';

var React = require('react');

/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
var splitHeader = function splitHeader(props) {
    var rows = props.children;
    var header = !props.node.get('data').get('headless');

    if (!header || !rows || !rows.length || rows.length === 1) {
        return { header: null, rows: rows };
    }
    return {
        header: rows[0],
        rows: rows.slice(1)
    };
};

/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */
var makeRenderers = function makeRenderers() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var next = arguments[1];
    return function (props) {
        switch (props.node.type) {
            case 'paragraph':
                return React.createElement(
                    'p',
                    props.attributes,
                    props.children
                );
            case 'heading':
                return React.createElement(
                    'h1',
                    props.attributes,
                    props.children
                );
            case 'subheading':
                return React.createElement(
                    'h2',
                    props.attributes,
                    props.children
                );
            case opts.typeTable:
                var _splitHeader = splitHeader(props),
                    header = _splitHeader.header,
                    rows = _splitHeader.rows;

                return React.createElement(
                    'table',
                    null,
                    header && React.createElement(
                        'thead',
                        props.attributes,
                        header
                    ),
                    React.createElement(
                        'tbody',
                        props.attributes,
                        rows
                    )
                );
            case opts.typeRow:
                return React.createElement(
                    'tr',
                    props.attributes,
                    props.children
                );
            case opts.typeCell:
                return React.createElement(
                    'td',
                    props.attributes,
                    props.children
                );
            default:
                return next();
        }
    };
};

module.exports = makeRenderers;