function ManageCtrl($scope, $rootScope, $routeParams, $http, $filter, $dialog, Allot) {
	var self = this;
	var dialog;
	$scope.selectedAlloc = [];
	$scope.filteredAllocs = Allot.query();
	//Allot.query().then(function(e) {
	//	$scope.filteredAllocs =  e;
	//});

	$rootScope.$on('dataChange', function(n, o) {
		$scope.refresh();
	});
	$rootScope.$on('close', function(n, o) {
		if (typeof dialog === 'undefined') {
			return;
		}
		dialog.close();
	});
	$scope.$on('filterChange', function(n, o) {
		$scope.refresh();
	});
	
	$scope.refresh = function() {
		console.log('refreshing ...');
		// We use .then() because this simple version of ng-grid doesn't work with promises
		Allot.query(false).then(function(e) {
			$scope.filteredAllocs =  e;//console.log(e);
		});
	}
	$scope.showAdd = function() {
		if (!dialog) {
			dialog = $dialog.dialog({
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				templateUrl: 'partials/add.html',
				controller: 'AddCtrl'
				});
		}
		dialog.open();
	}
	self.getData = function(args) {
		var argsOut = '';
		if (typeof args === 'object') {
			angular.forEach(args, function(e, v) {
				if (e) {
					switch (v) {
						case 'dateFrom':
						case 'dateTo':
							e =  $filter('date')(e,'yyyy-MM-dd');
						break;
					}
					argsOut += '&' + v + '=' + e;
				}
			});
		}
		//console.log('argsOut', argsOut, args);
		//console.log('$scope.filteredAllocs', $scope.filteredAllocs);
		//$http.get('/DMS/components/hotel_allot.cfc?method=getAllocs'+argsOut, {cache:true}).success(function(data) {
		//	self.allocs = data;
		//	$scope.filteredAllocs = self.allocs;
		//});
	}

	//$scope.$watch('filter', function(e) {
	//	console.log('*watch trigger', e);
	//	self.getData(e);
	//}, true);
	
	$scope.gridOptions = {
	   data: 'filteredAllocs',
	   jqueryUITheme: false,
	   showColumnMenu: false,
	   enablePaging: false,
	   selectedItems: $scope.selectedAlloc,
		columnDefs: [{ field: 'hotelName', displayName: 'Hotel', width: 200 },
					 { field: 'roomName',  displayName: 'Room', width: 100 },
					 { field: 'dateFrom', displayName: 'From', width: 75,},
					 { field: 'dateTo', displayName: 'To', width: 75}]
	};
	self.getData();
}

function AddCtrl($scope, $rootScope, $dialog, Allot) {
	$scope.allot = {};
	$scope.allot.type = 'allotment';
	$scope.allot.from = null;
	$scope.allot.to = null;
	$scope.allot.idHotel = null;
	$scope.allot.idRoom = null;
	$scope.allot.releaseType = 'days';
	$scope.valid = false;
	$scope.isLoading = '';
	$scope.save = function() {
		$scope.isLoading = 'loading';
		var allot = {
			type: $scope.allot.type,
			from: $scope.allot.from,
			to: $scope.allot.to,
			idHotel: $scope.allot.idHotel,
			idRoom: $scope.allot.idRoom,
			releaseType: $scope.allot.releaseType
		};
		Allot.save(allot).then(function(e) {
			$scope.isLoading = '';
			$rootScope.$emit('dataChange');
		});
	}
	 $scope.close = function() {
		$rootScope.$emit('close');
	 }
}

function ViewCtrl($scope, $rootScope, $routeParams, Allot) {
	$scope.Allot
	$scope.events = [];
	//$scope.eventsSource = [{events:$scope.events, color:'red'}];
	$scope.eventsSource = [$scope.events];
	$scope.equalsTracker = 0;

	$scope.$on('filterChange', function(n, o) {
		$scope.refresh();
	});
	
	$scope.refresh = function() {
		console.log('refreshing ...');
		Allot.query(false).then(function(e) {
			$scope.filteredAllocs =  e;//console.log(e);
			//$scope.events = [];
			toEvents($scope.filteredAllocs);
		});
	}
	
	var toEvents = function(allocs) {
		var events = [];
		$scope.events.splice(0, $scope.events.length);
		allocs.forEach(function(elem, i) {
			$scope.events.push(
				{id: elem.id,
				title: elem.hotelName+' - '+elem.roomName,
				start: $.datepicker.parseDate('dd/mm/yy', elem.dateFrom),
				end: $.datepicker.parseDate('dd/mm/yy', elem.dateTo),
				allDay: true,
				className:'event-allot'
				}
			);
		});
		return events;
	}
	 
	$scope.addChild = function() {
	  $scope.events.push({
		title: 'Open Sesame',
		start: new Date(y, m, 28),
		end: new Date(y, m, 29)
	  });
	}
	
	$scope.remove = function(index) {
	  $scope.events.splice(index,1);
	}
	
	$scope.refresh();
}

function NavCtrl($scope, $location) {
	$scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1) || 'view';
		//console.log('currentroute', currentRoute);
        return page === currentRoute ? 'active' : '';
    };  
}

function FilterCtrl($scope, $rootScope, Allot) {
	$scope.filter = Allot.getFilter();
	console.log('view filter', $scope.filter);
	$scope.applyFilter = function() {
	   if (!($scope.filter.dateFrom || $scope.filter.dateTo || $scope.filter.idHotel || $scope.filter.idRoom || $scope.filter.type)) {
		  $scope.clearFilter();
		  return;
	   }
	   $scope.filter.enable = true;
	   Allot.setFilter($scope.filter);
	   $rootScope.$broadcast('filterChange', $scope.filter);
	}
	$scope.clearFilter = function() {
	   $scope.filter = {enable: false, dateFrom:null, dateTo:null, idHotel:null, idRoom:null, type:null};
	   Allot.setFilter($scope.filter);
	   $rootScope.$broadcast('filterChange', $scope.filter);
	}

}

function FilterViewCtrl($scope, Allot) {
	$scope.$on('filterChange', function(n, o) {
		$scope.refresh();
	});
	$scope.refresh = function() {
		$scope.filter = Allot.getFilter();
	}
	$scope.refresh();
}