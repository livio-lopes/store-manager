const connection = require('./connection');

const selectAllSales = `SELECT sp.sale_id AS saleId,
sales.date AS date, sp.product_id AS productId, 
sp.quantity AS quantity FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sales ON sp.sale_id = sales.id
ORDER BY saleId, productId;`;

const selectSalesById = `SELECT sp.sale_id AS saleId,
sales.date AS date, sp.product_id AS productId, 
sp.quantity AS quantity FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sales ON sp.sale_id = sales.id
WHERE sp.sale_id=?
ORDER BY saleId, productId;
;`;

const insetDatetimeSales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';

const insertSalesProducts = `INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity)
VALUES (?,?,?); `;

const deleteSales = `DELETE FROM StoreManager.sales_products
WHERE sale_id = ?;`;

const getAllSales = async () => {
  const [sales] = await connection.execute(selectAllSales);
  return sales;
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(selectSalesById, [id]);
  return sale;
};

const setSaleDataTime = async () => {
  const [{ insertId }] = await connection.execute(insetDatetimeSales);
  return insertId;
};

const setSalesProducts = async (saleObj) => {
  const { saleId, productId, quantity } = saleObj;
  const [{ insertId }] = await connection
  .execute(insertSalesProducts, [saleId, productId, quantity]);
  return insertId;
};

const deleteSalesById = async (id) => {
  const [{ affectedRows }] = await connection.execute(deleteSales, [id]);
  return affectedRows;
};

module.exports = {
  getAllSales,
  getSalesById,
  setSaleDataTime,
  setSalesProducts,
  deleteSalesById, 
};