const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesMocks = require('../mocks/salesMocks');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('Testing Sales on model layer', function () {
  it('Test return from getAllSales on model layer', async function () {
    sinon.stub(connection, 'execute').resolves([salesMocks.getAllSales, []]);
    const resultModel = await salesModel.getAllSales();
    expect(resultModel).to.be.equal(salesMocks.getAllSales);
    expect(resultModel).to.be.instanceOf(Array);
    expect(resultModel).to.be.length(3);
  });
  it('Test return from getSalesById with id = 1', async function () {
    sinon.stub(connection, 'execute').resolves([salesMocks.getModelSalesById1]);
    const ID = '1';
    const resultModel = await salesModel.getSalesById(ID);
    expect(resultModel).to.be.equal(salesMocks.getModelSalesById1);
    expect(resultModel).to.be.instanceOf(Array);
    expect(resultModel).to.be.length(2);
    expect(resultModel[0]).to.haveOwnProperty('saleId');
    expect(resultModel[0]).to.haveOwnProperty('productId');
    expect(resultModel[0]).to.haveOwnProperty('date');
    expect(resultModel[0]).to.haveOwnProperty('quantity');
  });
  it('Test return from getSalesById with id = 0', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const ID = 0;
    const resultModel = await salesModel.getSalesById(ID);
    expect(resultModel).to.be.length(0);
  });
  afterEach(function () {
    sinon.restore();
  });
});