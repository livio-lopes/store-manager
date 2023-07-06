const statusCode = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
};

const statusMessage = {
  PRODUCT_NOT_FOUND: { message: 'Product not found' },
  SALES_NOT_FOUND: { message: 'Sale not found' },
};

module.exports = {
  statusCode,
  statusMessage,
};