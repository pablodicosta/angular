var app = angular.module('uiApp', [
	'ui.bootstrap',
	'ui.router',
	'ui.utils',
	'ui.grid',
	'ui.grid.edit',
	'ui.grid.selection',
	'uiGmapgoogle-maps',
	'ngSanitize'
]);

app.config(function ($stateProvider, uiGmapGoogleMapApiProvider) {

	uiGmapGoogleMapApiProvider.configure();

	$stateProvider.state('home', {
		url: '',
		templateUrl: 'views/home.html',
		controller: 'homeCtrl',
		resolve: {
			lorem: function ($q, $http) {
				var deferred = $q.defer();
				$http.get('/rest/lorem').then(function (res) {
					deferred.resolve(res.data);
				});
				return deferred.promise;
			}
		}
	}).state('images', {
		templateUrl: 'views/images.html',
		controller: 'imagesCtrl'
	}).state('maps', {
		templateUrl: 'views/maps.html',
		controller: 'mapsCtrl'
	});
});