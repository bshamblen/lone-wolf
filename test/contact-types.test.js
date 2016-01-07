var assert = require('assert');
var _ = require('underscore');
var api = require('./common').getApiClient();

describe('Contact Types', function() {
	this.timeout(10000);

	it('Get Contact Types', function(done) {
		api.getContactTypes()
		.then(function(results) {
			assert.equal(_.isArray(results), true);
			assert.notEqual(results.length, 0);
			assert.notEqual(results[0].Id, null);
			assert.notEqual(results[0].Code, null);
			assert.notEqual(results[0].Name, null);
			assert.notEqual(results[0].CategoryCode, null);
			done();
		})
		.catch(done);
	});
});
