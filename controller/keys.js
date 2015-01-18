var NS = 'com.youcrypted.keys';
var GET_PRIVATE_KEY_NS = NS + '.get_private_key';
var GET_PUBLIC_KEY_NS = NS + '.get_public_key';
var GET_KEYS_NS = NS + '.get_keys';

// the controller
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
		ebBridge: {
			ns: GET_PRIVATE_KEY_NS,
			action: 'send'
		}
	},
	getPublicKey: {
		args: ['username'],
		ebBridge: {
			ns: GET_PUBLIC_KEY_NS,
			action: 'send'
		}
	},
	getKeys: {
		args: ['username'],
		ebBridge: {
			ns: GET_KEYS_NS,
			action: 'send'
		}
	}
});

// the events support
EventBus.register(GET_PRIVATE_KEY_NS, {
	OnMessage: function (aMessage) {
		aMessage.reply({
			data: DatabaseService.getPrivateKey(aMessage.username)
		});
	}
});

EventBus.register(GET_PUBLIC_KEY_NS, {
	OnMessage: function (aMessage) {
		aMessage.reply({
			data: DatabaseService.getPublicKey(aMessage.username)
		});
	}
});

EventBus.register(GET_KEYS_NS, {
	OnMessage: function (aMessage) {
		aMessage.reply({
			data: DatabaseService.getKeys(aMessage.username)
		});
	}
});