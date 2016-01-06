var assert = require('assert');
var util = require('../lib/util');

describe('Utilities', function() {
	it('MD5 encode a blank string', function(done) {
		var hash = util.md5('');
		assert.equal(hash, '1B2M2Y8AsgTpgAmY7PhCfg==');
		done();
	});

	it('SHA256 encode a blank string', function(done) {
		var stringToHash = 'GET:/wolfconnect/transactions/v1/WVnG90WFTSK2g9d_L7yd6g==:2014-01-01-20-45-33-554Z:1B2M2Y8AsgTpgAmY7PhCfg==';
		var hash = util.sha256('your secret key', stringToHash);
		assert.equal(hash, '9b099e2c44ac74f7175a6c34fc7e3850103127618a278926ebf30304f0d13665');
		done();
	});

	it('Gets a request date string', function(done) {
		var requestDate = util.reqDate();
		assert.equal(typeof requestDate, 'string');
		assert.equal(requestDate.length, 24);
		done();
	});
});
