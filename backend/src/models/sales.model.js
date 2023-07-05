const connection = require('./connection');
const storeManager = require('./utils/storeManagerTable');

const SALES = 'sales';

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT * FROM ${storeManager(SALES)}`);
  return sales;
};

const getSalesById = async (id) => {
  const [[sale]] = await connection
  .execute(`SELECT * FROM ${storeManager(SALES)} WHERE id =?`, [id]);
  return sale;
};

module.exports = {
  getAllSales,
  getSalesById, 
};