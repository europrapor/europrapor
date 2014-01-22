var frisby = require('frisby');

frisby.create('Get list of check-ins')
  .get('http://api.maidanpower.org/map')
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json')
  .expectJSONTypes('*', {
    id: Number,
    position: {
      lt: Number,
      lg: Number
    }
  })
.toss();