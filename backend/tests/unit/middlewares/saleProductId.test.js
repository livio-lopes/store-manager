const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const saleProductId = require('../../../src/middlewares/saleProductId');
const productService = require('../../../src/services/products.service');
const productMocks = require('../mocks/productsMocks');

const { expect } = chai;
chai.use(sinonChai);
const BAD_REQUEST = 400;

const NOT_FOUND = 404;
const PRODUCTID_NOTFOUND = { message: '"productId" is required' };

const PRODUCT_NOTFOUND = { message: 'Product not found' };

describe('Test middleware saleProductId', function () {
  it('Test if function is called', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productMocks.getAllProducts);
    const req = { body: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleProductId(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Tests if it is not possible to register sale without productID', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productMocks.getAllProducts);
    const req = { body: [
      {
        quantity: 1,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleProductId(req, res, next);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST);
    expect(res.json).to.have.been.calledWith(PRODUCTID_NOTFOUND);
  });
  
  it('Test if it is not possible to register sale when productId not found', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productMocks.getAllProducts);
    const req = { body: [
      {
        productId: 0,
        quantity: 1,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleProductId(req, res, next);
    expect(res.status).to.have.been.calledWith(NOT_FOUND);
    expect(res.json).to.have.been.calledWith(PRODUCT_NOTFOUND);
  });
  it('Test if it is not possible to register sale when one productId not found', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productMocks.getAllProducts);
    const req = { body: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 0,
        quantity: 2,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleProductId(req, res, next);
    expect(res.status).to.have.been.calledWith(NOT_FOUND);
    expect(res.json).to.have.been.calledWith(PRODUCT_NOTFOUND);
  });
  afterEach(function () {
    sinon.restore();
  });
});