angular.module('components', []).
  directive('hotelrooms', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {hotelModel:'=', roomModel:'='}, //
      controller: function($scope, $element, $http, Hotel) {
		 $scope.idHotel = null;
		 $scope.idRoom = null;
		 $scope.hotels = Hotel.query();
		// $http.get('/DMS/components/hotel_allot.cfc?method=getHotels', {cache:true}).success(function(data) {
		//	$scope.hotels = data;
		// });
		 // add linking function
		 $scope.hotelChange = function(idHotel) {
			if (!idHotel) {
			   $scope.idHotel = null;
			   $scope.idRoom = null;
			   $scope.rooms = null;
			   //$scope.filter.idHotel = null;
			   try {
				  $scope.hotelModel = null;
			   } catch (e) {}
			   $($element).find('.view-room').attr('placeholder', 'Rooms');
			   return;
			}
			$scope.hotelModel = idHotel;
			//console.log($scope.hotelModel);
			//$scope.filter.idHotel = idHotel;
			$http.get('/DMS/components/hotel_allot.cfc?method=getRooms&idHotel='+idHotel, {cache:true}).success(function(data) {
			   $scope.rooms = data;
			   var placeholder = 'No rooms found';
			   if ($scope.rooms.length) {
				  placeholder = $scope.rooms.length + ' rooms';
			   }
			   $($element).find('.view-room').attr('placeholder', placeholder);
			});
		 };
		 
		 $scope.roomChange = function(idRoom) {
			if (!idRoom) {
			   $scope.idRoom = null;
			   $scope.roomModel = null;
			   return;
			}
			$scope.roomModel = idRoom;
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
  
var app = angular.module('hotelAllot',['ui', 'ngGrid', 'components', 'allotServices'] )
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