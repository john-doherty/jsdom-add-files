'use strict';

// bulk of source from https://github.com/jsdom/jsdom/issues/1272#issuecomment-361106435

const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const { JSDOM } = require('jsdom');

const { File, FileList } = (new JSDOM()).window;

/**
 * Adds files to a HTML file input and fire the on change event
 * @access public
 * @param {HTMLInputElement} input - HTML file input element
 * @param {Array<string>} filePaths - Array of files to add to input
 * @returns {void}
 */
function addFiles(input, filePaths) {

    if (!Array.isArray(filePaths)) throw new Error('filePaths needs to be a file path string or an Array of file path strings');

    const fileList = filePaths.map(fp => createFile(fp));

    fileList.__proto__ = Object.create(FileList.prototype);

    Object.defineProperty(input, 'files', {
        value: fileList,
        writable: false
    });

    fireEvent(input, 'change');
}

/**
 * Converts a file path into a browser File object
 * @access private
 * @param {string} filePath - local path to file
 * @returns {object} File object
 */
function createFile(filePath) {
    const { mtimeMs: lastModified } = fs.statSync(filePath);

    return new File(
        [new fs.readFileSync(filePath)],
        path.basename(filePath),
        {
            lastModified: lastModified,
            type: mime.lookup(filePath) || ''
        }
    );
}

/**
 * Cross browser method to fire events
 * @access private
 * @param {Element} el - html element to fire the event on
 * @param {string} eventName - name of the event to fire
 * @returns {void}
 */
function fireEvent(el, eventName) {

    eventName = eventName.replace(/on/, '');

    var document = el.ownerDocument;

    if (document.createEvent) {
        var e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
        el.dispatchEvent(e);
    }
    else if (document.createEventObject) {
        el.fireEvent('on' + eventName);
    }
    else if (typeof el['on' + eventName] === 'function') {
        el['on' + eventName]();
    }
}

module.exports = addFiles;
