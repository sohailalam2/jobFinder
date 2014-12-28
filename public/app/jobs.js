var jobsApp = angular.module('jobsApp');

jobsApp.factory('jobs', ['$resource', function($resource){
    return $resource('/api/jobs');
}]);