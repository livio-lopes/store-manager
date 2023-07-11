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
  it('Test return setSaleDataTime', async function () {
    const insertId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const resultModel = await salesModel.setSaleDataTime();
    expect(resultModel).to.be.equal(insertId);
  });
  it('Test return setSalesProducts', async function () {
    const insertId = 4;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const newSale = { saleId: 3, productId: 1, quantity: 1 };
    const resultModel = await salesModel.deleteSalesProductsById(newSale);
    expect(resultModel).to.be.equal(insertId);
  });
  it('Test if sales with id=1 were deleted on table sales_products', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);
    const id = 1;
    const resultModel = await salesModel.deleteSalesProductsById(id);
    expect(resultModel).to.be.equal(2);
  });
  it('Test if sales with id=1 were deleted on table sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const id = 1;
    const resultModel = await salesModel.deleteSalesById(id);
    expect(resultModel).to.be.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});