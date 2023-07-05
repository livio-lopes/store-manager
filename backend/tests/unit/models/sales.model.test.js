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
    expect(resultModel).to.be.length(2);
  });
  it('Test return from getSalesById with id = 2', async function () {
    sinon.stub(connection, 'execute').resolves([[salesMocks.getAllSales[1]], []]);
    const ID = 2;
    const resultModel = await salesModel.getSalesById(ID);
    expect(resultModel).to.be.equal(salesMocks.getAllSales[1]);
    expect(resultModel).to.haveOwnProperty('id');
    expect(resultModel).to.haveOwnProperty('date');
  });
  it('Test return from getProductById with id = 0', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined], []]);
    const ID = 0;
    const resultModel = await salesModel.getSalesById(ID);
    expect(resultModel).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});