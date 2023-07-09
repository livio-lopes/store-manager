const { statusCode, statusMessage } = require('../utils/statusUtils');

const saleQuantity = (req, res, next) => {
  const { body } = req;
  const quantityIsRequired = body.some((item) => item.quantity === undefined);
  if (quantityIsRequired) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.QUANTITY_NOTFOUND);
  }
  const quantityInvalid = body.some((item) => item.quantity < 1);
  if (quantityInvalid) {
    return res.status(statusCode.UNPROCESSABLE).json(statusMessage.QUANTITY_INVALID);
  }
  return next();
};

module.exports = saleQuantity;