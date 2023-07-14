const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const salesMocks = require('../unit/mocks/salesMocks');
const productMocks = require('../unit/mocks/productsMocks');
const connection = require('../../src/models/connection');
const app = require('../../src/app');
const { statusCode } = require('../../src/utils/statusUtils');

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

describe('Test integration CRUD on /sales', function () {
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
   const mockConnection = sinon.stub(connection, 'execute');
   mockConnection.onCall(0).resolves([productMocks.getAllProducts]);
   mockConnection.onCall(1).resolves([{ insertId: 3 }]);
   mockConnection.onCall(2).resolves([{ insertId: 4 }]);
   mockConnection.onCall(3).resolves([{ insertId: 5 }]);

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
  it('Test endpoint PUT /:saleId/products/:productId/quantity', async function () {
    const mockConnection = sinon.stub(connection, 'execute');
    mockConnection.onCall(0).resolves([salesMocks.getAllSales]);
    mockConnection.onCall(1).resolves([{ affectedRows: 1 }]);
    const response = await chai.request(app).put('/sales/1/products/1/quantity').send({ quantity: 20 });
    const mockBody = { ...salesMocks.getAllSales[0], quantity: 20 };
    expect(response).to.be.status(statusCode.OK);
    expect(response.body).to.be.deep.equal(mockBody);
  });
  it('Test endpoint DELETE /sales/:id', async function () {
    const mockConnection = sinon.stub(connection, 'execute');
    mockConnection.onCall(0).resolves([salesMocks.getModelSalesById1]);
    mockConnection.onCall(1).resolves([{ affectedRows: 1 }]);
    mockConnection.onCall(2).resolves([{ affectedRows: 1 }]);
    const response = await chai.request(app).delete('/sales/1');
    expect(response).to.be.status(statusCode.NO_CONTENT);
  });
  afterEach(function () {
    sinon.restore();
  });
});