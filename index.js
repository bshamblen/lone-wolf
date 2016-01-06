var _ = require('underscore');
var request = require('request');
var util = require('./lib/util');
var Promise = require('bluebird');

var Lonewolf = function(options) {
	if (_.isObject(options)) {
		if (options.apiToken) {
			this.apiToken = options.apiToken;
		}

		if (options.clientCode) {
			this.clientCode = options.clientCode;
		}

		if (options.secretKey) {
			this.secretKey = options.secretKey;
		}
	}
}

Lonewolf.prototype.sendHttpRequest = function(httpMethod, path, formData, options, callback) {
	if (_.isFunction(options)) {
		callback = options;
		options = {};
	}

	options = options || {};

	var deferred = Promise.pending();
	var isJSON = false;
	var url = process.env.NODE_ENV === 'production' ?
				'https://api.globalwolfweb.com/wolfconnect' :
				'https://api-sb.globalwolfweb.com/wolfconnect';

	if (!_.isEmpty(options)) {
		var qp = _.pairs(options).map(function(pair) {
			return pair[0] + '=' + encodeURIComponent(pair[1]);
		}).join('&');

		path = path + '?' + qp;
	};

	url += path;

	if (formData) {
		if (!_.isString(formData)) {
			formData = util.buildBodyStringFromFormData(formData);
		} else {
			isJSON = true;
		}
	}

	var contentMD5 = util.md5(formData);
	var requestDate = util.reqDate();

	var reqOptions = {
		url: url,
		method: httpMethod,
		headers: {
			'Authorization': this.generateTokenHeader(httpMethod, '/wolfconnect' + path, requestDate, contentMD5),
			'Content-MD5': contentMD5
		}
	}

	if (formData) {
		reqOptions.body = formData;

		if (isJSON) {
			reqOptions.headers['Content-type'] = 'application/json';
		}
	}

	request(reqOptions, function(err, response, body) {
		if (err) {
			callback && callback(err);
			deferred.reject(err);
		} else if (!err && (response.statusCode < 200 || response.statusCode >= 300) && body) {
			callback && callback(body);
			deferred.reject(body);
		} else {
			try {
				if (_.isString(body) && body.length > 0) {
					body = JSON.parse(body);
				}

				callback && callback(null, body);
				deferred.resolve(body);
			} catch (err) {
				callback && callback(err);
				deferred.reject(err);
			}
		}
	});

	return deferred.promise;
}

Lonewolf.prototype.sendGetRequest = function(path, options, callback) {
	return this.sendHttpRequest('GET', path, null, options, callback);
}

Lonewolf.prototype.sendPostRequest = function(path, data, options, callback) {
	return this.sendHttpRequest('POST', path, data, options, callback);
}

Lonewolf.prototype.sendPutRequest = function(path, data, options, callback) {
	return this.sendHttpRequest('PUT', path, data, options, callback);
}

Lonewolf.prototype.sendDeleteRequest = function(path, options, callback) {
	return this.sendHttpRequest('DELETE', path, null, options, callback);
}

Lonewolf.prototype.generateTokenHeader = function(httpMethod, uri, requestDate, contentMD5) {
	return 'LoneWolfToken ' +
			this.apiToken + ':' +
			this.clientCode + ':' +
			this.generateHeaderSignature(httpMethod, uri, requestDate, contentMD5) + ':' +
			requestDate;
}

Lonewolf.prototype.generateHeaderSignature = function(httpMethod, uri, requestDate, contentMD5) {
	var signature = httpMethod + ':' +
			decodeURIComponent(uri) + ':' +
			requestDate + ':' +
			contentMD5;

	return util.sha256(this.secretKey, signature);
}

Lonewolf.prototype.getPropertyTypes = function(callback) {
	return this.sendGetRequest('/property-types/v1/', {}, callback);
}

Lonewolf.prototype.getClassifications = function(callback) {
	return this.sendGetRequest('/classifications/v1/', {}, callback);
}

Lonewolf.prototype.getContactTypes = function(callback) {
	return this.sendGetRequest('/contact-types/v1/', {}, callback);
}

Lonewolf.prototype.getMembers = function(options, callback) {
	return this.sendGetRequest('/members/v1/', options, callback);
}

Lonewolf.prototype.getMembersInOutStatus = function(callback) {
	return this.sendGetRequest('/members/v1/in-out-status/', {}, callback);
}

Lonewolf.prototype.getMember = function(memberId, options, callback) {
	return this.sendGetRequest('/members/v1/' + memberId, options, callback);
}

Lonewolf.prototype.getMemberProfileImage = function(memberId, options, callback) {
	return this.sendGetRequest('/members/v1/' + memberId + '/profile-image', options, callback);
}

Lonewolf.prototype.setMemberProfileImage = function(memberId, formData, callback) {
	return this.sendPostRequest('/members/v1/' + memberId + '/profile-image', formData, callback);
}

Lonewolf.prototype.deleteMemberProfileImage = function(memberId, callback) {
	return this.sendDeleteRequest('/members/v1/' + memberId + '/profile-image', callback);
}

Lonewolf.prototype.getMemberPublicProfileImage = function(memberId, options, callback) {
	return this.sendGetRequest('/members/v1/' + memberId + '/public-profile-image', options, callback);
}

Lonewolf.prototype.getMemberInOutStatus = function(memberId, options, callback) {
	return this.sendGetRequest('/members/v1/' + memberId + '/in-out-status', options, callback);
}

Lonewolf.prototype.getTransactions = function(options, callback) {
	return this.sendGetRequest('/transactions/v1/', options, callback);
}

Lonewolf.prototype.getTransaction = function(transactionId, options, callback) {
	return this.sendGetRequest('/transactions/v1/' + transactionId, options, callback);
}

Lonewolf.prototype.createTransaction = function(transaction, options, callback) {
	return this.sendPostRequest('/transactions/v1/', JSON.stringify(transaction), options, callback);
}

Lonewolf.prototype.updateTransaction = function(transactionId, transaction, options, callback) {
	return this.sendPutRequest('/transactions/v1/' + transactionId, JSON.stringify(transaction), options, callback);
}

Lonewolf.prototype.finalizeTransaction = function(transactionId, statusCode, callback) {
	return this.sendPutRequest('/transactions/v1/' + transactionId + '/finalize', statusCode, {}, callback);
}

Lonewolf.prototype.deleteTransaction = function(transactionId, callback) {
	return this.sendDeleteRequest('/transactions/v1/' + transactionId, {}, callback);
}

module.exports = Lonewolf;
