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

const registerSales = async (req, res) => {
  const soldItems = req.body;
  const salesRegistred = await salesService.registerSales(soldItems);
  return res.status(statusCode.CREATED).json(salesRegistred);
};

const deleteSalesById = async (req, res) => {
  const { id } = req.params;
  const deletedSales = await salesService.deleteSalesById(id);
  if (!deletedSales) {
    return res.status(statusCode.NOT_FOUND).json(statusMessage.SALES_NOT_FOUND);
  }
  return res.status(statusCode.NO_CONTENT).end();
};

module.exports = { 
  getAllSales,
  getSalesById,
  registerSales,
  deleteSalesById,
 };