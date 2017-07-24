var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    
    .when('/forecast/:giorni', {
        templateUrl: 'pages/forecast.html',
        controller: 'secondController'
    })
    
    
    
});

//SERVICES

weatherApp.service('nomeCittà', function() {
   
    this.nome = "Caserta";
    
});





//CONTROLLERS
weatherApp.controller('mainController', ['$scope', '$location', 'nomeCittà',  function($scope, $location , nomeCittà) {
    
    $scope.nome = nomeCittà.nome;
    
    $scope.$watch('nome', function() {
       nomeCittà.nome = $scope.nome; 
    });
    
   $scope.submit = function(){
       
       $location.path("/forecast/0");
   }; 
   
}]);


weatherApp.controller('secondController', ['$scope','$resource','$routeParams', 'nomeCittà', function($scope,$resource,$routeParams, nomeCittà) {
     
    $scope.nome = nomeCittà.nome;
    $scope.giorni = $routeParams.giorni || 2;
    $scope.temperaturaAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=3c2610ed40c94c58f7d1bbae2eecde2e", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}} );
$scope.temperatura= $scope.temperaturaAPI.get({q: $scope.nome, cnt: $scope.giorni});
    
    $scope.celsius= function(degk){
        return Math.round (degk - 273.15);
    }
    
    $scope.convertiData= function(dt){
       return new Date(dt * 1000);
    }
                                 
    
}]);


weatherApp.controller('titleController', [function(){
    
   
    
}]);

//CUSTOM DIRECTIVE
weatherApp.directive("risultatiMeteo", function() {
   return {
       restrict: 'AECM',
       templateUrl: 'direttive.html',
       replace: true
   }
});