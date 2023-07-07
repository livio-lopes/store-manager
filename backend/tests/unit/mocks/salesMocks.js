const DATE = '2023-07-05T21:34:53.000Z';

const getAllSales = [
  {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-07-05T21:34:53.000Z',
    productId: 3,
    quantity: 15,
  },
];

const getModelSalesById1 = [
   {
    saleId: 1,
    date: DATE,
    productId: 1,
    quantity: 5,
  },
   {
    saleId: 1,
    date: DATE,
    productId: 2,
    quantity: 10,
  },
];

const getServiceSalesById1 = [
  {
    date: '2023-07-05T21:34:53.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-07-05T21:34:53.000Z',
    productId: 2,
    quantity: 10,
  },
];

const registerSalesController = {
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

  module.exports = {
    getAllSales,
    getModelSalesById1,
    getServiceSalesById1,
    registerSalesController,
  };