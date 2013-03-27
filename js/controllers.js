function ManageCtrl($scope, $rootScope, $routeParams, $http, $filter, $dialog, Allot) {
	var self = this;
	var dialog;
	self.dialog = null;
	$scope.selectedAlloc = [];
	$scope.filteredAllocs = Allot.query();
	//Allot.query().then(function(e) {
	//	$scope.filteredAllocs =  e;
	//});

	$rootScope.$on('dataChange', function(n, o) {
		$scope.refresh();
	});
	$scope.$on('dialogClose', function(n, o) {
		if (self.dialog == null) {
			return;
		}
		self.dialog.close();
	});
	$scope.$on('filterChange', function(n, o) {
		$scope.refresh();
	});
	
	$scope.refresh = function() {
		console.log('refreshing ...');
		// We use .then() because this simple version of ng-grid doesn't work with promises
		Allot.query(false).then(function(e) {
			$scope.selectedAlloc.length = 0;
			$scope.filteredAllocs =  e;
		});
	}
	self.showAdd = function(edit) {
		if (edit) {
			Allot.setEditMode(true);
		} else {
			Allot.setEditMode(false);
		}
		var ctrl = 'AddCtrl';
		//if (edit) ctrl = 'EditCtrl';
		if (!self.dialog || self.lastAddCtrl != ctrl) {
			self.dialog = $dialog.dialog({
				backdrop: true,
				keyboard: true,
				backdropClick: true,
				dialogFade:false,
				templateUrl: 'partials/add.html',
				controller: ctrl
				});
		}
		self.lastAddCtrl = ctrl;
		self.dialog.open();
	}
	$scope.add = function() {
		self.showAdd(false);
	}
	$scope.editSelected = function() {
		self.showAdd(true);
	}
	$scope.deleteSelected = function() {
		if (!confirm("Delete selected items?")) {
			return;
		}
		Allot.deleteSelected().then(function(e) {
			$scope.refresh();
		});
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
	$scope.$watch('selectedAlloc', function(e) {
		$rootScope.$emit('selectedAllocChange', e);
		Allot.setSelected(e);
	}, true);
	$scope.getLineClass = function(actionType) {
		var lineClass = 'line-none';
		switch (actionType) {
		case 'Booking':
			lineClass = 'line-booking';
			break;
		case 'Stop Sales':
			lineClass = 'line-stop';
			break;
		case 'Tentative':
			lineClass = 'line-tentative';
			break;
		case 'Free Sales':
			lineClass = 'line-free';
			break;
		case 'Allotement':
			lineClass = 'line-allot';
			break;
		}
		return lineClass;
	}
	$scope.gridOptions = {
	   data: 'filteredAllocs',
	   jqueryUITheme: false,
	   showColumnMenu: false,
	   enablePaging: false,
	   selectedItems: $scope.selectedAlloc,
		columnDefs: [{ field: 'actionType', displayName: 'Type', width: 75},
					 { field: 'hotelName', displayName: 'Hotel', width: 200 },
					 { field: 'roomName',  displayName: 'Room', width: 100 },
					 { field: 'dateFrom', displayName: 'From', width: 75,},
					 { field: 'dateTo', displayName: 'To', width: 75},
					 { field: 'client', displayName: 'Client', width: 75}
					 ],
		rowTemplate: '<div style="height: 100%" ng-class="getLineClass(row.getProperty(\'actionType\'))"><div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell " ng-cell></div></div>'
	};
	self.getData();
}

function AddCtrl($scope, $rootScope, $dialog, Allot, Agency) {
	
	allot = {};
	allot.id = null;
	allot.actionType = 'Allotment';
	allot.dateFrom = null;
	allot.dateTo = null;
	allot.idHotel = null;
	allot.idRoom = null;
	allot.idAgency = 407;
	allot.releaseType = 'days';
	$scope.valid = false;
	$scope.isLoading = '';
	$scope.types = Allot.getTypes();
	$scope.agencies = Agency.query();
	
	$scope.allot = allot;
	
	var selected = Allot.getSelected()[0];
	$scope.isEdit = Allot.getEditMode();
	if ($scope.isEdit) {
		allot.id = selected.id;
		allot.actionType = selected.actionType;
		allot.dateFrom = selected.dateFrom;
		allot.dateTo = selected.dateTo;
		allot.idHotel = selected.idHotel;
		allot.idRoom = selected.idRoom;
		allot.idAgency = selected.idAgency;
		allot.client = selected.client;
	}
	$scope.typeChange = function() {
		if ($scope.allot.actionType == 'Allotment') {
			$scope.allot.idAgency = 407;
		}
	}
	$scope.save = function() {
		$scope.isLoading = true;
		var allot = {
			actionType: $scope.allot.actionType,
			dateFrom: $scope.allot.dateFrom,
			dateTo: $scope.allot.dateTo,
			idHotel: $scope.allot.idHotel,
			idRoom: $scope.allot.idRoom,
			releaseType: $scope.allot.releaseType
		};
		Allot.save(allot).then(function(e) {
			$scope.isLoading = false;
			$rootScope.$emit('dataChange');
			$scope.close();
		});
	}
	$scope.close = function() {
	   $('.select2-drop-active').hide();
	   $rootScope.$broadcast('dialogClose');
	}
}

function ViewCtrl($scope, $rootScope, $routeParams, Allot) {
	$scope.Allot
	$scope.events = [];
	//$scope.eventsSource = [{events:$scope.events, color:'red'}];
	$scope.eventsSource = [$scope.events];
	$scope.equalsTracker = 0;
	$scope.date = ""
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
		var specificClass = '';
		$scope.events.splice(0, $scope.events.length);
		allocs.forEach(function(elem, i) {
			specificClass = '';
			switch (elem.actionType) {
				case 'Booking':
					specificClass = 'event-allot-booking';
				break;
				case  'Stop Sales':
					specificClass = 'event-allot-stop';
				break;
				case  'Free Sales':
					specificClass = 'event-allot-free';
				break;
				case  'Tentative':
					specificClass = 'event-allot-tentative';
				break;
				case 'None':
					specificClass = 'event-allot-none';
				break;
			}
			$scope.events.push(
				{id: elem.id,
				title: elem.hotelName+' - '+elem.roomName,
				start: $.datepicker.parseDate('dd/mm/yy', elem.dateFrom),
				end: $.datepicker.parseDate('dd/mm/yy', elem.dateTo),
				allDay: true,
				className:'event-allot '+specificClass
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
	$scope.version = '0xf00';
	$scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1) || 'view';
		//console.log('currentroute', currentRoute);
        return page === currentRoute ? 'active' : '';
    };  
}

function FilterCtrl($scope, $rootScope, Allot) {
	$scope.filter = Allot.getFilter();
	$scope.types = Allot.getTypes();
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

function RecipientsController($scope,$http) {
    $scope.url = 'recipients.json';
    $scope.recipientsList = [];

    $scope.fetchRecipients = function() {
        $http.get($scope.url).then(function(result){
            $scope.recipientsList = result.data;
        });
    }

    $scope.fetchRecipients();
}