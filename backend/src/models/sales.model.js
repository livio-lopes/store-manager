const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`SELECT sp.sale_id AS saleId,
  sales.date AS date, sp.product_id AS productId, 
  sp.quantity AS quantity FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sales ON sp.sale_id = sales.id
ORDER BY saleId, productId;`);
  return sales;
};

const getSalesById = async (id) => {
  const [sale] = await connection
  .execute(`SELECT sp.sale_id AS saleId,
  sales.date AS date, sp.product_id AS productId, 
  sp.quantity AS quantity FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sales ON sp.sale_id = sales.id
WHERE sp.sale_id=?
ORDER BY saleId, productId;
;`, [id]);
  return sale;
};

const setSaleDataTime = async () => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  return insertId;
};

const setSalesProducts = async (saleObj) => {
  const { saleId, productId, quantity } = saleObj;
  const [{ insertId }] = await connection
  .execute(`INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity)
  VALUES (?,?,?); `, [saleId, productId, quantity]);
  return insertId;
};

module.exports = {
  getAllSales,
  getSalesById,
  setSaleDataTime,
  setSalesProducts, 
};