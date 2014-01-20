var frisby = require('frisby');

frisby.create('Perform a check-in')
  .post('http://api.maidanpower.org/check-in', {
    position: {
      lt: 35.45645,
      lg: 67.98798
    },
    mental_state: {
      joy: 2,
      determination: 3,
      anger: 1,
      fear: 0
    },
    privacy: 0
  }, {json: true})
  .expectStatus(200)
.toss();