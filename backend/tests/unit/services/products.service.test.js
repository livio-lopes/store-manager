const chai = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/products.service');
const productsMocks = require('../mocks/productsMocks');

const { expect } = chai;

describe('Testing Products on Services Layer', function () {
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
  it('Test return addProduct', async function () {
    const insertId = 4;
    sinon.stub(productsModel, 'addProduct').resolves(insertId);
    const nameProduct = 'Sandalha';
    const newProduct = { id: insertId, name: nameProduct };
    const resultService = await productsServices.addProduct(nameProduct);
    expect(resultService).to.be.deep.equal(newProduct);
    expect(resultService).to.haveOwnProperty('id');
    expect(resultService).to.haveOwnProperty('name');
  });
  it('Test updateProductById if product not found', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    sinon.stub(productsModel, 'updateProductById').resolves();
    const id = 0;
    const name = 'Sandalha';
    const resultService = await productsServices.updateProductById(id, name);
    expect(resultService).to.be.equal(undefined);
  });
  it('Test updateProductById if product is updated', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(productsMocks.getProductById3);
    sinon.stub(productsModel, 'updateProductById').resolves();
    const id = '3';
    const name = 'Sandalha';
    const resultService = await productsServices.updateProductById(id, name);
    expect(resultService).to.be.deep.equal({ id: Number(id), name });
  });
  it('Test deleteProductById if not delete product not found', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const id = 0;
    const resultService = await productsServices.deleteProductById(id);
    expect(resultService).to.be.equal(undefined);
  });
  it('Test deleteProductById if product is deleted', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(productsMocks.getProductById3);
    sinon.stub(productsModel, 'deleteProductById').resolves(1);
    const id = 3;
    const resultService = await productsServices.deleteProductById(id);
    expect(resultService).to.be.equal(1);
  });
  it('Test searchProductByName case query is undefined', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMocks.getAllProducts);
    const resultService = await productsServices.searchProductByName();
    expect(resultService).to.be.deep.equal(productsMocks.getAllProducts);
  });
  it('Test searchProductByName case name not include', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMocks.getAllProducts);
    const q = 'Não incluso';
    const resultService = await productsServices.searchProductByName(q);
    expect(resultService).to.be.deep.equal([]);
  });
  it('Test searchProductByName case name Thor is include', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMocks.getAllProducts);
    const q = 'Thor';
    const resultService = await productsServices.searchProductByName(q);
    expect(resultService).to.be.deep.equal([productsMocks.getAllProducts[0]]);
  });
  afterEach(function () {
    sinon.restore();
  });
});