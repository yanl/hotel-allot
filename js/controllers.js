function ManageCtrl($scope, $rootScope, $routeParams, $http, $filter, $dialog, Allot) {
	var self = this;
	var dialog;
	self.dialog = null;
	$scope.action = $routeParams.action;
	$scope.selectedAlloc = [];
	$scope.filteredAllocs = Allot.query();
	$scope.allotConditions = Allot.queryConditions();
	
	$scope.gridOptions = {
	   data: 'filteredAllocs',
	   jqueryUITheme: false,
	   showColumnMenu: false,
	   enablePaging: false,
	   selectedItems: $scope.selectedAlloc,
		columnDefs: [{ field: 'actionType', displayName: 'Type', width: 75},
					 { field: 'hotelName', displayName: 'Hotel', width: 120 },
					 { field: 'roomName',  displayName: 'Room', width: 108 },
					 { field: 'dateFrom', displayName: 'From', width: 75,},
					 { field: 'dateTo', displayName: 'To', width: 75},
					 { field: 'client', displayName: 'Client', width: 75},
					 { field: 'agencyName', displayName: 'Agency', width: 75}
					 ],
		rowTemplate: '<div style="height: 100%" ng-class="getLineClass(row.getProperty(\'actionType\'))"><div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell " ng-cell></div></div>'
	};
	
	$scope.allotConditionsOptions = {
	   data: 'allotConditions',
	   jqueryUITheme: false,
	   showColumnMenu: false,
	   enablePaging: false,
	   selectedItems: $scope.selectedAlloc,
		columnDefs: [{ field: 'actionType', displayName: 'Type', width: 75},
					 { field: 'hotelName', displayName: 'Hotel', width: 120 },
					 { field: 'roomName',  displayName: 'Room', width: 108 },
					 { field: 'dateFrom', displayName: 'From', width: 75,},
					 { field: 'dateTo', displayName: 'To', width: 75},
					 { field: 'comment', displayName: 'Comments', width: 175}
					 ],
		rowTemplate: '<div style="height: 100%" ng-class="getLineClass(row.getProperty(\'actionType\'))"><div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell " ng-cell></div></div>'
	};
	
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
		Allot.queryConditions(false).then(function(e) {
			$scope.allotCondtions.length = 0;
			$scope.allotCondtions =  e;
		});
	}
	self.showAdd = function(edit, type) {
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
		self.showAdd(false, $scope.action);
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
}

function AddCtrl($scope, $rootScope, $dialog, Allot, Agency) {
	
	allot = {};
	allot.id = 0;
	allot.actionType = 'Allotment';
	allot.dateFrom = new Date();
	allot.dateTo = null;
	allot.idHotel = null;
	allot.idRoom = null;
	allot.idAgency = 407;
	allot.noRoom = 1;
	allot.releaseDay = 30;
	allot.releaseDate = null;
	allot.releaseType = 'days';
	allot.comment = '';
	allot.client = '';
	$scope.valid = false;
	$scope.isLoading = '';
	$scope.types = Allot.getTypes();
	$scope.typesNoAllot =  Allot.getTypes(true); // No Allot
	$scope.agencies = Agency.query();
	
	$scope.allot = allot;
	
	var selected = Allot.getSelected()[0];
	$scope.isEdit = Allot.getEditMode();
	if ($scope.isEdit) {
		allot.id = selected.id;
		allot.actionType = selected.actionType;
		if (selected.actionType == 'None') allot.actionType = 'Booking';
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
		//var allot = {
		//	actionType: $scope.allot.actionType,
		//	dateFrom: $scope.allot.dateFrom,
		//	dateTo: $scope.allot.dateTo,
		//	idHotel: $scope.allot.idHotel,
		//	idRoom: $scope.allot.idRoom,
		//	releaseType: $scope.allot.releaseType
		//};
		Allot.save($scope.allot).then(function(e) {
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
	console.log($routeParams);
	//$scope.Allot
	$scope.events = [];
	$scope.eventsConditions = [];
	//$scope.eventsSource = [{events:$scope.events, color:'red'}];
	$scope.eventsSource = [$scope.events, $scope.eventsConditions];
	$scope.equalsTracker = 0;
	$scope.date = new Date();
	$scope.$on('filterChange', function(n, o) {
		$scope.refresh();
	});
	
	$scope.refresh = function() {
		console.log('refreshing ...');
		Allot.query(false).then(function(e) {
			$scope.filteredAllocs =  e;//console.log(e);
			//$scope.events = [];
			toEvents($scope.filteredAllocs, $scope.events);
			handleViewingDate();
		});
		Allot.queryConditions(false).then(function(e) {
			$scope.filteredAllocs =  e;//console.log(e);
			toEvents(e, $scope.eventsConditions);
			handleViewingDate();
		});
	}
	var handleViewingDate = function() {
		var date = new Date();
		if ($scope.events.length > 0) {
			try {
				date = $scope.events[0].start;
			} catch(e){}
		}
		$scope.date = date;
		
		// Force date change even if eventSource doesn't change.
		$scope.$evalAsync(function() {
			console.log('getDate:', $scope.calendar.fullCalendar('getDate'));
			$scope.calendar.fullCalendar('gotoDate', date );
		});
	}
	var toEvents = function(allocs, eventsSource) {
		//var events = [];
		var specificClass = '';
		eventsSource.splice(0, eventsSource.length);
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
			eventsSource.push(
				{id: elem.id,
				title: elem.hotelName+' - '+elem.roomName,
				start: $.datepicker.parseDate('dd/mm/yy', elem.dateFrom),
				end: $.datepicker.parseDate('dd/mm/yy', elem.dateTo),
				allDay: true,
				className:'event-allot '+specificClass
				}
			);
		});
		//return events;
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

function FilterCtrl($scope, $rootScope, Allot, Agency) {
	$scope.filter = Allot.getFilter();
	$scope.types = Allot.getTypes();
	$scope.agencies = Agency.query();
	$scope.applyFilter = function() {
	   if (!($scope.filter.dateFrom || $scope.filter.dateTo || $scope.filter.idHotel || $scope.filter.idRoom || $scope.filter.type || $scope.filter.idAgency)) {
		  $scope.clearFilter();
		  return;
	   }
	   $scope.filter.enable = true;
	   Allot.setFilter($scope.filter);
	   $rootScope.$broadcast('filterChange', $scope.filter);
	}
	$scope.clearFilter = function() {
	   $scope.filter = {enable: false, dateFrom:null, dateTo:null, idHotel:null, idRoom:null, type:null, idAgency:null};
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