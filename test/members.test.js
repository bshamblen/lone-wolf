var assert = require('assert');
var _ = require('underscore');
var api = require('./common').getApiClient();
var fs = require('fs');
var firstMember;

describe('Members', function() {
	this.timeout(10000);

	it('Retrieve a Collection of Members', function(done) {
		api.getMembers()
		.then(function(results) {
			assert.equal(_.isArray(results), true);
			assert.notEqual(results.length, 0);
			assert.notEqual(results[0].Id, null);
			assert.notEqual(results[0].MemberTypeId, null);
			assert.notEqual(results[0].OfficeId, null);
			assert.notEqual(results[0].FirstName, null);
			assert.notEqual(results[0].LastName, null);

			firstMember = results[0];
			done();
		})
		.catch(done);
	});

/* Can't test - don't have access
	it('Get the In/Out Status of All the Members', function(done) {
		api.getMembersInOutStatus()
		.then(function(results) {
			console.log(results)
			assert.equal(_.isArray(results), true);
			assert.notEqual(results.length, 0);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});
*/

	it('Retrieve a Member', function(done) {
		api.getMember(firstMember.Id)
		.then(function(results) {
			assert.notEqual(results, null);
			assert.equal(results.Id, firstMember.Id);
			assert.equal(results.MemberTypeId, firstMember.MemberTypeId);
			assert.equal(results.OfficeId, firstMember.OfficeId);
			assert.equal(results.FirstName, firstMember.FirstName);
			assert.equal(results.LastName, firstMember.LastName);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});

/* Can't test - don't have access
	it('Get the In/Out Status of a Member', function(done) {
		api.getMemberInOutStatus(firstMember.Id)
		.then(function(results) {
			console.log(results);
			assert.notEqual(results, null);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});
*/

/* Can't test - don't have access
	it('Set the Profile Image of a Member', function(done) {
		var formData = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			profileImage: fs.readFileSync(__dirname + '/profilephoto_small.jpg')
		}

		api.setMemberProfileImage(firstMember.Id, formData)
		.then(function(results) {
			console.log(results);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});
*/

	it('Retrieve the Profile Image of a Member', function(done) {
		api.getMemberProfileImage(firstMember.Id)
		.then(function(results) {
			console.log(results);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});

/* Can't test - don't have access
	it('Delete the Profile Image of a Member', function(done) {
		api.deleteMemberProfileImage(firstMember.Id)
		.then(function(results) {
			console.log(results);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});
*/

	it('Retrieve the Public Profile Image of a Member', function(done) {
		api.getMemberPublicProfileImage(firstMember.Id)
		.then(function(results) {
			console.log(results);
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
