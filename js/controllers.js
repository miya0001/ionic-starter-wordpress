angular.module( 'starter.controllers', [ 'ionic' ] )

.controller( 'homeCtrl', function( $scope, WP ) {
  var query = {
    endpoint: 'posts',
    _embed: true
  }
  WP.query( query ).$promise.then( function( posts ) {
    $scope.posts = posts;
  } );

  $scope.reload = function() {
    WP.query( query ).$promise.then( function( posts ) {
      $scope.posts = posts;
      $scope.$broadcast( 'scroll.refreshComplete' );
    } );
  };
} )

.controller( 'singleCtrl', function( $scope, $stateParams, WP ) {
  var query = {
    endpoint: 'posts',
    id: $stateParams.id,
    _embed: true
  };
  WP.get( query ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'galleryCtrl', function( $scope, WP ) {
  var query = {
    endpoint: 'media',
    per_page: 20,
  }
  WP.query( query ).$promise.then( function( posts ) {
    $scope.posts = posts;
  } );
} )

.filter( 'get_post_thumbnail', [ 'config', function( config ) {
  return function ( post, size ) {
    if ( ! post ) {
      return;
    }
    if ( ! size ) {
      size = 'post-thumbnail';
    }
    var scheme = 'https://api.w.org/featuredmedia';
    if ( post._embedded && post._embedded[scheme] && post._embedded[scheme].length ) {
      if ( post._embedded[scheme][0].media_details.sizes[size] ) {
        return post._embedded[scheme][0].media_details.sizes[size].source_url;
      } else {
        return post._embedded[scheme][0].media_details.sizes['full'].source_url;
      }
    }
  };
} ] )

;
