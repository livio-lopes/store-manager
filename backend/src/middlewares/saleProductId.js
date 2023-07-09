const productService = require('../services/products.service');
const { statusCode, statusMessage } = require('../utils/statusUtils');

const saleProductId = async (req, res, next) => {
  const { body } = req;
  const productIdRequired = body.some((item) => item.productId === undefined);
  if (productIdRequired) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.PRODUCTID_NOTFOUND);
  }
  const listProduct = await productService.getAllProducts();
  const listIdProducts = listProduct.map(({ id }) => id);
  const existProductId = body
  .map(({ productId }) => listIdProducts.includes(productId))
  .some((item) => item === false);
  if (existProductId) {
    return res.status(statusCode.NOT_FOUND).json(statusMessage.PRODUCT_NOT_FOUND);
  }
  return next();
};

module.exports = saleProductId;