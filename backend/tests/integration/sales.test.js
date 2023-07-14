const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const salesMocks = require('../unit/mocks/salesMocks');
const connection = require('../../src/models/connection');
const app = require('../../src/app');
const { statusCode } = require('../../src/utils/statusUtils');

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

describe.only('Test integration CRUD on /sales', function () {
  it('Test endpoint GET /sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMocks.getAllSales]);
    const response = await chai.request(app).get('/sales');
    expect(response).to.be.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(salesMocks.getAllSales);
  });
  it('Test endpoint GET /sales/:id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMocks.getModelSalesById1]);
    const response = await chai.request(app).get('/sales/1');
    expect(response).to.be.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(salesMocks.getServiceSalesById1);
  });
  it('Test endpoint POST /sales', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall().resolves([{ insertId: 3 }])
    .onSecondCall()
.resolves([{ insertId: 4 }])
.onThirdCall()
.resolves([{ insertId: 5 }]);
    const mockSend = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const mockBody = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const response = await chai.request(app).post('/sales').send(mockSend);
    expect(response).to.be.status(statusCode.CREATED);
    expect(response.body).to.be.deep.equal(mockBody);
  });
  it.skip('Test endpoint PUT /:saleId/products/:productId/quantity');
  it.skip('Test endpoint DELETE /sales/:id');
  afterEach(function () {
    sinon.restore();
  });
});