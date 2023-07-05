const chai = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/products.service');
const productsMocks = require('../mocks/productsMocks');

const { expect } = chai;

describe('Testing Services Layer', function () {
  it('Test return from getAllProducts on service layer', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMocks.getAllProducts);
    const resultService = await productsServices.getAllProducts();
    expect(resultService).to.be.equal(productsMocks.getAllProducts);
    expect(resultService).to.be.instanceOf(Array);
    expect(resultService).to.be.length(3);
  });
  it('Test return from getProductById with id = 3', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(productsMocks.getProductById3);
    const ID = 3;
    const resultService = await productsServices.getProductById(ID);
    expect(resultService).to.be.equal(productsMocks.getProductById3);
    expect(resultService).to.be.instanceOf(Object);
    expect(resultService).to.haveOwnProperty('id');
    expect(resultService).to.haveOwnProperty('name');
  });
  it('Test return from getProductById with id = 0', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const ID = 0;
    const resultService = await productsServices.getProductById(ID);
    expect(resultService).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});