const pool = require('../Config/database'); 


async function getAllCategories(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getCategoryById(req, res) {
  try {
    const {categoryId} = req.params;
    console.log(`Looking for category with ID: ${categoryId}`);
    const [rows] = await pool.query('SELECT * FROM categories WHERE categoryId = ?', [categoryId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCategory(req, res) {
  try {
    const { categoryName } = req.body; 
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    
    const [result] = await pool.query('INSERT INTO categories (categoryName) VALUES (?)', [categoryName]);

   
    res.status(201).json({ categoryId: result.insertId, categoryName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCategory(req, res) {
  try {
 
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    console.log(`Looking for category with ID: ${categoryId}`);
    const [result] = await pool.query('UPDATE categories SET categoryName = ? WHERE categoryId = ?', [categoryName, categoryId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ categoryId, categoryName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const [result] = await pool.query('DELETE FROM categories WHERE categoryId = ?', [categoryId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
