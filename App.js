App.setDescription("User's RSA keys service for TESN");

App.importScript('${APP_HOME}/config');
App.on('appLoaded', function () {
	// loading services
	App.importScript('${APP_HOME}/service/database');

	// loading controllers
	App.importScript('${APP_HOME}/controller/keys');
});
