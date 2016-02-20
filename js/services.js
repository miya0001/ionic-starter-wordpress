angular.module( 'starter.services', [ 'ngResource' ] )

.config( function( $httpProvider ) {
  $httpProvider.interceptors.push( function( $q, $rootScope ) {
    return {
      request: function( config ) {
        $rootScope.$broadcast( 'loading:show' );
        return config;
      },
      response: function( response ) {
        $rootScope.$broadcast( 'loading:hide' );
        return response;
      },
      responseError: function( rejection ) {
        $rootScope.$broadcast( 'loading:hide' );
        if ( '404' == rejection.status ) {
          $rootScope.$broadcast( 'error:404' );
        } else if ( '' == rejection.status ) {
          $rootScope.$broadcast( 'error:apierror' );
        } else {
          $rootScope.$broadcast( 'error:50x' );
        }
        return $q.reject( rejection );
      }
    }
  } )
} )

.run( function( $rootScope, $ionicLoading, $ionicPopup ) {
  $rootScope.$on( 'loading:show', function() {
    $ionicLoading.show( { template: 'Loading...' } );
  } );

  $rootScope.$on( 'loading:hide', function() {
    $ionicLoading.hide();
  } );

  $rootScope.$on( 'error:404', function() {
    $ionicPopup.alert( {
      title: 'Error',
      template: 'Not found.'
    } );
  } );

  $rootScope.$on( 'error:apierror', function() {
    $ionicPopup.alert( {
      title: 'Error',
      template: 'The internet connection appears to be offline.'
    } );
  } );

  $rootScope.$on( 'error:50x', function() {
    $ionicPopup.alert( {
      title: 'Error',
      template: "Sorry, something went wrong. We're working on getting this fixed as soon as we can."
    } );
  } );
} )

.factory( 'WP_Query', [ '$resource', '$config', function( $resource, $config ) {
  var api = $config.api + "/:endpoint/:id";
  var params = {
    endpoint: '@endpoint',
    id: '@id'
  };
  var actions = {};
  return $resource( api, params, actions );
} ] )

;
