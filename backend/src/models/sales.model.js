const connection = require('./connection');
const storeManager = require('./utils/storeManagerTable');

const SALES = 'sales';

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT * FROM ${storeManager(SALES)}`);
  return sales;
};

module.exports = { getAllSales };