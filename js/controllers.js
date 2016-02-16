angular.module( 'starter.controllers', [ 'ionic' ] )

.controller( 'postsCtrl', function( $scope, $state, WP ) {
  var query = {
    post_type: 'posts'
  }
  WP.query( query ).$promise.then( function( posts ) {
    $scope.posts = posts;
  } );

  $scope.reload = function() {
    WP.query( query ).$promise.then( function( posts ) {
      $scope.posts = posts;
      $scope.$broadcast('scroll.refreshComplete');
    } );
  };
} )

.controller( 'singleCtrl', function( $scope, $stateParams, WP ) {
  var query = {
    post_type: 'posts',
    id: $stateParams.id
  };
  WP.get( query ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'pagesCtrl', function( $scope, WP ) {
  var query = {
    post_type: 'pages',
    per_page: 10,
    orderby: 'menu_order',
    order: 'asc',
    parent: 0
  }
  WP.query( query ).$promise.then( function( posts ) {
    $scope.posts = posts;
  } );
} )

.controller( 'pageCtrl', function( $scope, $stateParams, WP ) {
  WP.get( { post_type: 'pages', id: $stateParams.id } ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'galleryCtrl', function( $scope, WP ) {
  var query = {
    post_type: 'media',
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
      }
    }
  };
} ] )

;
