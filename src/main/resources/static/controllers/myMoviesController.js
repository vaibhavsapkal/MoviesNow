/**
 * 
 */

app.controller('myMoviesController',['$scope','$http','$location','Auth', function($scope,$http,$location, Auth){

	$scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

		$scope.movies= [];
		if(!value && oldValue) {

			console.log("Disconnect");
			$scope.isLoggedIn = false; 
			$location.path('/home');
		}
		else if(value){
			$scope.isLoggedIn = true;
		}

		$scope.loadMyMovies = function(){	
			$scope.movies= [];
			$http({ method: 'GET', url: 'http://localhost:8181/videos/user/'+ Auth.getUser().user_id, headers: {'Content-Type': 'application/json'}
			}).
			success(function (data, status, headers, config) {				
				console.log("inside myMoviesController success");
				console.log(data);
				var isMovieBorrowed = false;
				angular.forEach(data, function(item){	
					console.log("inside my movies");
					console.log(item);	
					isMovieBorrowed = false;
					var requests =[];
					angular.forEach(item.requests, function(req){	
						if(req.checkOutDate != null){
							isMovieBorrowed = true;
							req.isBorrowed = true;
						}
						else{
							req.isBorrowed = false;
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
						requests: item.requests,
						isBorrowed: isMovieBorrowed
					});					
				});	

				console.log("printing movies");
				console.log($scope.movies);
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}
		$scope.loadMyMovies();

		$scope.findMovie = function(){
			$scope.isMovieFound = false;
			$http({ method: 'GET', url: 'http://www.omdbapi.com/?t='+ $scope.title +'&y=&plot=short&r=json', headers: {'Content-Type': 'application/json'}
			}).
			success(function (data, status, headers, config) {						
				if(data.Response == "True")
				{
					$scope.isMovieFound = true;
					$scope.movie= [];
					console.log($scope.isMovieFound);					
					$scope.movie.push({					
						Name: data.Title,
						img: data.Poster,
						director: data.Director,
						actor: data.Actors,
						year: data.Year,
						rating: data.imdbRating,
						description : data.Plot
					});
				}					  		 
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}


		$scope.addMovie = function(movie){		

			$http({method: 'GET', url: 'http://localhost:8181/movies/'+ movie.Name, headers: {'Content-Type': 'application/json'}
			}).
			success(function(data, status, headers, config){
				if(data.name == null){
					console.log(data);
					$scope.addNewMovie(movie);
				}
				else{
					console.log(data);
					$scope.addVideo(data.id,Auth.getUser().user_id);
				}
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}

		$scope.addNewMovie = function(movie){
			$http({method:'POST', url:'http://localhost:8181/movies/add', headers: {'Content-Type': 'application/json'},
				data: {name : movie.Name, img : movie.img, director : movie.director, actor : movie.actor, rating: movie.rating, year : movie.year, description: movie.description}			
			}).
			success(function(data, status, headers, config){
				$scope.addVideo(data.id,Auth.getUser().user_id)			
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}	

		$scope.addVideo = function(movieId,ownerId){
			$http({method: 'POST', url: 'http://localhost:8181/videos/add', headers: {'Content-Type': 'application/json'},
				data: {movieId: movieId, ownerId: ownerId}
			}).
			success(function(data,status,headers,config){
				alert("Movie added successfully");
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}
		
		$scope.accept = function(request,movie){
			$http({method: 'POST', url: "http://localhost:8181/request/accept", headers: {'Content-Type': 'application/json'},
				data:{requestId: request.requestId,videoId: request.videoId,borrowerId: request.borrowerId}
			}).
			success(function(data,status,headers,config){
				alert("Request accepted successfully");				
				movie.isBorrowed = true;
				angular.forEach(movie.requests, function(item){	
					if(item.borrowerId == request.borrowerId){						
						item.isBorrowed= true;
					}
					else{
						item.isBorrowed= false;
					}						
				});				
			}).
			error(function(data,status,headers,config){
				console.log(data);
				console.log(status);
			});
		}
		
		$scope.deny = function(request){
			$http({method: 'POST', url: "http://localhost:8181/request/deny", headers: {'Content-Type': 'application/json'},
				data:{requestId: request.requestId,videoId: request.videoId,borrowerId: request.borrowerId}
			}).
			success(function(data,status,headers,config){
				alert("Request declined successfully");
				request.isDelcined = true;
			}).
			error(function(data,status,headers,config){
				console.log(data);
				console.log(status);
			});
		}

	}, true);
}]);