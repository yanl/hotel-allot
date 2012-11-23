function ManageCtrl($scope, $routeParams) {
	console.log($routeParams);
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
	$scope.hotels = [{id:0, name:'Qwerty'}, {id:1, name:'Foo'}];
}

function RoomAllocsCtrl($scope) {
	$scope.allocs = [{selected: false, id:0, hotelName:'Shandrany Resorts & Spa', roomName:'Deluxe', units:1, release:'', days:8, releaseDate:null, comment:'This is a comment'}, 
						{selected: true, id:0, hotelName:'Shandrany Resorts & Spa', roomName:'Prestige Villa', units:1, release:'', days:8, releaseDate:null, comment:'This is a comment'}];
	$scope.gridOptions = {
		data: 'allocs',
		jqueryUITheme: false,
		showColumnMenu: false,
		enablePaging: false,
		pagingOptions: {
			pageSizes: [1, 5, 10], //page Sizes
			pageSize: 1, //Size of Paging data
			totalServerItems: 0, //of how many items are on the server (for paging)
			currentPage: 1, //of what page they are currently on
		},
        columnDefs: [{ field: 'hotelName', displayName: 'Hotel', width: 200 },
                     { field: 'roomName',  displayName: 'Room', width: 100 },
                     { field: 'units', width: 40,},
                     { field: 'days', width: 40}]
		};
}