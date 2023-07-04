const chai = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/products.service');
const { getAllProducts } = require('../mocks/productsMocks');

const { expect } = chai;

describe('Testing Services Layer', function () {
  it('Testa getAllProducts camada service', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(getAllProducts);
    const resultService = await productsServices.getAllProducts();
    expect(resultService).to.be.equal(getAllProducts);
  });
  afterEach(function () {
    sinon.restore();
  });
});