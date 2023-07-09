const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const saleQuantity = require('../../../src/middlewares/saleQuantity');

const { expect } = chai;
chai.use(sinonChai);

const UNPROCESSABLE = 422;
const BAD_REQUEST = 400;
const QUANTITY_NOTFOUND = { message: '"quantity" is required' };
const UNPROCESSABLE_QUANTITY = { message: '"quantity" must be greater than or equal to 1' };

describe('Test middleware saleQuantity', function () {
  it('Test if function is called', async function () {
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
    await saleQuantity(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Test if it is not possible to register sale without quantity', async function () {
    const req = { body: [
      {
        productId: 1,
      },

    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST);
    expect(res.json).to.have.been.calledWith(QUANTITY_NOTFOUND);
  });
  it('Test if it is not possible to register sale quantity = 0', async function () {
    const req = { body: [
      {
        productId: 1,
        quantity: 0,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(UNPROCESSABLE);
    expect(res.json).to.have.been.calledWith(UNPROCESSABLE_QUANTITY);
  });  
  it('Test if it is not possible to register sale quantity < 0', async function () {
    const req = { body: [
      {
        productId: 1,
        quantity: -1,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await saleQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(UNPROCESSABLE);
    expect(res.json).to.have.been.calledWith(UNPROCESSABLE_QUANTITY);
  });
  afterEach(function () {
    sinon.restore();
  });
});