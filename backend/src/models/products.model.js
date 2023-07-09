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

const updateProductById = async (id, name) => {
  const [{ changedRows }] = await connection.execute(`UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?;`, [name, id]);
  return changedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
};