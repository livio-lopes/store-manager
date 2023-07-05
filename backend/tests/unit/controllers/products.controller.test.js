const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsServices = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const productsMocks = require('../mocks/productsMocks');

const { expect } = chai;

const OK = 200;
const NOT_FOUND = 404;

const massgeNotFound = { message: 'Product not found' };

chai.use(sinonChai);

describe('Test Controller Layer', function () {
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
      expect(res.json).to.have.been.calledWith(massgeNotFound);
    });
    afterEach(function () {
      sinon.restore();
    });
});