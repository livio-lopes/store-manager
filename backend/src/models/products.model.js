const connection = require('./connection');
const storeManager = require('./utils/storeManagerTable');

const PRODUCTS = 'products';

const getAllProducts = async () => {
  const [products] = await connection.execute(`SELECT * FROM ${storeManager(PRODUCTS)}`);
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection
  .execute(`SELECT * FROM ${storeManager(PRODUCTS)} WHERE id =?`, [id]);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};