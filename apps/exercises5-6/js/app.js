var app = angular.module('routes', ['ngRoute', 'ngCookies']);

var route1Model = {	routeId: 1 },
	route2Model = { routeId: 2 },
	route3Model = { routeId: 3 };

app.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
});

app.run(function ($rootScope, loginService, AUTH_EVENTS, $location) {
	$rootScope.$on('$routeChangeStart', function (event, next) {

		if(angular.isDefined(next.data)) {

			if(next.data.loginForm && loginService.isAuthenticated()) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			}

			var authorizedRoles = next.data.authorizedRoles;
			if(angular.isDefined(authorizedRoles)) {
				if(loginService.isAuthenticated()) {
					if(!loginService.isAuthorized(authorizedRoles)) {
						$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
					}
				} else {
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				}
			}
		}
	});

	$rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
		$location.path('login');
	});

	$rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
		$location.path('noaccess');
	});

	$rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
		$location.path('route1');
	});

	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
		$location.path('login');
	});
});