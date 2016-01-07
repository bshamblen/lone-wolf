var assert = require('assert');
var _ = require('underscore');
var api = require('./common').getApiClient();

describe('Classifications', function() {
	this.timeout(10000);

	it('Get Classifications', function(done) {
		api.getClassifications()
		.then(function(results) {
			assert.equal(_.isArray(results), true);
			assert.notEqual(results.length, 0);
			assert.notEqual(results[0].Id, null);
			assert.notEqual(results[0].Code, null);
			assert.notEqual(results[0].Name, null);
			done();
		})
		.catch(done);
	});
});
