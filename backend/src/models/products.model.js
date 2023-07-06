const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE id =?', [id]);
  return product;
};

const addProduct = async (setName) => {
 const [{ insertId }] = await connection
 .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [setName]);
return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};