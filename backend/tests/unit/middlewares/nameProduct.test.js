const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const nameProduct = require('../../../src/middlewares/nameProduct');

const { expect } = chai;

const BAD_REQUEST = 400;
const UNPROCESSABLE = 422;
const BAD_REQUEST_NAME_NOTFOUND = { message: '"name" is required' };
const BAD_REQUEST_NAME_INVALID = { message: '"name" length must be at least 5 characters long' };

chai.use(sinonChai);

describe('Test middleware nameProduct', function () {
  it('Test if next function is called', async function () {
    const req = { body: { name: 'Sandalha' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await nameProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Test return case name is undefined', async function () {
    const req = { body: { name: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await nameProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST);
    expect(res.json).to.have.been.calledWith(BAD_REQUEST_NAME_NOTFOUND);
  });
  it('Test return case name has length < 5', async function () {
    const req = { body: { name: 'Bota' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await nameProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(UNPROCESSABLE);
    expect(res.json).to.have.been.calledWith(BAD_REQUEST_NAME_INVALID);
  });
  afterEach(function () {
    sinon.restore();
  });
});
