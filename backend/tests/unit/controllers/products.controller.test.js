const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsServices = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const productsMocks = require('../mocks/productsMocks');

const { expect } = chai;

const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;
const NO_CONTENT = 204;
const massageNotFound = { message: 'Product not found' };

chai.use(sinonChai);

describe('Test Products on Controller Layer', function () {
    it('Test return from getAllProducts on controller layer', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'getAllProducts').resolves(productsMocks.getAllProducts);
      await productsController.getAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(OK);
      expect(res.json).to.have.been.calledWith(productsMocks.getAllProducts);
    });
    it('Test return from getProductById with id = 3', async function () {
      const req = { params: { id: '3' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'getProductById').resolves(productsMocks.getProductById3);
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(OK);
      expect(res.json).to.have.been.calledWith(productsMocks.getProductById3);
    });
     it('Test return from getProductById with id = 0', async function () {
      const req = { params: { id: '0' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'getProductById').resolves(undefined);
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND);
      expect(res.json).to.have.been.calledWith(massageNotFound);
    });
    it('Test product successfully added ', async function () {
      const req = { body: { name: 'Sandalha' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const mockNewProduct = { id: 4, name: 'Sandalha' };
      sinon.stub(productsServices, 'addProduct').resolves({ ...mockNewProduct });
      await productsController.addProduct(req, res);
      expect(res.status).to.have.been.calledWith(CREATED);
      expect(res.json).to.have.been.calledWith(mockNewProduct);
    });
    it('Test updateProductById case product not found', async function () {
      const req = { body: { name: 'Sandalha' },
                    params: { id: '0' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'updateProductById').resolves(undefined);
      await productsController.updateProductById(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND);
      expect(res.json).to.have.been.calledWith(massageNotFound);
    });
    it('Test updateProductById case product is updated', async function () {
      const req = { body: { name: 'Sandalha' },
                    params: { id: '1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const mockUpdatedProduct = {
        id: 1,
        name: 'Sandalha',
      };
      sinon.stub(productsServices, 'updateProductById').resolves(mockUpdatedProduct);
      await productsController.updateProductById(req, res);
      expect(res.status).to.have.been.calledWith(OK);
      expect(res.json).to.have.been.calledWith(mockUpdatedProduct);
    });
    it('Test deleteProductById case product not found', async function () {
      const req = { params: { id: '0' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'deleteProductById').resolves(undefined);
      await productsController.deleteProductById(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND);
      expect(res.json).to.have.been.calledWith(massageNotFound);
    });
    it('Test deleteProductById case product is deleted', async function () {
      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub(),
      };
      sinon.stub(productsServices, 'deleteProductById').resolves(1);
      await productsController.deleteProductById(req, res);
      expect(res.status).to.have.been.calledWith(NO_CONTENT);
      expect(res.end).to.have.been.calledWith();
    });
    it('Test getProductsByName case q=Thor', async function () {
      const req = { query: { q: 'Thor' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'searchProductByName').resolves([productsMocks.getAllProducts[0]]);
      await productsController.getProductsByName(req, res);
      expect(res.status).to.have.been.calledWith(OK);
      expect(res.json).to.have.been.calledWith([productsMocks.getAllProducts[0]]);
    });
    afterEach(function () {
      sinon.restore();
    });
});