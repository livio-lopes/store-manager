const connection = require('./connection');

const selectAllProduct = 'SELECT * FROM StoreManager.products';
const selectProductById = 'SELECT * FROM StoreManager.products WHERE id =?';
const insertProduct = 'INSERT INTO StoreManager.products (name) VALUES (?)';
const updateProduct = `UPDATE StoreManager.products
SET name = ?
WHERE id = ?;`;
const deleteProduct = 'DELETE FROM StoreManager.products WHERE id = ?;';

const getAllProducts = async () => {
  const [products] = await connection.execute(selectAllProduct);
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(selectProductById, [id]);
  return product;
};

const addProduct = async (setName) => {
 const [{ insertId }] = await connection.execute(insertProduct, [setName]);
return insertId;
};

const updateProductById = async (id, name) => {
  const [{ changedRows }] = await connection.execute(updateProduct, [name, id]);
  return changedRows;
};

const deleteProductById = async (id) => {
  const [deleted] = await connection.execute(deleteProduct, [id]);
  return deleted;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};