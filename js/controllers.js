angular.module( 'starter.controllers', [ 'ionic' ] )

.controller( 'frontpageCtrl', function( $scope, $stateParams, $config, WP_Query ) {
  var query = {
    'endpoint': 'pages',
    'filter[name]': $config.frontpage,
    '_embed': true
  };
  WP_Query.query( query ).$promise.then( function( posts ) {
    $scope.post = posts[0];
  } );
} )

.controller( 'postsCtrl', function( $scope, WP_Query ) {
  $scope.posts = [];
  $scope.offset = 0;
  $scope.per_page = 10;
  $scope.moreDataCanBeLoaded = true;

  var query = {
    'endpoint': 'posts',
    'per_page': 10,
    'offset': $scope.offset,
    'filter[orderby]': 'date',
    'filter[order]': 'DESC',
    '_embed': true
  }

  $scope.reload = function() {
    $scope.posts = [];
    $scope.offset = 0;
    $scope.load();
  }

  $scope.load = function() {
    query.offset = $scope.offset;
    WP_Query.query( query ).$promise.then( function( posts ) {
      if ( posts.length) {
        $scope.moreDataCanBeLoaded = true;
      } else {
        $scope.moreDataCanBeLoaded = false;
      }
      $scope.posts = $scope.posts.concat( posts );
      $scope.offset = $scope.offset + $scope.per_page;
      $scope.$broadcast( 'scroll.infiniteScrollComplete' );
      $scope.$broadcast('scroll.refreshComplete');
    } );
  };
} )

.controller( 'singleCtrl', function( $scope, $stateParams, WP_Query ) {
  var query = {
    'endpoint': 'posts',
    'id': $stateParams.id,
    '_embed': true
  };
  WP_Query.get( query ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'pageCtrl', function( $scope, $stateParams, WP_Query ) {
  var query = {
    'endpoint': 'pages',
    'id': $stateParams.id,
    '_embed': true
  };
  WP_Query.get( query ).$promise.then( function( post ) {
    $scope.post = post;
  } );
} )

.controller( 'galleryCtrl', function( $scope, WP_Query ) {
  $scope.posts = [];
  $scope.offset = 0;
  $scope.per_page = 10;
  $scope.moreDataCanBeLoaded = true;

  var query = {
    'endpoint': 'media',
    'per_page': 10,
    'offset': $scope.offset,
    'mime_type': 'image/jpeg',
    'filter[orderby]': 'date',
    'filter[order]': 'DESC',
    '_embed': true
  }

  $scope.reload = function() {
    $scope.posts = [];
    $scope.offset = 0;
    $scope.load();
  }

  $scope.load = function() {
    query.offset = $scope.offset;
    WP_Query.query( query ).$promise.then( function( posts ) {
      if ( posts.length) {
        $scope.moreDataCanBeLoaded = true;
      } else {
        $scope.moreDataCanBeLoaded = false;
      }
      $scope.posts = $scope.posts.concat( posts );
      $scope.offset = $scope.offset + $scope.per_page;
      $scope.$broadcast( 'scroll.infiniteScrollComplete' );
      $scope.$broadcast('scroll.refreshComplete');
    } );
  };
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

    console.log(size);

    if ( post.media_details.sizes[size] ) {
      return post.media_details.sizes[size].source_url;
    } else {
      return post.source_url;
    }
  };
} ] )

;
