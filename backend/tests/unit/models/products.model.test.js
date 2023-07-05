const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const productsMocks = require('../mocks/productsMocks');

const { expect } = chai;

describe('Testing Model Layer', function () {
  it('Tests return from getAllProducts in model layer', async function () {
    sinon.stub(connection, 'execute').resolves([productsMocks.getAllProducts, []]);
    const resultModel = await productsModel.getAllProducts();
    expect(resultModel).to.be.equal(productsMocks.getAllProducts);
    expect(resultModel).to.be.instanceOf(Array);
    expect(resultModel).to.be.length(3);
  });
  it('Test return from getProductById with id = 3', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMocks.getProductById3], []]);
    const ID = 3;
    const resultModel = await productsModel.getProductById(ID);
    expect(resultModel).to.be.equal(productsMocks.getProductById3);
    expect(resultModel).to.haveOwnProperty('id');
    expect(resultModel).to.haveOwnProperty('name');
  });
  it('Test return from getProductById with id = 0', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined], []]);
    const ID = 0;
    const resultModel = await productsModel.getProductById(ID);
    expect(resultModel).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});