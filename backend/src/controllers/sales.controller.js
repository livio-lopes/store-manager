const salesService = require('../services/sales.service');
const { statusCode, statusMessage } = require('../utils/statusUtils');

const getAllSales = async (_req, res) => {
    const listSales = await salesService.getAllSales();
    return res.status(statusCode.OK).json(listSales);
  };

const getSalesById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSalesById(id);
    if (sale) return res.status(statusCode.OK).json(sale);
    return res.status(statusCode.NOT_FOUND)
    .json(statusMessage.SALES_NOT_FOUND);
  };

module.exports = { 
  getAllSales,
  getSalesById,
 };