/**
 * 
 */


app.controller('signInController', ['$scope','$http','$rootScope','Auth', function($scope, $http, $rootScope,Auth){
	
	$scope.isRegistered = false;
	$scope.signin = function(){		
		$http({ method: 'POST', url: 'http://localhost:8181/signIn', headers: {'Content-Type': 'application/json'},
			data:{email: $scope.userEmail, password: $scope.userPassword}
		}).
		success(function (data, status, headers, config) {		 
			Auth.setUser(data);
			$scope.isRegistered = true;
			console.log($scope.isRegistered);
		}).
		error(function (data, status, headers, config) {
			alert("Error occured");

		});
	}

	$scope.signUp = function(){						
		$http({method: 'POST',url: 'http://localhost:8181/signUp', header : {'Content-Type':'application/json'},
			data:{name: $scope.Name, email: $scope.Email, password: $scope.Password }
		}).
		success(function (data, status, headers, config) {
			console.log(data);
			console.log("Successful SignUp");
		}).
		error(function (data, status, headers, config) {
			alert("Error occured");
		});
	}
	
	$scope.signOut = function(){		
		Auth.setUser({id: -1,name: '', email: ''});
		$scope.isRegistered = false;
	}

}]);