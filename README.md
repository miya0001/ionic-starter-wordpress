# Create a Mobile Application using WordPress + WP-API + Ionic Framework

This is a starter template for the [Ionic Framework](http://ionicframework.com/).

You can create Mobile Application using WordPress + WP-API v2, Ionic Framework, AngularJS.

## How to use this template

*This template does not work on its own*. It is missing the Ionic library, and AngularJS.

To use this, either create a new ionic project using the ionic node.js utility, or copy and paste this into an existing Cordova project and download a release of Ionic separately.

### With the Ionic tool:

#### 1. Install Ionic

```bash
$ npm install -g ionic cordova
$ npm install ios-sim -g
```

#### 2. Install WordPress REST API (Version 2)

Please install [WordPress REST API (Version 2)](https://ja.wordpress.org/plugins/rest-api/) into your WordPress site.

#### 3. Start a project

```bash
$ ionic start myApp https://github.com/miya0001/ionic-starter-wordpress
$ ionic platform add ios
$ ionic platform add android
```

Open your `myApp/www/js/app.js` and change [here](https://github.com/miya0001/ionic-starter-wordpress/blob/master/js/app.js#L11) to your own URL like following.

```javascript
.constant( 'config', {
  api: 'http://example.com/wp-json/wp/v2' // API URL of your WordPress
} )
```

If you want to try quickly, you can skip here.

#### 4. Run it

Then, `cd` into `myApp` and run:

```bash
$ ionic emulate ios
```

Or

```bash
$ ionic serve
```

Substitute ios for android if not on a Mac, but if you can, the ios development toolchain is a lot easier to work with until you need to do anything custom to Android.

[See more information](http://ionicframework.com/).
