// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module( 'starter', [ 'ionic', 'starter.controllers', 'starter.services' ] )

.constant( 'config', {
  api: 'http://api.wp-app.org/wp-json/wp/v2'
} )

.run( function( $ionicPlatform ) {
  $ionicPlatform.ready( function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if ( window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard ) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
      cordova.plugins.Keyboard.disableScroll( true );
    }
    if ( window.StatusBar ) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  } );
} )

.config( function( $stateProvider, $urlRouterProvider ) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state( 'app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  } )

  // Each tab has its own nav history stack:

  .state( 'app.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/posts.html',
        controller: 'postsCtrl'
      }
    }
  } )

  .state('app.single', {
    url: '/posts/:id',
    views: {
      'tab-home': {
        templateUrl: 'templates/single.html',
        controller: 'singleCtrl'
      }
    }
  })

  .state( 'app.pages', {
    url: '/pages',
    views: {
      'tab-pages': {
        templateUrl: 'templates/pages.html',
        controller: 'pagesCtrl'
      }
    }
  } )

  .state('app.page', {
    url: '/pages/:id',
    views: {
      'tab-pages': {
        templateUrl: 'templates/page.html',
        controller: 'pageCtrl'
      }
    }
  })

  .state( 'app.gallery', {
    url: '/gallery',
    views: {
      'tab-gallery': {
        templateUrl: 'templates/gallery.html',
        controller: 'galleryCtrl'
      }
    }
  } );

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise( '/app/home' );

} )

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

.controller('MainCtrl', function($http, $ionicLoading) {
  var _this = this

  $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function(result) {
    _this.breweries = result.data.breweries
  })
})

;
