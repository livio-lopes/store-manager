const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsServices = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { getAllProducts } = require('../mocks/productsMocks');

const { expect } = chai;

const OK = 200;

chai.use(sinonChai);

describe('Testa camada controller', function () {
    it('Testa retorno da camada de controle', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsServices, 'getAllProducts').resolves(getAllProducts);
     await productsController.getAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(OK);
    
      expect(res.json).to.have.been.calledWith(getAllProducts);
    });
    afterEach(function () {
      sinon.restore();
    });
});