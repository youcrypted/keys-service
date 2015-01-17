App.importScript('${APP_HOME}/config');

App.on('appLoaded', function () {
	App.setDescription("User's RSA keys service for TESN");

	// loading services
	App.importScript('${APP_HOME}/service/database');

	// loading controllers
	App.importScript('${APP_HOME}/controller/keys');
});

App.on(['beforeAppReload', 'systemStopping'], function () {
	// releasing resources
	DatabaseService.shutdown();
});