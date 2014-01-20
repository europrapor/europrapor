var frisby = require('frisby');

frisby.create('Get list of maps')
  .get('http://api.maidanpower.org/maps')
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json')
  .expectJSONTypes('*', {
    map_id: String
  })
.toss();