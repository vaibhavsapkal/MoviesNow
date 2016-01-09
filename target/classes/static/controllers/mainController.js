/**
 * 
 */

app.controller('mainController', ['$scope','$http','$rootScope','$location','Auth','Mandrill',function($scope,$http,$rootScope,$location,Auth,Mandrill){	

	
	$scope.modalVal;
	$scope.modalIndex;
	
	
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
		$scope.loadMovies = function(){	

			if(value){
				$scope.userId = Auth.getUser().user_id;				
			}
			else{
				$scope.userId = -1;
			}
			$http({ method: 'GET', url: 'http://localhost:8181/videos', headers: {'Content-Type': 'application/json'}
			}).
			success(function (data, status, headers, config) {
				$scope.movies= [];
				$scope.isOwner = false;
				angular.forEach(data, function(item){						
					if($scope.userId == item.ownerId){
						$scope.isOwner = true; 
					}
					else{
						$scope.isOwner = false;
					}	

					item['isBorrowed'] = false;
					item['isRequested'] = false;
					if($scope.isOwner == false && $scope.isLoggedIn){
						var requests = item.requests;
						
						if(requests.length!=0){
							angular.forEach(requests, function(request){
								if(request.checkOutDate != null){
									item['isBorrowed'] =  true;									
								}
								else if(request.borrowerId == $scope.userId){
									item['isRequested'] = true;									
								}															
							});
						}
					}

					$scope.movies.push({
						videoId: item.videoId,
						Name: item.movie.name,					
						location: item.movie.img,
						director: item.movie.director,
						actor : item.movie.actor,
						year : item.movie.year,
						rating : item.movie.rating,
						ownerName : item.user.name,
						ownerEmail : item.user.email,
						ownerName : item.user.name,
						ownerEmail : item.user.email,
						ownerId : item.user.id,
						isOwner: $scope.isOwner,
						isBorrowed : item.isBorrowed,
						isRequested : item.isRequested,
						isLoggedIn : $scope.isLoggedIn
					});
				});	

				console.log("printing movies");
				console.log(data);
				console.log($scope.movies);
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");
			});
		}
		$scope.loadMovies();



		$scope.rentMovie = function(movie,requestMessage){
							
			$http({ method: 'Post', url: 'http://localhost:8181/videos/rent', headers: {'Content-Type': 'application/json'},
				data: {videoId: movie.videoId, borrowerId: Auth.getUser().user_id}
			}).
			success(function(data,status,headers,config){
				console.log("inside request");
				console.log(requestMessage);									
				var emailText = "Hi,\n"+ Auth.getUser().name +" has requested for your movie:"+ movie.Name + "\n User says: " + requestMessage;
				var msgSubject = "Borrow request for movie "+ movie.Name;
				var fromMail = Auth.getUser().email;
				var fromName = Auth.getUser().name;
				var toEmail =  movie.ownerEmail;
				var toName = movie.ownerName;				
				Mandrill.sendMail(emailText,msgSubject,fromMail,fromName,toEmail,toName);					
			}).
			error(function(data,status,headers,config){
				console.log("failed");
			})			
		}		
	}, true);
}]);