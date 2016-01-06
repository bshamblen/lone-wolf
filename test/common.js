var LoneWolf = require('../index');

module.exports.getApiClient = function() {
	return new LoneWolf({
		apiToken: '',
		clientCode: '',
		secretKey: ''
	});
}
