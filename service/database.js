App.importScript('${EXT}/MongoDBUtils');
DatabaseService = (function () {
	var lBeanId = App.getStorage().get('database').beanId;
	var mKeys = App.getAppBean(lBeanId);

	// create/ensure username field index
	mKeys.createIndex(MongoDBUtils.toDBObject({
		username: 1
	}), MongoDBUtils.toDBObject({
		unique: true
	}));

	return {
		getPrivateKey: function (aUsername) {
			var lRecord = mKeys.findOne(MongoDBUtils.toDBObject({
				username: aUsername
			}), MongoDBUtils.toDBObject({
				privateKey: true
			}));

			return (null !== lRecord) ? lRecord.get('privateKey') : null;
		},
		getPublicKey: function (aUsername) {
			var lRecord = mKeys.findOne(MongoDBUtils.toDBObject({
				username: aUsername
			}), MongoDBUtils.toDBObject({
				publicKey: true
			}));

			return (null != lRecord) ? lRecord.get('publicKey') : null;
		},
		getKeys: function (aUsername) {
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