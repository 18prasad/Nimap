

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const categoryRoutes = require('./Routes/categoryRoutes'); 
const productRoutes = require('./Routes/productRoutes');  

const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);   

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
