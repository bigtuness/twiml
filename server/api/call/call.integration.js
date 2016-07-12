'use strict';

var app = require('../..');
import request from 'supertest';

var newCall;

describe('Call API:', function() {

  describe('GET /api/calls', function() {
    var calls;

    beforeEach(function(done) {
      request(app)
        .get('/api/calls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          calls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      calls.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/calls', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/calls')
        .send({
          name: 'New Call',
          info: 'This is the brand new call!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCall = res.body;
          done();
        });
    });

    it('should respond with the newly created call', function() {
      newCall.name.should.equal('New Call');
      newCall.info.should.equal('This is the brand new call!!!');
    });

  });

  describe('GET /api/calls/:id', function() {
    var call;

    beforeEach(function(done) {
      request(app)
        .get('/api/calls/' + newCall._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          call = res.body;
          done();
        });
    });

    afterEach(function() {
      call = {};
    });

    it('should respond with the requested call', function() {
      call.name.should.equal('New Call');
      call.info.should.equal('This is the brand new call!!!');
    });

  });

  describe('PUT /api/calls/:id', function() {
    var updatedCall;

    beforeEach(function(done) {
      request(app)
        .put('/api/calls/' + newCall._id)
        .send({
          name: 'Updated Call',
          info: 'This is the updated call!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCall = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCall = {};
    });

    it('should respond with the updated call', function() {
      updatedCall.name.should.equal('Updated Call');
      updatedCall.info.should.equal('This is the updated call!!!');
    });

  });

  describe('DELETE /api/calls/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/calls/' + newCall._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when call does not exist', function(done) {
      request(app)
        .delete('/api/calls/' + newCall._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
