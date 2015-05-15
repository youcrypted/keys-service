/* global App, EventBus, DatabaseService */

var NS = "com.youcrypted.keys";
var GET_PRIVATE_KEY_NS = NS + ".get_private_key";
var GET_PUBLIC_KEY_NS = NS + ".get_public_key";
var GET_KEYS_NS = NS + ".get_keys";
var SET_KEYS_NS = NS + ".set_keys";
var SET_PRIVATE_KEY_NS = NS + ".set_private_key";
var REMOVE_KEYS = NS + ".remove_keys";

// the controller
App.publish("keys", {
	args: {
		username: {
			not_null: true,
			type: "string",
			regex: "username"
		}
	},
	getPrivateKey: {
		args: ["username"],
		ebBridge: {
			ns: GET_PRIVATE_KEY_NS,
			action: "send"
		}
	},
	getPublicKey: {
		args: ["username"],
		ebBridge: {
			ns: GET_PUBLIC_KEY_NS,
			action: "send"
		}
	},
	getKeys: {
		args: ["username"],
		ebBridge: {
			ns: GET_KEYS_NS,
			action: "send"
		}
	}
});

// -----------------------------------------------
// EVENTS REGISTRATION
// -----------------------------------------------
if (App.isWorkerNode()) {
	EventBus.register(GET_PRIVATE_KEY_NS, {
		OnMessage: function (aMsg) {
			aMsg.reply({
				data: DatabaseService.getUserPrivateKey(aMsg.username)
			});
		}
	});

	EventBus.register(GET_PUBLIC_KEY_NS, {
		OnMessage: function (aMsg) {
			aMsg.reply({
				data: DatabaseService.getUserPublicKey(aMsg.username)
			});
		}
	});

	EventBus.register(GET_KEYS_NS, {
		OnMessage: function (aMsg) {
			aMsg.reply({
				data: DatabaseService.getUserKeys(aMsg.username)
			});
		}
	});

	// to be invoked from backend
	EventBus.register(SET_KEYS_NS, {
		OnMessage: function (aMsg) {
			aMsg.reply({
				data: DatabaseService.setUserKeys(aMsg.username, aMsg.privateKey, aMsg.publicKey)
			});
		}
	});

	// to be invoked from backend
	EventBus.register(SET_PRIVATE_KEY_NS, {
		OnMessage: function (aMsg) {
			aMsg.reply({
				data: DatabaseService.setUserPrivateKey(aMsg.username, aMsg.privateKey)
			});
		}
	});

	// to be invoked from backend
	EventBus.register(REMOVE_KEYS, {
		OnMessage: function (aMsg) {
			aMsg.reply({
				data: DatabaseService.removeUserKeys(aMsg.username)
			});
		}
	});
}