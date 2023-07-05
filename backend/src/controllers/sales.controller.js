const salesService = require('../services/sales.service');
const { statusCode } = require('../utils/statusUtils');

const getAllSales = async (_req, res) => {
    const listSales = await salesService.getAllSales();
    return res.status(statusCode.OK).json(listSales);
  };

module.exports = { getAllSales };