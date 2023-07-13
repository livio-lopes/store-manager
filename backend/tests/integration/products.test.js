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

describe('Test CRUD on /products', function () {
  it('Test endpoint GET /products if returns list with all products', async function () {
    sinon.stub(connection, 'execute').resolves([productsMocks.getAllProducts]);
    const response = await chai.request(app).get('/products');
    expect(response).to.have.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(productsMocks.getAllProducts);
  });
  it('Test endpoint GET /products/search if returns list products with name includes', async function () {
    sinon.stub(connection, 'execute').resolves([productsMocks.getAllProducts]);
    const response = await chai.request(app).get('/products/search?q=Thor');
    expect(response).to.have.status(statusCode.OK);
    expect(response.body).to.be.deep.equal([productsMocks.getAllProducts[0]]);
  });
  it('Test endpoint GET /products/:id if return product correct', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMocks.getAllProducts[0]]]);
    const response = await chai.request(app).get('/products/1');
    expect(response).to.be.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(productsMocks.getAllProducts[0]);
  });
  it('Test endpoint POST /products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const response = await chai.request(app).post('/products').send({ name: 'Sandalha' });
    expect(response).to.be.status(statusCode.CREATED);
    expect(response.body).to.be.deep.equal({ id: 4, name: 'Sandalha' });
  });
  it('Test endpoint PUT /product/:id', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall().resolves([productsMocks.getAllProducts])
    .onSecondCall()
.resolves([{ changedRows: 1 }]);
    const response = await chai.request(app).put('/products/1').send({ name: 'Martelo do Batman' });
    expect(response).to.be.status(statusCode.OK);
    expect(response.body).to.be.deep.equal({ id: 1, name: 'Martelo do Batman' });
  });
  it('Test endpoint DELETE /product/:id', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall().resolves([[productsMocks.getAllProducts[0]]]).onSecondCall()
.resolves([{ affectedRows: 1 }]);
    const response = await chai.request(app).delete('/products/1');
    expect(response).to.be.status(statusCode.NO_CONTENT);
  });
  afterEach(function () {
    sinon.restore();
  });
}); 