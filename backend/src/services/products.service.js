const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductByName = async (getName) => {
  const listProducts = await productsModel.getAllProducts();
  const product = listProducts.find((p) => p.name === getName);
  return product;
};
const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const addProduct = async (name) => {
  const id = await productsModel.addProduct(name);
  return { id, name };
};

const updateProductById = async (id, name) => {
  const product = await productsModel.getProductById(id);
  if (!product) return undefined;
  await productsModel.updateProductById(id, name);
  return { id: Number(id), name };
};

const deleteProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) return undefined;
  const changedRows = await productsModel.deleteProductById(id);
  return changedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
  updateProductById,
  deleteProductById,
};