var app = angular.module("testApp", ['ngRoute']);
//custome Directive 
app.directive("elementDirective", function(){
	return {
		restrict : "E",
		template : "<h3>Directive</h3>"
	};
});
//controller
app.controller("formController", function($scope){
	$scope.student = {
		firstname : "vijay",
		lastname : "k",
		fullname : function(){
			var studentObj  = $scope.student;
			return studentObj.firstname+" "+studentObj.lastname;
		}
	};
});
//click events
app.controller("formController1", function($scope){
	$scope.value = "vijay";
	console.log($scope.value);
	$scope.count = 0;
	console.log($scope.count);
	$scope.countClicks = function(){
		$scope.count++;
	}
});
//custom filter
app.filter("stringReverse", function(){
	return function( str ) {
		var stringValue = str.split('').reverse();
		console.log(stringValue);
	}
});
//scope declaration
app.controller("scopeCOntroller", function($scope){
		$scope.name = "vijay";
		$scope.age = 40;
		$scope.place = "Newyork";
});
//multiple controllers and multiple scope
app.controller("parent", function($scope){
	$scope.name = "parent controller";
	$scope.color = "black";	
});
app.controller("child", function($scope){
	$scope.name = "child controller";
	//$scope.color = "black";	
	$scope.type = "child one";
});
//CUSTOME VALIDATIONS
app.directive("customeValidation", function(){
	return{
		require : 'ngModel',
		link: function(scope, element, attr, mCtrl){
			function validate(value){
				console.log("hai");
				if(value.indexOf("j") > -1){
					mCtrl.$setValidity('charE', true);
				}else{
					mCtrl.$setValidity('charE', false);
				}	
				return value;
			}
			mCtrl.$parsers.push(validate);
		}
	};
});
//Service VS Factory vs Provider
app.service("serviceApp", function(){
	this.message = "This is Service .. !";
}); 

app.factory("factoryApp", function(){
	var obj = {};
	obj.message = "This is Factory ... !";
	return obj;
});

app.provider("providerApp", function(){
	var m1 = "THis is provider ... !";
	return{
		setName : function(name){
			m1 += " "+name;
		},
		$get:function(){
			return{
				message : m1
			}	
		}
	}
});

app.config(function(providerAppProvider){
	providerAppProvider.setName("Vijay");
});

app.controller("SFP", function($scope, providerApp, factoryApp, serviceApp){
	$scope.message = [providerApp.message, factoryApp.message, serviceApp.message]
});

app.config(function($routeProvider){
	$routeProvider
				.when('/welcome',{
					templateUrl : 'welcome.html', controller : 'welcomeController'
				}).
				when('/contact',{
					templateUrl : 'contact.html', controller : 'contactController'
				}).
				otherwise({
					redirectTo: '/welcome'
				});
});

app.controller('welcomeController', function($scope) {
    $scope.message = "welcome Controller page will be used to display add student form";
});
         
app.controller('contactController', function($scope) {
	$scope.message = "View contactController page will be used to display all the students";
});
app.controller('httpCall', function($scope, $http, $window){
	$scope.getData = function(){
		$http.get('data1.json')
		.success(function(data, status){
			$scope.sites = data.sites;
			console.log("status:" + data);
			console.log("status:" + status);
		}).error(function(data, status){
			 console.error('Error occurred:', data, status);
		}).finally(function(){
			console.log("Finally.....!");
		});
	}
});