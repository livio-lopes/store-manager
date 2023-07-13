const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const updateQuantity = require('../../../src/middlewares/updateQuantity');

const { expect } = chai;
chai.use(sinonChai);

const BAD_REQUEST = 400;
const UNPROCESSABLE = 422;
const quantityRequired = { message: '"quantity" is required' };
const quantityInvalid = { message: '"quantity" must be greater than or equal to 1' };

describe('Test middleware updateQuantity', function () {
  it('Test if function next is called', async function () {
    const req = { params: { saleId: '1', productId: '1' }, body: { quantity: 20 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await updateQuantity(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Test case quantity not found', async function () {
    const req = { params: { saleId: '1', productId: '1' }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await updateQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST);
    expect(res.json).to.have.been.calledWith(quantityRequired);
  });
  it('Test case quantity invalid', async function () {
    const req = { params: { saleId: '1', productId: '1' }, body: { quantity: 0 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await updateQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(UNPROCESSABLE);
    expect(res.json).to.have.been.calledWith(quantityInvalid);
  });
});