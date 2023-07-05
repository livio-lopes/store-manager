const chai = require('chai');
const sinon = require('sinon');
const salesMocks = require('../mocks/salesMocks');
const salesModel = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.service');

const { expect } = chai;

describe('Testing Sales on service layer', function () {
  it('Test return from getAllSales on service layer', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMocks.getAllSales);
    const resultService = await salesModel.getAllSales();
    expect(resultService).to.be.equal(salesMocks.getAllSales);
    expect(resultService).to.be.instanceOf(Array);
    expect(resultService).to.be.length(2);
  });
  it('Test return from getSalesById with id = 2', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesMocks.getAllSales[1]);
    const ID = 2;
    const resultService = await salesServices.getSalesById(ID);
    expect(resultService).to.be.equal(salesMocks.getAllSales[1]);
    expect(resultService).to.be.instanceOf(Object);
    expect(resultService).to.haveOwnProperty('id');
    expect(resultService).to.haveOwnProperty('date');
  });
  it('Test return from getSalesById with id = 0', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(undefined);
    const ID = 0;
    const resultService = await salesServices.getSalesById(ID);
    expect(resultService).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});