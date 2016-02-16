angular.module( 'starter.services', [ 'ngResource' ] )

.factory( 'WP', [ '$resource', '$ionicLoading', '$ionicPopup', 'config', function( $resource, $ionicLoading, $ionicPopup, config ) {
  $ionicLoading.show( { template: 'Loading...' } );
  var api = config.api + "/:post_type/:id";
  var params = { id: '@id', post_type: '@post_type' , _embed: 1 };
  var actions = {
    query: {
      isArray: true,
      method: 'GET',
      interceptor: {
        response: function( res ) {
          $ionicLoading.hide();
          return res.data;
        },
        responseError: function( res ) {
          $ionicLoading.hide();
          $ionicPopup.alert( {
            title: 'Error',
            template: 'The internet connection appears to be offline.'
          } );
          return [];
        }
      }
    },
    get: {
      isArray: false,
      method: 'GET',
      interceptor: {
        response: function( res ) {
          $ionicLoading.hide();
          return res.data;
        },
        responseError: function( res ) {
          $ionicLoading.hide();
          $ionicPopup.alert( {
            title: 'Error',
            template: 'The internet connection appears to be offline.'
          } );
          return [];
        }
      }
    }
  };
  return $resource( api, params, actions );
} ] )

;
