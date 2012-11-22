function ManageCtrl($scope, $routeParams) {
	
}

function ViewCtrl($scope, $routeParams) {
	
}

function NavCtrl($scope, $location) {
	$scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'view';
        return page === currentRoute ? 'active' : '';
    };  
}

function HotelsCtrl($scope) {
	$scope.hotels = [{id:0, name:'Bar'}, {id:1, name:'Foo'}];
}