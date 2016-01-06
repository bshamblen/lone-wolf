var assert = require('assert');
var _ = require('underscore');
var api = require('./common').getApiClient();

describe('Property Types', function() {
	this.timeout(10000);

	it('Get Property Types', function(done) {
		this.timeout(10000);
		api.getPropertyTypes()
		.then(function(results) {
			assert.equal(_.isArray(results), true);
			assert.notEqual(results.length, 0);
			assert.notEqual(results[0].Class, null);
			assert.notEqual(results[0].Id, null);
			assert.notEqual(results[0].Code, null);
			assert.notEqual(results[0].Name, null);
			assert.notEqual(results[0].ClassCode, null);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});
});
