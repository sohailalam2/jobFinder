/**
 * The entry point for AngularJS application
 */

var jobsApp = angular.module('jobsApp', ['ngResource']);

// The JobController
// It injects the jobs angular service
jobsApp.controller('JobController', function($scope, $resource, jobs) {
    // Get all jobs using the handy angular resource
    $scope.jobs = $resource('/api/jobs').query();

    // Post a new job using the jobs angular service
    $scope.submit = function() {
        var job = {
            title: $scope.title,
            description: $scope.description
        };
        jobs.save(job);
        $scope.jobs.push(job);
    };

});