const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = await salesModel.getSalesById(id);
  return sale.length === 0 ? undefined
    : sale.map(({ date, productId, quantity }) => ({ date, productId, quantity }));
};

const registerSales = async (sales) => {
  const saleId = await salesModel.setSaleDataTime();
  sales.forEach((sale) => salesModel.setSalesProducts({ saleId, ...sale }));
  return {
    id: saleId,
    itemsSold: [...sales],
  };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
};