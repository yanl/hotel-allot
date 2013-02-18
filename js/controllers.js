function ManageCtrl($scope, $rootScope, $routeParams, $http, $filter, $dialog, Allot) {
	var self = this;
	$scope.filter = {enable: false, idFilter:null, dateFrom:null, dateTo:null, idHotel:0, idRoom:0};
	//$scope.filteredAllocs = Allot.query();
	$scope.filteredAllocs = [{id:1, hotelName:"xShandrani", roomName: "Ocean View", dateFrom:"01/02/2013", dateTo: "31/02/2013"}, 
				{id:3, hotelName:"NoCanDo", roomName: "Foobar View", dateFrom:"01/02/2013", dateTo: "31/02/2013"}, 
				{id:2, hotelName:"Le Paradis", roomName: "Junior x Single Room", dateFrom:"01/02/2013", dateTo: "31/02/2013"},
				{id:4, hotelName:"L'enfer", roomName: "Junior x Single Room", dateFrom:"01/02/2013", dateTo: "31/02/2013"}];

	$rootScope.$on('change', function(n, o) {
		console.log('event catched!');
		$scope.refresh();
	});
	$scope.applyFilter = function() {
		if (!($scope.filter.dateFrom || $scope.filter.dateTo || $scope.filter.idHotel || $scope.filter.idRoom)) {
			$scope.clearFilter();
		}
		$scope.filter.enable = true;
		self.getData($scope.filter);
		//console.log('Filter Alloc', $scope);
	}
	$scope.clearFilter = function() {
		$scope.filter = {enable: false, dateFrom:null, dateTo:null, idHotel:null, idRoom:null};
		self.getData($scope.filter);
		$('#filter-clear-btn').tooltip('hide');
	}
	$scope.refresh = function() {
		console.log('refreshing ...');
		// We use .then() because this simple version of ng-grid doesn't work with promises
		Allot.query(false).then(function(e) {
			$scope.filteredAllocs =  e;//console.log(e);
		});
	}
	$scope.showAdd = function() {
		var d = $dialog.dialog({
			backdrop: true,
			keyboard: true,
			backdropClick: true,
			templateUrl: 'partials/add.html', // OR: templateUrl: 'path/to/view.html',
			controller: 'AddCtrl'
			});
		d.open();
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
	
	// $scope.gridOptions = {
	// 	data: 'filteredAllocs',
	// 	jqueryUITheme: false,
	// 	showColumnMenu: false,
	// 	enablePaging: false,
	// 	selectedItems: $scope.selectedAlloc,
 //        columnDefs: [{ field: 'hotelName', displayName: 'Hotel', width: 200 },
 //                     { field: 'roomName',  displayName: 'Room', width: 100 },
 //                     { field: 'dateFrom', displayName: 'From', width: 75,},
 //                     { field: 'dateTo', displayName: 'To', width: 75}]
	// };
	$scope.gridOptions = {
		data: 'filteredAllocs',
		selectedItems: $scope.selectedAlloc
	};
	self.getData();
}

function AddCtrl($scope, $rootScope, Allot) {
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
			$rootScope.$emit('change');
		});
	}
	// $scope.close = function() {
	// 	dialog.close();
	// }
}

function ViewCtrl($scope, $routeParams) {
	$scope.filter = {enable: false, idFilter:null, dateFrom:null, dateTo:null, idHotel:0, idRoom:0};
	$scope.applyFilter = function() {
		if (!($scope.filter.dateFrom || $scope.filter.dateTo || $scope.filter.idHotel || $scope.filter.idRoom)) {
			$scope.clearFilter();
		}
		$scope.filter.enable = true;
		self.getData($scope.filter);
		//console.log('Filter Alloc', $scope);
	}
	$scope.clearFilter = function() {
		$scope.filter = {enable: false, dateFrom:null, dateTo:null, idHotel:null, idRoom:null};
		self.getData($scope.filter);
		$('#filter-clear-btn').tooltip('hide');
	}
}

function CalendarCtrl($scope) {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
   $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1),url: 'http://www.angularjs.org'},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: true}];
	
	$scope.eventsSource = [$scope.events];
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
}

function NavCtrl($scope, $location) {
	$scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1) || 'view';
		//console.log('currentroute', currentRoute);
        return page === currentRoute ? 'active' : '';
    };  
}