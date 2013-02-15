angular.module('allotServices', ['ng'], function($provide) {
  $provide.factory('Allot', ['$http', '$q', function($http, $q) {
	var self = this;
	var allot = {
		query: function(cache) {
			if (typeof cache === 'undefined') {
				cache = true;
			}
			var d = $q.defer();
			$http.get('/DMS/components/hotel_allot.cfc?method=getAllocs', {cache:cache}).success(function(data) {
				d.resolve(data);
			});
			return d.promise;
		},
		save: function(allot) {
			var d = $q.defer();
			$http({
				method:'POST',
				url: '/DMS/components/hotel_allot.cfc',
				params: {
					method:"setAllot",
					argumentCollection:{allot: allot}, 
					returnFormat:"json"
				}
			})
			.success(function(data) {
				//$(Document).trigger('change');
				d.resolve(data);
			});
			return d.promise;
		},
		get: function(id) {
			
		}
	};
	return allot;
  }]);
  
  $provide.factory('Hotel', ['$http', '$q', function($http, $q) {
	return {
		query: function(cache) {
			if (typeof cache === 'undefined') {
				cache = true;
			}
			var d = $q.defer();
			$http.get('/DMS/components/hotel_allot.cfc?method=getHotels', {cache:cache}).success(function(data) {
				d.resolve(data);
			});
			return d.promise;
		}
	};
  }]);
  
});