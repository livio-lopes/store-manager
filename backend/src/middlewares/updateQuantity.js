const { statusCode, statusMessage } = require('../utils/statusUtils');

const updateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.QUANTITY_NOTFOUND);
  }
  if (quantity < 1) {
    return res.status(statusCode.UNPROCESSABLE).json(statusMessage.QUANTITY_INVALID);
  }
  return next();
};

module.exports = updateQuantity;