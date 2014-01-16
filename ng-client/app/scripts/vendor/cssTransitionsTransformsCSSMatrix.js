/* global Modernizr, yepnope */

yepnope([
  {
    test: 'WebKitCSSMatrix' in window,
    nope: 'scripts/vendor/CSSMatrix.js'
  }
]);

var cssTransitionNames = {
  'WebkitTransition' : 'webkitTransition',
  'MozTransition'    : 'transition',
  'OTransition'      : 'oTransition',
  'msTransition'     : 'MSTransition',
  'transition'       : 'transition'
},
cssTransformNames = {
  'WebkitTransform' : 'webkitTransform',
  'MozTransform'    : 'transform',
  'OTransform'      : 'oTransform',
  'msTransform'     : 'MSTransform',
  'transform'       : 'transform'
},
cssTransformPrefixNames = {
  'WebkitTransform' : '-webkit-',
  'MozTransform'    : '-moz-',
  'OTransform'      : '-o-',
  'msTransform'     : '-ms-',
  'transform'       : ''
},
cssTransitionName = cssTransitionNames[Modernizr.prefixed('transition')],
cssTransformName = cssTransformNames[Modernizr.prefixed('transform')],
cssTransformPrefixName = cssTransformPrefixNames[Modernizr.prefixed('transform')];
