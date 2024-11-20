// const express = require('express');
// const bodyParser = require('body-parser');
// const categoryController = require('./Controllers/categoryController');
// const productController = require('./Controllers/productController');

// const app = express();
// const PORT = 3000;
// const cors = require('cors');
// app.use(cors());


// app.use(bodyParser.json());

// // Category routes
// app.get('/categories', categoryController.getAllCategories);
// app.get('/categories/:categoryId', categoryController.getCategoryById);
// app.post('/categories', categoryController.createCategory);
// app.put('/categories/:categoryId', categoryController.updateCategory);
// app.delete('/categories/:categoryId', categoryController.deleteCategory);

// // Product routes
// app.get('/products', productController.getAllProducts);
// app.get('/products/:productId', productController.getProductById);
// app.post('/products', productController.createProduct);
// app.put('/products/:productId', productController.updateProduct);
// app.delete('/products/:productId', productController.deleteProduct);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load .env file

const categoryController = require('./Controllers/categoryController');
const productController = require('./Controllers/productController');

const app = express();

// Use the PORT from the .env file or fallback to 3000
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Category routes
app.get('/categories', categoryController.getAllCategories);
app.get('/categories/:categoryId', categoryController.getCategoryById);
app.post('/categories', categoryController.createCategory);
app.put('/categories/:categoryId', categoryController.updateCategory);
app.delete('/categories/:categoryId', categoryController.deleteCategory);

// Product routes
app.get('/products', productController.getAllProducts);
app.get('/products/:productId', productController.getProductById);
app.post('/products', productController.createProduct);
app.put('/products/:productId', productController.updateProduct);
app.delete('/products/:productId', productController.deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
