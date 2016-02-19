angular.module( 'starter.controllers', [ 'ionic' ] )

.controller( 'postsCtrl', function( $scope, WP ) {
  var query = {
    'endpoint': 'posts',
    'per_page': 10,
    '_embed': true
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

.controller( 'frontpageCtrl', function( $scope, $stateParams, $config, WP ) {
  var query = {
    'endpoint': 'pages',
    'filter[name]': $config.frontpage,
    '_embed': true
  };
  WP.query( query ).$promise.then( function( posts ) {
    $scope.post = posts[0];
  } );
} )

.controller( 'singleCtrl', function( $scope, $stateParams, WP ) {
  var query = {
    'endpoint': 'posts',
    'id': $stateParams.id,
    '_embed': true
  };
  WP.get( query ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'pageCtrl', function( $scope, $stateParams, WP ) {
  var query = {
    'endpoint': 'pages',
    'id': $stateParams.id,
    '_embed': true
  };
  WP.get( query ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'galleryCtrl', function( $scope, WP ) {
  var query = {
    'endpoint': 'media',
    'per_page': 10,
    'mime_type': 'image/jpeg',
    'filter[orderby]': 'date',
    'filter[order]': 'DESC'
  }
  WP.query( query ).$promise.then( function( posts ) {
    $scope.posts = posts;
  } );
} )

.filter( 'get_post_thumbnail', [ '$config', function( $config ) {
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

.filter( 'get_image_src', [ '$config', function( $config ) {
  return function ( post, size ) {
    if ( ! post ) {
      return;
    }
    if ( ! size ) {
      size = 'thumbnail';
    }

    if ( post.media_details.sizes[size] ) {
      return post.media_details.sizes[size].source_url;
    } else {
      return post.source_url;
    }
  };
} ] )

;
