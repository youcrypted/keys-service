App.publish('keys', {
	args: {
		username: {
			not_null: false,
			type: 'string',
			regex: 'username'
		}
	},
	getPrivateKey: {
		args: ['username'],
		handler: function (aUsername) {
			return DatabaseService.getPrivateKey(aUsername);
		}
	},
	getPublicKey: {
		args: ['username'],
		handler: function (aUsername) {
			return DatabaseService.getPublicKey(aUsername);
		}
	},
	getUserByUsername: {
		args: ['username'],
		handler: function (aUsername) {
			return DatabaseService.getUserByUUID(aUsername);
		}
	}
});

