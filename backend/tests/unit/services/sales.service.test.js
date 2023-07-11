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
    expect(resultService[0]).to.haveOwnProperty('saleId');
    expect(resultService[0]).to.haveOwnProperty('date');
    expect(resultService[0]).to.haveOwnProperty('productId');
    expect(resultService[0]).to.haveOwnProperty('quantity');
  });
  it('Test return from getSalesById with id = 1', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesMocks.getServiceSalesById1);
    const ID = 1;
    const resultService = await salesServices.getSalesById(ID);
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
  it('Test return registerSales', async function () {
    const insertIdSaleDataTime = 3;
    sinon.stub(salesModel, 'setSaleDataTime').resolves(insertIdSaleDataTime);
    sinon.stub(salesModel, 'setSalesProducts').resolves();
    const sales = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const resultService = await salesServices.registerSales(sales);
    expect(resultService).to.be.haveOwnProperty('id');
    expect(resultService).to.be.haveOwnProperty('itemsSold');
    expect(resultService.id).to.be.equal(3);
    expect(resultService.itemsSold).to.be.instanceOf(Array);
    expect(resultService.itemsSold).to.be.length(2);
    expect(resultService.itemsSold[0]).to.be.haveOwnProperty('productId');
    expect(resultService.itemsSold[0]).to.be.haveOwnProperty('quantity');
  });
  it('Test deleteSalesById if not delete sale not found', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);
    const id = 0;
    const resultService = await salesServices.deleteSalesById(id);
    expect(resultService).to.be.equal(undefined);
  });
  it('Test deleteSalesById if sales are successfully deleted', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesMocks.getModelSalesById1);
    sinon.stub(salesModel, 'deleteSalesProductsById').resolves(2);
    sinon.stub(salesModel, 'deleteSalesById').resolves(1);
    const id = 1;
    const resultService = await salesServices.deleteSalesById(id);
    expect(resultService.salesProductsTables).to.be.equal(2);
    expect(resultService.salesTables).to.be.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});