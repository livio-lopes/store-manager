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

const deleteSalesById = async (id) => {
  const salesFinded = await salesModel.getSalesById(id);
  if (salesFinded.length === 0) {
    return undefined;
  }
  const salesTables = await salesModel.deleteSalesById(id);
  const salesProductsTables = await salesModel.deleteSalesProductsById(id);
  return { salesTables, salesProductsTables };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const listSalesProducts = await salesModel.getAllSales();
  const filterSaleId = listSalesProducts.filter((item) => item.saleId === saleId);
  if (filterSaleId.length === 0) return 'SALEID_NOTFOUND';
  const findProductId = filterSaleId.find((item) => item.productId === productId);
  if (!findProductId) return 'PRODUCTID_NOTFOUND';
  await salesModel.updateQuantityBySaleIdProductId(saleId, productId, quantity);
  return { ...findProductId, quantity };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
  deleteSalesById,
  updateQuantity,  
};
