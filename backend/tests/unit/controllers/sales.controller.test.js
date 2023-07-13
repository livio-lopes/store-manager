const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesServices = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const salesMocks = require('../mocks/salesMocks');

const { expect } = chai;

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const messageNotFound = { message: 'Sale not found' };
const messageProductNotFound = { message: 'Product not found in sale' };

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
    expect(res.json).to.have.been.calledWith(messageNotFound);
  });
  it('Test sales registred successfully', async function () {
    const req = { body: [{ productId: 1, quantity: 1 },
       { productId: 2, quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'registerSales').resolves(salesMocks.registerSalesController);
    await salesController.registerSales(req, res);
    expect(res.status).to.have.been.calledWith(CREATED);
    expect(res.json).to.have.been.calledWith(salesMocks.registerSalesController);
  });
  it('Test deleteSalesById case saleId not found', async function () {
    const req = { params: { id: '0' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'deleteSalesById').resolves(undefined);
    await salesController.deleteSalesById(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND);
    expect(res.json).to.have.been.calledWith(messageNotFound);
  });
  it('Test deleteSalesById case saleId is found', async function () {
    const req = { params: { id: '1' } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };
    sinon.stub(salesServices, 'deleteSalesById').resolves(2);
    await salesController.deleteSalesById(req, res);
    expect(res.status).to.have.been.calledWith(NO_CONTENT);
    expect(res.end).to.have.been.calledWith();
  });
  it('Test updateQuantity case saleId not found', async function () {
    const req = { params: { saleId: '0', productId: '1' }, body: { quantity: 20 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'updateQuantity').resolves('SALEID');
    await salesController.updateQuantity(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND);
    expect(res.json).to.have.been.calledWith(messageNotFound);
  });
  it('Test updateQuantity case productId not found', async function () {
    const req = { params: { saleId: '1', productId: '0' }, body: { quantity: 20 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesServices, 'updateQuantity').resolves('PRODUCTID');
    await salesController.updateQuantity(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND);
    expect(res.json).to.have.been.calledWith(messageProductNotFound);
  });
  it('Test updateQuantity case quantity is updated', async function () {
    const req = { params: { saleId: '1', productId: '1' }, body: { quantity: 20 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const mockService = { ...salesMocks.getAllSales[0], quantity: 20 };
    sinon.stub(salesServices, 'updateQuantity').resolves(mockService);
    await salesController.updateQuantity(req, res);
    expect(res.status).to.have.been.calledWith(OK);
  });
  afterEach(function () {
    sinon.restore();
  });
});