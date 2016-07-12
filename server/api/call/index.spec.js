'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var callCtrlStub = {
  index: 'callCtrl.index',
  show: 'callCtrl.show',
  create: 'callCtrl.create',
  update: 'callCtrl.update',
  destroy: 'callCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var callIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './call.controller': callCtrlStub
});

describe('Call API Router:', function() {

  it('should return an express router instance', function() {
    callIndex.should.equal(routerStub);
  });

  describe('GET /api/calls', function() {

    it('should route to call.controller.index', function() {
      routerStub.get
        .withArgs('/', 'callCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/calls/:id', function() {

    it('should route to call.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'callCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/calls', function() {

    it('should route to call.controller.create', function() {
      routerStub.post
        .withArgs('/', 'callCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/calls/:id', function() {

    it('should route to call.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'callCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/calls/:id', function() {

    it('should route to call.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'callCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/calls/:id', function() {

    it('should route to call.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'callCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
