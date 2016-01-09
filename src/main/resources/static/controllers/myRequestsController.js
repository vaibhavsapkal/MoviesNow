/**
 * 
 */

app.controller('myRequestsController', ['$scope','$http','$location','Auth', function($scope,$http,$location,Auth){

	$scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

		
		if(!value && oldValue) {

			console.log("Disconnect");
			$scope.isLoggedIn = false; 
			$location.path('/home');
		}
		else if(value){
			$scope.isLoggedIn = true;
		}

		$scope.movies= [];
		$scope.loadMyMovies = function(){	
			$scope.movies= [];			
			$http({ method: 'GET', url: 'http://localhost:8181/videos/requests/'+ Auth.getUser().user_id, headers: {'Content-Type': 'application/json'}
			}).
			success(function (data, status, headers, config) {				
				console.log("inside myRequestsController success");
				console.log(data);			
				var userId = Auth.getUser().user_id;				
				angular.forEach(data, function(item){						
					console.log(item);											
					var isMovieBorrowed = false;
					var userRequest = null;
					angular.forEach(item.requests, function(req){	
						if(req.borrowerId == userId){
							userRequest = req;
							if(req.checkOutDate != null ){
								isMovieBorrowed = true;									
							}
							else{
								isMovieBorrowed = false;
							}
						}
					});
					$scope.movies.push({
						id: item.videoId,
						Name: item.movie.name,					
						img: item.movie.img,
						director: item.movie.director,
						actor : item.movie.actor,
						year: item.movie.year,
						rating: item.movie.rating,
						request: userRequest,
						isBorrowed: isMovieBorrowed,
						owner: item.user,
						returned: false						
					});					
				});				
				console.log("inside my Requests");
				console.log($scope.movies);
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}
		$scope.loadMyMovies();
		
		
		
		$scope.returnMovie = function(movie){
			console.log(movie);
			$http({method: 'POST', url: "http://localhost:8181/request/deny", headers: {'Content-Type': 'application/json'},
				data:{requestId: movie.request.requestId,videoId: movie.request.videoId, borrowerId: movie.request.borrowerId}
			}).			
			success(function(data,status,headers,config){
				alert("Movie returned successfully");
				movie.returned = true;
			}).
			error(function(data,status,headers,config){
				console.log(data);
				console.log(status);
			});
		}				
	},true);
}])