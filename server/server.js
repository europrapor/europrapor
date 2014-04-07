var mongodb = require('mongojs'),
    restify = require('restify');


var server = restify.createServer({name: 'europrapor'});
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var checkins = mongodb.connect(server.name).collection('checkins'),
    maps = ['anger', 'determination', 'fear', 'joy'];


// Fix for https://github.com/mcavage/node-restify/issues/296.
function corsHandler(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://app.maidanpower.org');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Cache-Control, X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
  res.setHeader('Access-Control-Max-Age', '1000');
  return next();
}

function optionsRoute(req, res, next) {
  res.send(200);
  return next();
}


server.opts('/\.*/', corsHandler, optionsRoute);
server.post('/check-in', checkin);
server.get('/maps', getAvailableMaps);
server.get('/map', getCheckins);


function checkin(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  checkins.insert(req.params, function(err, _) {
    if (err) {
      console.log("Error: %s", err);
      return next(err);
    }
    res.send(201);
    return next();
  });
}

function getAvailableMaps(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  available_maps = []
  maps.forEach(function(map) {
    available_maps.push({map_id: map});
  });
  res.send(available_maps);
  return next();
}

function getCheckins(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  checkins.find({}, {"position": 1}, function(err, docs) {
    if (err) {
      console.log("Error: %s", err);
      return next(err);
    }
    res.send(docs);
    return next();
  });
}


server.listen(8000, '127.0.0.1', function() {
  console.log("%s listening on %s", server.name, server.url);
});
