/* global App, MongoDBUtils */

App.importScript('${EXT}/MongoDBUtils');
DatabaseService = (function () {
	var mKeys = App.getAppBean(App.getStorage().get('database').keys);

	// create/ensure username field index
	mKeys.createIndex(MongoDBUtils.toDBObject({
		username: 1
	}), MongoDBUtils.toDBObject({
		unique: true
	}));

	return {
		setUserKeys: function (aUsername, aPrivateKey, aPublicKey) {
			if (null != this.getUserPrivateKey(aUsername)) {
				mKeys.update(MongoDBUtils.toDBObject({
					username: aUsername
				}), MongoDBUtils.toDBObject({
					'$set': MongoDBUtils.toDBObject({
						privateKey: aPrivateKey,
						publicKey: aPublicKey,
						editedAt: new Date().getTime()
					})
				}));
			} else {
				mKeys.save(MongoDBUtils.toDBObject({
					username: aUsername,
					privateKey: aPrivateKey,
					publicKey: aPublicKey,
					createdAt: new Date().getTime(),
					editedAt: new Date().getTime()
				}));
			}
		},
		setUserPrivateKey: function (aUsername, aPrivateKey) {
			if (null != this.getUserPrivateKey(aUsername)) {
				mKeys.update(MongoDBUtils.toDBObject({
					username: aUsername
				}), MongoDBUtils.toDBObject({
					'$set': MongoDBUtils.toDBObject({
						privateKey: aPrivateKey,
						editedAt: new Date().getTime()
					})
				}));
			} else {
				mKeys.save(MongoDBUtils.toDBObject({
					username: aUsername,
					privateKey: aPrivateKey,
					createdAt: new Date().getTime(),
					editedAt: new Date().getTime()
				}));
			}
		},
		removeUserKeys: function (aUsername) {
			mKeys.remove(MongoDBUtils.toDBObject({
				username: aUsername
			}));
		},
		getUserPrivateKey: function (aUsername) {
			var lRecord = mKeys.findOne(MongoDBUtils.toDBObject({
				username: aUsername
			}), MongoDBUtils.toDBObject({
				privateKey: true
			}));

			return (null !== lRecord) ? lRecord.get('privateKey') : null;
		},
		getUserPublicKey: function (aUsername) {
			var lRecord = mKeys.findOne(MongoDBUtils.toDBObject({
				username: aUsername
			}), MongoDBUtils.toDBObject({
				publicKey: true
			}));

			return (null != lRecord) ? lRecord.get('publicKey') : null;
		},
		getUserKeys: function (aUsername) {
			var lRecord = mKeys.findOne(MongoDBUtils.toDBObject({
				username: aUsername
			}), MongoDBUtils.toDBObject({
				_id: false,
				username: false
			}));

			return (null != lRecord) ? lRecord.toMap() : null;
		}
	};
})();