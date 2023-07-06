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
module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
};