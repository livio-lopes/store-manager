const productsServices = require('../services/products.service');
const { statusCode, statusMessage } = require('../utils/statusUtils');

const getAllProducts = async (_req, res) => {
  const listProducts = await productsServices.getAllProducts();
  return res.status(statusCode.OK).json(listProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getProductById(id);
  if (product) return res.status(statusCode.OK).json(product);
  return res.status(statusCode.NOT_FOUND)
  .json(statusMessage.PRODUCT_NOT_FOUND);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsServices.addProduct(name);
  return res.status(statusCode.CREATED).json(newProduct);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedProduct = await productsServices.updateProductById(id, name);
  if (updatedProduct === undefined) {
    return res.status(statusCode.NOT_FOUND).json(statusMessage.PRODUCT_NOT_FOUND);
  }
  return res.status(statusCode.OK).json(updatedProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
};