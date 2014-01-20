var frisby = require('frisby');

frisby.create('Get list of emo map check-ins')
  .get('http://api.maidanpower.org/map/joy')
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json')
  .expectJSONTypes('*', {
    id: Number,
    heat: Number
  })
.toss();