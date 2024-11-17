const express = require('express');
const bodyParser = require('body-parser');
const categoryController = require('./Controllers/categoryController');
const productController = require('./Controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Category routes
app.get('/categories', categoryController.getAllCategories);
app.get('/categories/:id', categoryController.getCategoryById);
app.post('/categories', categoryController.createCategory);
app.put('/categories/:id', categoryController.updateCategory);
app.delete('/categories/:id', categoryController.deleteCategory);

// Product routes
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
