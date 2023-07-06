const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const productsMocks = require('../mocks/productsMocks');

const { expect } = chai;

describe('Testing Products on Model Layer', function () {
  it('Test return from getAllProducts on model layer', async function () {
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
  it('Test if new product was registered in the database', async function () {
    sinon.stub(connection, 'execute').resolves([productsMocks.infoConectAddProduct]);
    const productName = 'Sandalha';
    const ID = 4;
    const insertId = await productsModel.addProduct(productName);
    expect(insertId).to.be.equal(ID);
  });
  afterEach(function () {
    sinon.restore();
  });
});