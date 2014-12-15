app.service('userSession', function ($cookieStore) {
	return {
		create: function (userId, userRole) {
			$cookieStore.put('userId', userId);
			$cookieStore.put('userRole', userRole);
		},
		destroy: function () {
			$cookieStore.remove('userId');
			$cookieStore.remove('userRole');
		},
		get: function () {
			return {
				userId: $cookieStore.get('userId'),
				userRole: $cookieStore.get('userRole')
			}
		}
	}
});

app.service('loginService', function ($q, $http, userSession) {
	return {
		login: function (credentials) {
			var deferred = $q.defer();
			$http.post('/rest/login', credentials)
				.success(function (res) {
					if(res.username == credentials.user) {
						userSession.create(res.username, res.role);
						deferred.resolve();
					} else {
						deferred.reject(true);
					}
				})
				.error(function (res) {
					deferred.reject(false);
				});
			return deferred.promise;
		},
		logout: function () {
			userSession.destroy();
		},
		isAuthenticated: function () {
			return !!userSession.get().userId;
		},
		isAuthorized: function (roles) {
			if(!angular.isArray(roles)) {
				roles = [roles];
			}
			return this.isAuthenticated() && roles.indexOf(userSession.get().userRole) !== -1;
		},
		getUserInfo: function () {
			if(this.isAuthenticated()) {
				var result = {
					name: userSession.get().userId,
					role: userSession.get().userRole
				}
			} else {
				var result = null;
			}
			return result;
		}
	}
});

app.service('dateService', function ($q, $http) {
	return {
		getDate: function () {
			var deferred = $q.defer();
			$http.get('/rest/date')
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function () {
					deferred.reject();
				});
			return deferred.promise;
		}
	}
});