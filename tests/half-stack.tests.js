const app = require('../lib/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

describe('mongo tests', () => {
  const req = chai.request(app);

  // it('url is GET /resource', done => {}), it('url is POST /resource', done => {}), it('url is GET /resource/:id', done => {}), it('url is DELETE /<resource>/:id', done => {
  //   // return { removed: true } or { removed: false }
  // }), it('url is PUT /<resource>/:id', done => {});
});
