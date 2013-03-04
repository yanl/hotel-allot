angular.module('components', []).
  directive('hotelrooms', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { idHotel:'=', idRoom:'='},
      controller: function($scope, $element, $http, Hotel, Room) {
		 $scope.hotels = Hotel.query();
		 if ($scope.idHotel) {
			getRoom($scope.idHotel);
		 }
		 function getRoom(idHotel) {
			var placeholder = 'No rooms found';
			Room.query(idHotel).then(function(e) {
			  $scope.rooms = e;
			  if ($scope.rooms.length) {
				  if ($scope.rooms.length > 1) {
					 placeholder = $scope.rooms.length + ' rooms';
				  } else {
					 placeholder = '1 room';
				  }
			  }
			  $($element).find('.view-room').attr('placeholder', placeholder);
			});
		 }
		 $scope.hotelChange = function(idHotel) {
			if (!idHotel) {
			   $scope.idHotel = null;
			   $scope.idRoom = null;
			   $scope.rooms = null;
			   return;
			}
			getRoom(idHotel);
		 };
		 $scope.roomChange = function(idRoom) {
			if (!idRoom) {
			   $scope.idRoom = null;
			}
		 }
		 $scope.roomFormatSel = function(room) {
			var e = $(room.element);
			return e.data('cat') + ' ' + e.data('occupancy') + ' ' + e.data('meal');
			return '<span class="sRoom"><span>' + e.data('cat') + '</span>' + '<span class="srDetails">'+e.data('occupancy')+' '+e.data('meal')+'</span></span>';
		 }
		 $scope.roomFormat = function(room) {
			var e = $(room.element);
			return '<div class="sRoom">'+
					 '<div class="srCat">'+
						e.data('cat')+
					 '</div>'+
					 '<div class="srDetails">'+e.data('occupancy')+' '+e.data('meal')+'</div>'+
				  '</div>';
		 }
      },
      templateUrl:'partials/hotelRoomCtrl.html',
      replace: true
    };
  }).
   directive('filter', function() {
   return {
	  require: '^hotelrooms',
      restrict: 'E',
      transclude: true,
      scope: {model:'='}, //
      controller: function($scope, $rootScope, $element) {
		 $scope.model = {enable: false, idFilter:null, dateFrom:null, dateTo:null, idHotel:0, idRoom:0};
		 $scope.applyFilter = function() {
			if (!($scope.model.dateFrom || $scope.model.dateTo || $scope.model.idHotel || $scope.model.idRoom)) {
			   $scope.clearFilter();
			   return;
			}
			$scope.model.enable = true;
			$rootScope.$emit('filterApply', $scope.model);
			//console.log('Filter Alloc', $scope);
		 }
		 $scope.clearFilter = function() {
			$scope.model = {enable: false, dateFrom:null, dateTo:null, idHotel:null, idRoom:null};
			$rootScope.$emit('filterClear', $scope.model);
			//$('#filter-clear-btn').tooltip('hide');
		 }

      },
      templateUrl:'partials/filter.html',
      replace: true
   };
  }).
  directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
  
var app = angular.module('hotelAllot',['ui', 'ui.bootstrap', 'ngGrid', 'components', 'allotServices'] )
.config(['$routeProvider', function($routeProvider) {
$routeProvider
   .when('/manage/:action', {templateUrl:'partials/manage.html', controller:ManageCtrl})
   .when('/view', {templateUrl:'partials/view.html', controller:ViewCtrl})
   .otherwise({redirectTo:'/view'});
}]);

app.factory('serviceId', function() {
  var shinyNewServiceInstance;
  //factory function body that constructs shinyNewServiceInstance
  return shinyNewServiceInstance;
});

app.value('ui.config', {
   select2: {
      allowClear: true
   }
});