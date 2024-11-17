const pool = require('../Config/database');

// Get all products with category details
async function getAllProducts(req, res) {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const [rows] = await pool.query(`
      SELECT p.productId AS ProductId, p.productName AS ProductName, c.categoryId AS CategoryId, c.categoryName AS CategoryName 
      FROM product p
      JOIN categories c ON p.categoryId = c.categoryId
      LIMIT ?, ?
    `, [parseInt(offset), parseInt(pageSize)]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get product by ID
async function getProductById(req, res) {
  try {
    const { productId } = req.params;  // Ensure the productId is correctly passed in the URL
    const [rows] = await pool.query(`
      SELECT p.productId AS ProductId, p.productName AS ProductName, c.categoryId AS CategoryId, c.categoryName AS CategoryName 
      FROM product p
      JOIN categories c ON p.categoryId = c.categoryId
      WHERE p.productId = ?
    `, [productId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new product
async function createProduct(req, res) {
  try {
    const { productName, categoryId } = req.body; // Fixed to match incoming body
    const [result] = await pool.query('INSERT INTO product (productName, categoryId) VALUES (?, ?)', [productName, categoryId]);
    res.status(201).json({ productId: result.insertId, productName, categoryId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a product
async function updateProduct(req, res) {
  try {
    const { productId } = req.params;  // Ensure the correct parameter is captured
    const { productName, categoryId } = req.body;

    // Query to update the product in the database
    const [result] = await pool.query(`
      UPDATE product 
      SET productName = ?, categoryId = ? 
      WHERE productId = ?
    `, [productName, categoryId, productId]);  // Pass the correct parameters

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ productId, productName, categoryId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Delete a product
async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const [result] = await pool.query('DELETE FROM product WHERE productId = ?', [productId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
