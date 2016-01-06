var crypto = require('crypto');
var _ = require('underscore');
var moment = require('moment');
var Promise = require('bluebird');
var FormData = require('form-data');

module.exports.md5 = function(val) {
	val = val || '';
	return crypto.createHash('md5').update(val).digest('base64');
}

module.exports.sha256 = function(secret, val) {
	return crypto.createHmac('SHA256', secret).update(val).digest('hex');
}

module.exports.reqDate = function() {
	return moment().utc().format('YYYY-MM-DD-HH-mm-ss-SSS').toString() + 'Z';
}

module.exports.buildBodyStringFromFormData = function(formData) {
	var body = '';
	var form = new FormData();

	_.pairs(formData).forEach(function(pair) {
		form.append(pair[0], pair[1]);
	});

	form._streams.forEach(function(stream) {
		if (!_.isFunction(stream)) {
			if (Buffer.isBuffer(stream)) {
				body += stream.toString('base64');
			} else {
				if (stream.toString().indexOf('-------------------------') !== -1 && body.length > 0) {
					body += '\n';
				}

				body += stream;
			}
		}
	});

	return body;
}
