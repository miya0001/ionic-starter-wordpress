angular.module( 'starter.controllers', [ 'ionic' ] )

.controller( 'posts', function( $scope, $config ) {
  $scope.apiRoot = $config.apiRoot;
} )

.controller( 'single', function( $scope, $stateParams, $config ) {
  $scope.apiRoot = $config.apiRoot;
  $scope.postId = $stateParams.id;
} )

.controller( 'page', function( $scope, $stateParams, $config ) {
  $scope.apiRoot = $config.apiRoot;
} )

;
