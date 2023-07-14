const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

const searchProductByName = async (name) => {
  const allProducts = await productsModel.getAllProducts();
  if (!name) return allProducts;
  return allProducts.filter((product) => product.name.includes(name));
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
  const affectedRows = await productsModel.deleteProductById(id);
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  searchProductByName,
};