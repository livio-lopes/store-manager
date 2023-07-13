const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const productsMocks = require('../unit/mocks/productsMocks');
const connection = require('../../src/models/connection');
const app = require('../../src/app');
const { statusCode } = require('../../src/utils/statusUtils');

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

describe('Test GET /products', function () {
  it('Test endpoint /products if returns list with all products', async function () {
    sinon.stub(connection, 'execute').resolves([productsMocks.getAllProducts]);
    const response = await chai.request(app).get('/products');
    expect(response).to.have.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(productsMocks.getAllProducts);
  });
  it('Test endpoint /products/search if returns list products with name includes', async function () {
    sinon.stub(connection, 'execute').resolves([productsMocks.getAllProducts]);
    const response = await chai.request(app).get('/products/search?q=Thor');
    expect(response).to.have.status(statusCode.OK);
    expect(response.body).to.be.deep.equal([productsMocks.getAllProducts[0]]);
  });
  it('Test endpoint /products/:id if return product correct', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMocks.getAllProducts[0]]]);
    const response = await chai.request(app).get('/products/1');
    expect(response).to.be.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(productsMocks.getAllProducts[0]);
  });
  afterEach(function () {
    sinon.restore();
  });
}); 