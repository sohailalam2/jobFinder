app = angular.module('app', ['ngResource']);

app.controller('testController', function($scope, $resource, jobs) {
    $scope.jobs = $resource('/api/jobs').query();

    $scope.submit = function(){
        var job = {title: $scope.title, description: $scope.description};
        jobs.save(job);
        $scope.jobs.push(job);
    };

})