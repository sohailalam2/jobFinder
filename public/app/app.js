var app = angular.module('app', []);

app.controller('testController', function($scope) {
    $scope.jobs = [{
        title: 'Sales Person',
        description: 'you will fight dragon'
    }, {
        title: 'Software Programmer',
        description: 'you will be building time machine'
    }];
})