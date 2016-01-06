var assert = require('assert');
var _ = require('underscore');
var uid	= require('uid2');
var api = require('./common').getApiClient();
var insertedTransaction;

describe('Transactions', function() {
	this.timeout(30000);

	it('Retrieve a Collection of Transactions', function(done) {
		api.getTransactions()
		.then(function(results) {
			assert.equal(_.isArray(results), true);
			assert.notEqual(results.length, 0);
			assert.notEqual(results[0].Id, null);
			assert.notEqual(results[0].PropertyTypeId, null);
			assert.notEqual(results[0].ClassificationId, null);
			assert.notEqual(results[0].Status, null);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});

	it('Find existing test transaction and deletes it', function(done) {
		api.getTransactions({
			$orderby:'CreatedTimestamp asc',
			$skip: 0,
			$filter: 'MLSAddress/StreetNumber eq \'123\' and MLSAddress/StreetName eq \'Main St\' and MLSAddress/PostalCode eq \'95125\' and SellPrice eq 1000000'
		})
		.then(function(results) {
			if (_.isArray(results) && results.length === 1) {
				return api.deleteTransaction(results[0].Id);
			} else {
				return null;
			}
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});

	it('Create a Transaction', function(done) {
		var transaction = {
			ClassificationId: 'XYem-Xc45UpJ8Bl5VdE-hg==',
			PropertyTypeId: 'UsQZDrX_zlF-ndCfgQZFoQ==',
			SellPrice: 1000000,
			CloseDate: '2016-02-03',
			OfferDate: '2016-01-03',
			MLSAddress: {
				StreetNumber: '123',
				StreetName: 'Main St',
				City: 'San Jose',
				ProvinceCode: 'CA',
				PostalCode: '95125',
				CountryCode: 'US',
				Country: 'United States'
			},
			Tiers: [
				{
					ClassificationId: 'I1LeQ4ZKZdwWWSWPdobXBQ==',
					CloseDate: '2016-02-03',
					Status: 'Open',
					StatusCode: 'N',
					SellPrice: 1000000,
					AgentCommissions: [
						{
							AgentId: 'rXIMmtV5eC5YEHl5ntjzsg==',
							End: 'Selling',
							EndCode: 'S',
							EndCount: 1,
							CommissionPercentage: 0.03,
							Commission: 30000
						}
					]
				}
			]
		}

		api.createTransaction(transaction)
		.then(function(results) {
			assert.notEqual(results, null);
			assert.notEqual(results.Id, null);
			assert.equal(results.PropertyTypeId, 'UsQZDrX_zlF-ndCfgQZFoQ==');
			assert.equal(results.ClassificationId, 'XYem-Xc45UpJ8Bl5VdE-hg==');
			assert.equal(results.SellPrice, 1000000);

			insertedTransaction = results;
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});

	it('Retrieve a Transaction', function(done) {
		api.getTransaction(insertedTransaction.Id)
		.then(function(results) {
			assert.notEqual(results, null);
			assert.equal(results.Id, insertedTransaction.Id);
			assert.equal(results.PropertyTypeId, insertedTransaction.PropertyTypeId);
			assert.equal(results.ClassificationId, insertedTransaction.ClassificationId);
			assert.equal(results.Status, insertedTransaction.Status);

			//console.log(JSON.stringify(results, null, 4));
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
	it('Finalize a Transaction', function(done) {
		api.finalizeTransaction(insertedTransaction.Id)
		.then(function(results) {
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

	it('Update a Transaction', function(done) {
		var randomId = uid(8);

		var updatedValues = {
			MLSNumber: randomId
		}

		api.updateTransaction(insertedTransaction.Id, updatedValues)
		.then(function(results) {
			assert.equal(results.Id, insertedTransaction.Id);
			assert.equal(results.MLSNumber, randomId);
		})
		.catch(function(err) {
			console.log(err);
			assert.equal(err, null);
		})
		.finally(function() {
			done();
		});
	});

	it('Delete a Transaction', function(done) {
		api.deleteTransaction(insertedTransaction.Id)
		.then(function(results) {
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
});
