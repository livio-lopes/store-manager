const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { getAllProducts } = require('../mocks/productsMocks');

const { expect } = chai;

describe('Testing Model Layer', function () {
  it('Testa se retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([getAllProducts, []]);
    const resultModel = await productsModel.getAllProducts();
    expect(resultModel).to.be.equal(getAllProducts);
  });
  afterEach(function () {
    sinon.restore();
  });
});