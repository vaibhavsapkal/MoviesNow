/**
 * 
 */

var app = angular.module('movies-now',['ngRoute','ui.bootstrap.modal']);

app.config(
		function($routeProvider) {

			$routeProvider.when('/home', {
				templateUrl : 'HTMLPartial/home.html',
				controller : 'mainController'
			});

			$routeProvider.when('/myMovies', {
				templateUrl : 'HTMLPartial/myMovies.html',
				controller : 'myMoviesController'
			});
			
			$routeProvider.when('/myRequests', {
				templateUrl : 'HTMLPartial/myRequests.html',
				controller : 'myRequestsController'
			});

			$routeProvider.otherwise({
				redirectTo : '/home'			
			});
		});

app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function (event) {

		if (!Auth.isLoggedIn()) {
			console.log('DENY');
			//event.preventDefault();
			$location.path('/home');
		}
		else {
			console.log('ALLOW');
			$location.path($location.path());
		}
	});
}]);

app.factory('Auth', function(){
	var user = {user_id: -1, name:'', email: ''};

	return{
		setUser : function(data){
			user.user_id = data.id;

			user.name = data.name;
			user.email = data.email;
			console.log("inside Auth");
			console.log(user);
		},
		isLoggedIn : function(){
			if(user.user_id == -1)
				return false;
			return true;
		},				
		getUser : function()
		{
			console.log("inside get User");
			return user;
		}
	}
})



app.factory('Mandrill', ['$http', function($http) {
	return {
		sendMail: function(msgText, msgSubject, fromEmail, fromName, toEmail, toName) {
			return $http.post("https://mandrillapp.com/api/1.0//messages/send.json", {
				"key": "WeHEhB3Y1AzZJdjMM_4ttQ",
				"message": {
					"html": "",
					"text": msgText,
					"subject": msgSubject,
					"from_email": fromEmail,
					"from_name": fromName,
					"to": [
					       {
					    	   'email': toEmail,
					    	   'name': toName,
					    	   'type': 'to'
					       }
					       ]
				}
			})
			.success(function(data, status, headers, config){
				alert("Email send successfully");				
			}).
			error(function (data, status, headers, config) {
				alert("Error occured");

			});
		}
	};
}]);





