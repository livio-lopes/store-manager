const salesModel = require('../models/sales.model');

const getAllSales = async () => {
    const sales = await salesModel.getAllSales();
    return sales;
};

const getSalesById = async (id) => {
    const sale = await salesModel.getSalesById(id);
    return sale;
  };

module.exports = { 
    getAllSales,
    getSalesById,
 };