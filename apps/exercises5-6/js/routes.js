var getDate = function ($q, dateService) {
	var deferred = $q.defer();
	dateService.getDate()
		.then(function (data) {
			deferred.resolve(data);
		}, function () {
			deferred.reject();
		});
	return deferred.promise;
}

app.config(function ($routeProvider, USER_ROLES) {

	$routeProvider
		.when('/route1/:from?', {
			templateUrl: 'views/routeView.html',
			controller: 'routeCtrl',
			data: {
				authorizedRoles: [
					USER_ROLES.admin,
					USER_ROLES.editor,
					USER_ROLES.guest
				]
			},
			resolve: {
				model: function () { return route1Model; },
				dateInfo: getDate
			} 
		})
		.when('/route2/:from?', {
			templateUrl: 'views/routeView.html',
			controller: 'routeCtrl',
			data: {
				authorizedRoles: [
					USER_ROLES.admin,
					USER_ROLES.editor
				]
			},
			resolve: {
				model: function () { return route2Model; },
				dateInfo: getDate
			} 
		})
		.when('/route3/:from?', {
			templateUrl: 'views/routeView.html',
			controller: 'routeCtrl',
			data: {
				authorizedRoles: [
					USER_ROLES.admin
				]
			},
			resolve: {
				model: function () { return route3Model; },
				dateInfo: getDate
			}
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl',
			data: {
				loginForm: true
			}
		})
		.when('/noaccess', {
			template: 'Access Denied!'
		})
		.otherwise({
			redirectTo: '/route1'
		});
});