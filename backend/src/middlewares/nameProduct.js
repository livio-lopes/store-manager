const { statusCode, statusMessage } = require('../utils/statusUtils');

const nameProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
 return res.status(statusCode.BAD_REQUEST)
  .json(statusMessage.BAD_REQUEST_NAME_NOTFOUND);
 }
  if (name.length < 5) {
    return res.status(statusCode.UNPROCESSABLE)
    .json(statusMessage.BAD_REQUEST_NAME_INVALID);
  }
  return next();
};

module.exports = nameProduct;