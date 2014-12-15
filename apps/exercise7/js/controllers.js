app.controller('mainCtrl', function($scope, $modal) {

	$scope.template = { nav: "views/nav.html" };

	$scope.openGreetModal = function () {
		var greetModal = $modal.open({
			templateUrl: 'views/greet.html',
			controller: 'greetModalCtrl',
			resolve: {
				name: function () {
					return $scope.name;
				}
			}
		});

		greetModal.result.then(function(name) {
			$scope.name = name;
		});
	};
});

app.controller('greetModalCtrl', function ($scope, $modalInstance, name) {

	$scope.name = name;

	$scope.ok = function () {
		$modalInstance.close($scope.name);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss();
	};
});

app.controller('imagesCtrl', function ($scope) {

	$scope.imgs = [
		{ url: 'https://pbs.twimg.com/profile_images/2305843363/leqha8qaqwyjh9p9wx0k.jpeg' },
		{ url: 'http://www.triathlon.org.au/Assets/Triathlon+Australia+Digital+Assets/NSW/NSW+Events/NSW+Events+Images/kurnell+photo+3.jpg' },
		{ url: 'http://www.picturetopeople.org/images/artistic_mosaic_photo_effect_input.jpg' },
		{ url: 'http://www.google.com/+/images/learnmore/hero/hero-photos.jpg' }
	];

	$scope.gridOptions = {
		data: 'imgs',
		enableRowSelection: true,
		enableRowHeaderSelection: false,
		multiSelect: false,
		noUnselect: true,
		enableHorizontalScrollbar: false,
		enableVerticalScrollbar: false,
		enableSorting: false,
		columnDefs: [
			{ field: 'url', displayName: 'URL', enableColumnMenu: false, enableCellEdit: true }
		],
		onRegisterApi: function (gridApi) {
			$scope.gridApi = gridApi;
		}
	};

	$scope.add = function () {
		$scope.imgs.push({});
	};

	$scope.remove = function () {
		var item = $scope.gridApi.grid.selection.lastSelectedRow.entity;
			index = $scope.imgs.indexOf(item);
		$scope.imgs.splice(index, 1);
	};

});

app.controller('mapsCtrl', function ($scope, uiGmapGoogleMapApi) {
	uiGmapGoogleMapApi.then(function () {
		$scope.map = { center: { latitude: -32.892, longitude: -68.84 }, zoom: 16 };
	});
});

app.controller('homeCtrl', function ($scope, lorem) {
	$scope.lorem = lorem;
});