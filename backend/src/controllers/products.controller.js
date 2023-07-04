const productsServices = require('../services/products.service');

const OK = 200;

const getAllProducts = async (_req, res) => {
  const listProducts = await productsServices.getAllProducts();
  return res.status(OK).json(listProducts);
};

module.exports = {
  getAllProducts,
};