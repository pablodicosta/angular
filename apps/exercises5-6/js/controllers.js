app.controller('loginCtrl', function ($scope, $rootScope, loginService, AUTH_EVENTS) {
	$scope.login = function (credentials) {
		loginService.login(credentials)
			.then(function () {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			}, function (res) {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed, res);
			});
	};

	$rootScope.$on(AUTH_EVENTS.loginFailed, function (res) {
		$scope.loginResult = res ? "Invalid user or password..." : "Login failed...";
	});
});

app.controller('routeCtrl', function ($scope, $rootScope, $routeParams, model, dateInfo) {
	$scope.currentId = model.routeId;
	$scope.from = $routeParams.from;
	$scope.date = dateInfo.currentDate;
	$rootScope.$on('$routeChangeError', function () {
		$scope.date = 'ERROR!';
	});
});

app.controller('mainCtrl', function ($scope, $rootScope, $location, loginService, AUTH_EVENTS) {
	$scope.template = { nav: "views/nav.html" };
	$scope.isAuthenticated = loginService.isAuthenticated;
	$scope.userInfo = loginService.getUserInfo;

	$scope.$on('$routeChangeStart', function () {
		$scope.loading = true;
	});

	$scope.$on('$routeChangeSuccess', function () {
		$scope.loading = false;
	});

	$scope.go = function (path) {
		var currentRoute = $location.path().split('/')[1];
		$location.path(path + '/' + currentRoute);
	};

	$scope.logout = function () {
		loginService.logout();
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	};
});