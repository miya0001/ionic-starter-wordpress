angular.module( 'starter.services', [ 'ngResource' ] )

.factory( 'WP', [ '$resource', 'config', function( $resource, config ) {
  var api = config.api + "/:post_type/:id";
  var params = { id: '@id', post_type: '@post_type' , _embed: 1 };
  var actions = {};
  return $resource( api, params, actions );
} ] )

;
