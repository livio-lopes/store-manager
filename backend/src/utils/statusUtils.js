const statusCode = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNPROCESSABLE: 422,
};

const statusMessage = {
  PRODUCT_NOT_FOUND: { message: 'Product not found' },
  SALES_NOT_FOUND: { message: 'Sale not found' },
  BAD_REQUEST_NAME_NOTFOUND: { message: '"name" is required' },
  BAD_REQUEST_NAME_INVALID: { message: '"name" length must be at least 5 characters long' },
};

module.exports = {
  statusCode,
  statusMessage,
};