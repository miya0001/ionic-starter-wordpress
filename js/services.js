angular.module( 'starter.services', [ 'ngResource' ] )

.config( function( $httpProvider ) {
  $httpProvider.interceptors.push( function( $q, $rootScope ) {
    return {
      request: function( config ) {
        $rootScope.$broadcast( 'loading:show' )
        return config
      },
      response: function( response ) {
        $rootScope.$broadcast( 'loading:hide' )
        return response
      },
      responseError: function( rejection ) {
        $rootScope.$broadcast( 'error:show' )
        return $q.reject( rejection );
      }
    }
  } )
} )

.run( function( $rootScope, $ionicLoading, $ionicPopup ) {
  $rootScope.$on( 'loading:show', function() {
    $ionicLoading.show( { template: 'Loading...' } )
  } )

  $rootScope.$on( 'loading:hide', function() {
    $ionicLoading.hide()
  } )

  $rootScope.$on( 'error:show', function() {
    $ionicPopup.alert( {
      title: 'Error',
      template: 'The internet connection appears to be offline.'
    } );
  } )
} )

.factory( 'WP', [ '$resource', 'config', function( $resource, config ) {
  var api = config.api + "/:endpoint/:id";
  var params = {
    endpoint: '@endpoint',
    id: '@id'
  };
  var actions = {};
  return $resource( api, params, actions );
} ] )

;
