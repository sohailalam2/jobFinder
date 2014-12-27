var app = angular.module('app', ['ngResource']);

app.controller('testController', function($scope, $resource) {
    $scope.jobs = $resource('/api/jobs').query();
})