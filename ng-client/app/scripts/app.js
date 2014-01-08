'use strict';

angular.module('ngEuroPraporApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate'
])
  .config(function ($routeProvider, $translateProvider) {
    var availableLocales = {
          en: 'en',
          ru: 'ru',
          uk: 'uk'
        },
        nav, locale, prefferedLocale;

    // setup router
    $routeProvider
      .when('/', {
        templateUrl: 'views/checkin.html',
        controller: 'CheckinCtrl'
      })
      .when('/density-map', {
        templateUrl: 'views/density-map.html',
        controller: 'DensityMapCtrl'
      })
      .when('/layers-map', {
        templateUrl: 'views/layers-map.html',
        controller: 'LayersMapCtrl'
      })
      .when('/info', {
        templateUrl: 'views/info.html',
        controller: 'InfoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // setup localization
    $translateProvider
      .translations(availableLocales.en, {
        'BTN_CHECK-IN': 'Check-in',

        'TITLE_INFO': 'Info',
        'TITLE_CHECK-IN': 'Make check-in',
        'TITLE_DENSITY-MAP': 'Density map',
        'TITLE_EMO_MAP': 'Emotion map',

        'SLIDER_ANGER': 'anger',
        'SLIDER_JOY': 'joy',
        'SLIDER_DETERM': 'determination',
        'SLIDER_FEAR': 'fear',
        'SLIDER_PRIVACY': 'privacy'
      })
      .translations(availableLocales.ru, {
        'BTN_CHECK-IN': 'Чекин',

        'TITLE_INFO': 'Информация',
        'TITLE_CHECK-IN': 'Чекин',
        'TITLE_DENSITY-MAP': 'Карта плотности',
        'TITLE_EMO_MAP': 'Карта настроения',

        'SLIDER_ANGER': 'гнев',
        'SLIDER_JOY': 'радость',
        'SLIDER_DETERM': 'решительность',
        'SLIDER_FEAR': 'страх',
        'SLIDER_PRIVACY': 'приватность'
      })
      .translations(availableLocales.uk, {
        'BTN_CHECK-IN': 'Чекін',

        'TITLE_INFO': 'Інформація',
        'TITLE_CHECK-IN': 'Чекін',
        'TITLE_DENSITY-MAP': 'Карта густини',
        'TITLE_EMO_MAP': 'Карта настрію',

        'SLIDER_ANGER': 'гнів',
        'SLIDER_JOY': 'радість',
        'SLIDER_DETERM': 'рішучість',
        'SLIDER_FEAR': 'страх',
        'SLIDER_PRIVACY': 'конфіденційність'
      });

    /*
     * Dumb locale sniffing,
     * better use request-required Accept-Language header sniffing?
     */
    nav = window.navigator;
    locale = ((
      nav.language ||
      nav.browserLanguage ||
      nav.systemLanguage ||
      nav.userLanguage
    ) || '').split('-').join('_');

    for (var localeName in availableLocales) {
      var availableLocale = availableLocales[localeName];

      if (!!locale.match(availableLocale)) {
        prefferedLocale = availableLocale;

        $translateProvider.preferredLanguage(prefferedLocale);

        return;
      }
    }

  });
