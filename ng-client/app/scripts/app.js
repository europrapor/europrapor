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
        'SLIDER_PRIVACY': 'privacy',

        'INFO': '<h2>MaidanPower</h2><p><strong>MaidanPower</strong> is a web app where people share feedback about the area they are in, and their feelings and emotions in current place and time. We have one layer to confirm the questionable size of a crowd, but also it lets the people contribute to the euromaidan movement even if they have to work or need to stay home. Another layer represents the feelings and emotions of the people, and also allows people to organize themselves, and to provide a targeted support.</p><h3>How to use?</h3><p>On the main screen there’s a list of range sliders where you can set your current emotional status, desired privacy level and perform check-in in order to share your location and emotions with a crowd.</p><h4>Emotions</h4><p>Sharing your emotions helps to determine current status of average people mood in particular area. It means that everyone can find out potentially dangerous area or the one in need of your help and support. Thus this data helps people to be organized and informed instantly.</p><h4>Privacy</h4><p><strong>This kind of information can be used in both good and bad intentions. We don’t want to let anybody to be able to use this data in such despicable way. Firstly think twice before sharing your location and then use privacy to make sure you are safe.</strong></p><p><strong>The level of privacy represents whether your location will be displayed on the map or not. It depends on a number of already checked-in people in your area. The lowest level possibly means that eneryone will know your current location, it will be available even if no one has checked-in around you. Do not check-in with 0 privacy unless you sure that you are completely safe!</strong></p><h3>Maps</h3><p>We have two maps to visualize the data: Density and Emotion map. The first one is a heat map that represents a size of the crowd across different areas. The second map includes number of layers where each layer belongs to one of the available emotions. You can switch between layers to see a map of interested emotional status around the world.</p>'
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
        'SLIDER_PRIVACY': 'приватность',

        'INFO': '<h2>MaidanPower</h2><p><strong>MaidanPower</strong> — это веб-приложение, с помощью которого пользователи могут делиться информацией о своем местонахождении, а также о своих субъективных чувствах и эмоциях в определенный момент времени. Один слой интерактивной карты дает возможность определить реальное количество участников движения, а также принять участие в нем тем, кто не может присутствовать физически; второй отображает эмоциональное состояние участников, что повысит эффективность самоорганизации и даст возможность предоставлять целевую помощь в необходимых локациях.</p><h3>Как пользоваться?</h3><p>На главном экране размещено несколько ползунков, с их помощью вы можете определить ваш эмоциональный статус, желаемый уровень приватности, а также выполнить чекин, чтобы о вашем местонахождении и настроении узнали другие пользователи.</p><h4>Настроение</h4><p>Информация о вашем настроении поможет другим участникам узнать об общей эмоциональной картине в той или иной локации. Таким образом можно наглядно увидеть потенциально опасные зоны, в которых участники движения нуждаются в вашей помощи и поддержке. Эта информация посодействует эффективной самоорганизации.</p><h4>Приватность</h4><p><strong>Эта информация может быть использована как во благо, так и во зло. Мы не хотим, чтобы этим воспользовались злоумышленники, поэтому мы просим вас проявлять рассудительность, предоставляя информацию о вашем местонахождении.</strong></p><p><strong>Уровень приватности дает возможность заранее указать, будет ли отображено на карте ваше местонахождение. Все зависит от количества уже зарегистрированных людей в вашей локации. Самый низкий уровень приватности означает, что информация о вашем местонахождении будет отображена независимо от количества выполнивших чекин поблизости участников. Не указывайте самый низкий уровень приватности, если вы не уверенны в своей безопасности!</strong></p><h3>Карты</h3><p>Информация будет выводиться на две карты — карту плотности и карту настроения. Первая — это теплокарта, отображающая плотность толпы в определенном месте. Вторая карта имеет несколько слоев, каждый из которых представляет отдельную эмоцию. Вы можете переключаться между слоями, просматривая данные о интересующей вас эмоции в любой точке мира.</p>'
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
        'SLIDER_PRIVACY': 'конфіденційність',

        'INFO': '<h2>MaidanPower</h2><p><strong>MaidanPower</strong> — це веб-аплікація, яка дає змогу користувачам ділитися інформацією про своє місцезнаходження, а також про свої суб’єктивні почуття і емоції в певний момент часу. Один шар інтерактивної мапи допомагає визначити реальну кількість учасників руху, а також заявити про свою небайдужість тим, хто не може бути присутній на майдані фізично; інший шар представляє емоційний стан учасників з метою ефективної самоорганізації, а також надання цільової допомоги.</p><h3>Як користуватися аплікацією?</h3><p>На головному екрані розміщено кілька шкал, які дають змогу визначити ваш емоційний статус, бажаний рівень конфіденційності і зробити чекін, щоб про ваше місцезнаходження і емоції дізналися інші користувачі.</p><h4>Настрій</h4><p>Ділячись своїми емоціями ви допомогаєте іншим скласти уявлення про загальний настрій, що превалює в тій чи іншій зоні. Таким чином можна наглядно побачити потенційно небезпечні місця, де інші люди можуть потребувати вашої допомоги і підтримки. Ця інформація посприяє ефективній самоорганізації.</p><h4>Конфіденційність</h4><p><strong>Цю інформацію може бути використано як на користь, так і на шкоду. Ми не бажаємо давати змогу зловмисникам скористуватися з цього. Тому ми просимо вас виявити розсудливість, перш ніж ділитися інформацією про своє місцезнаходження.</strong></p><p><strong>Рівень конфіденційності дає змогу заздалегідь зазначити, чи буде вказано на мапі ваше місцезнаходження. Усе залежить від кількості людей, які вже зареєструвалися в цій зоні. Найнижчий рівень конфіденційності означає, що про ваше місцезнаходження знатимуть усі незалежно від того, чи хтось уже зачекінився неподалік. Не вказуйте найнижчий рівень приватності, якщо ви не впевнені, що це абсолютно безпечно!</strong></p><h3>Мапи</h3><p>Інформація відображається на двох мапах — щільності та настрою. Перша з них — це теплокарта, що відображає щільність натовпу в певній зоні. Інші мапа включає кілька шарів, кожен із яких представляє певну емоцію. Ви можете переключатися між цими шарами, обираючи емоції, які вас цікавлять, у будь-якій точці світу.</p>'
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

        $translateProvider.preferredLanguage('uk');

        return;
      }
    }

  });
