# Ionic starter template for WordPress + WP-API v2

This is an addon starter template for the [Ionic Framework](http://ionicframework.com/).

## How to use this template

*This template does not work on its own*. It is missing the Ionic library, and AngularJS.

To use this, either create a new ionic project using the ionic node.js utility, or copy and paste this into an existing Cordova project and download a release of Ionic separately.

### With the Ionic tool:

Take the name after `ionic-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

#### 1. Install Ionic

```bash
$ npm install -g ionic cordova
```

#### 2. Start a project

```bash
$ ionic start myApp https://github.com/miya0001/ionic-starter-wordpress
```

Open your `myApp/www/js/app.js` and edit [here](https://github.com/miya0001/ionic-starter-wordpress/blob/master/js/app.js#L11) like following.

```javascript
.constant( 'config', {
  api: 'http://example.com/wp-json/wp/v2'
} )
```

#### 3. Run it

Then, `cd` into `myApp` and run:

```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

Or

```bash
$ ionic serve
```

Substitute ios for android if not on a Mac, but if you can, the ios development toolchain is a lot easier to work with until you need to do anything custom to Android.

## Requires

* Ionic latest
* WordPress + WP-API v2
