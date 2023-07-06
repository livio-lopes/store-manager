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
    expect(resultService).to.be.length(3);
  });
  it('Test return from getSalesById with id = 1', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesMocks.getServiceSalesById1);
    const ID = 1;
    const resultService = await salesServices.getSalesById(ID);
    console.log('service', resultService);
    expect(resultService).to.be.deep.equal(salesMocks.getServiceSalesById1);
    expect(resultService).to.be.instanceOf(Array);
    expect(resultService).to.be.length(2);
    expect(resultService[0]).not.have.property('saleId');
    expect(resultService[0]).to.haveOwnProperty('productId');
    expect(resultService[0]).to.haveOwnProperty('date');
    expect(resultService[0]).to.haveOwnProperty('quantity');
  });
  it('Test return from getSalesById with id = 0', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);
    const ID = 0;
    const resultService = await salesServices.getSalesById(ID);
    expect(resultService).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});