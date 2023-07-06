const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesServices = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const salesMocks = require('../mocks/salesMocks');

const { expect } = chai;

const OK = 200;
const NOT_FOUND = 404;
const massageNotFound = { message: 'Sale not found' };

chai.use(sinonChai);

describe('Test Sales on controller layer', function () {
  it('Test return from getAllSales on controller layer', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'getAllSales').resolves(salesMocks.getAllSales);
    await salesController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(OK);
    expect(res.json).to.have.been.calledWith(salesMocks.getAllSales);
  });
  it('Test return from getSalesById with id = 1', async function () {
    const req = { params: { id: '1' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'getSalesById').resolves(salesMocks.getServiceSalesById1);
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(OK);
    expect(res.json).to.have.been.calledWith(salesMocks.getServiceSalesById1);
  });
   it('Test return from getSalesById with id = 0', async function () {
    const req = { params: { id: '0' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'getSalesById').resolves(undefined);
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND);
    expect(res.json).to.have.been.calledWith(massageNotFound);
  });
  afterEach(function () {
    sinon.restore();
  });
});