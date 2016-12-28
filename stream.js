/**
 * @module StreamSpeaker
 *
 * Wraps node-speaker to ensure format.
 *
 */
'use strict';

var inherits = require('inherits');
var extend = require('xtend/mutable');
var Through = require('audio-through');

var NodeSpeaker = require('./index');

/**
 * Speaker is just a format wrapper for node-speaker,
 * as node-speaker doesn’t support any input format in some platforms, like windows.
 * So we need to force the most safe format.
 *
 * @constructor
 */
function StreamSpeaker (opts) {
	if (!(this instanceof StreamSpeaker)) {
		return new StreamSpeaker(opts);
	}

	Through.call(this, opts);

	//create node-speaker with default options - the most cross-platform case
	this.speaker = new NodeSpeaker({
		channels: this.channels
	});

	this.pipe(this.speaker);
}

inherits(StreamSpeaker, Through);


/**
 * Predefined format for node-speaker
 */
extend(StreamSpeaker.prototype, {
	float: false,
	interleaved: true,
	bitDepth: 16,
	signed: true
});


module.exports = StreamSpeaker;
