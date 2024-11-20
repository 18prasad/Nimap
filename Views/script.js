document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('categoryForm');
    const categoryNameInput = document.getElementById('categoryName');
    const categoryList = document.getElementById('categoryList');
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const categorySelect = document.getElementById('categorySelect');
    const productList = document.getElementById('productList');

  
    fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(categories => {
            categoryList.innerHTML = '';
            categorySelect.innerHTML = '<option value="" disabled selected>Select a category</option>';
            categories.forEach(category => {
               
                const li = document.createElement('li');
                li.textContent = category.categoryName;
                li.dataset.id = category.categoryId;

                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteCategory(category.categoryId);
                li.appendChild(deleteBtn);

           
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.onclick = () => updateCategory(category.categoryId, category.categoryName);
                li.appendChild(updateBtn);

                categoryList.appendChild(li);

                const option = document.createElement('option');
                option.value = category.categoryId;
                option.textContent = category.categoryName;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });


    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.productName} (Category: ${product.categoryName})`;
                li.dataset.id = product.productId;

         
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.onclick = () => deleteProduct(product.productId);
                li.appendChild(deleteBtn);

               
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.classList.add('update-btn');
                updateBtn.onclick = () => updateProduct(product.productId, product.productName);
                li.appendChild(updateBtn);

                productList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    categoryForm.onsubmit = (e) => {
        e.preventDefault();
        const categoryName = categoryNameInput.value;
        fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoryName })
        })
        .then(response => response.json())
        .then(() => {
            categoryNameInput.value = '';
            location.reload(); 
        })
        .catch(error => {
            console.error('Error adding category:', error);
        });
    };

  
    productForm.onsubmit = (e) => {
        e.preventDefault();
        const productName = productNameInput.value;
        const categoryId = categorySelect.value;
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productName, categoryId })
        })
        .then(response => response.json())
        .then(() => {
            productNameInput.value = ''; 
            fetchProducts(); 
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    };

  
    function deleteCategory(categoryId) {
        fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchCategories(); 
        })
        .catch(error => {
            console.error('Error deleting category:', error);
        });
    }

    function updateCategory(categoryId, oldCategoryName) {
        const newCategoryName = prompt('Enter new category name:', oldCategoryName);
        if (newCategoryName && newCategoryName !== oldCategoryName) {
            fetch(`http://localhost:3000/categories/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categoryName: newCategoryName })
            })
            .then(response => response.json())
            .then(() => {
                fetchCategories(); 
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });
        } else {
            alert('Category name cannot be empty or the same as the old name.');
        }
    }

   
    function deleteProduct(productId) {
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchProducts(); 
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
    }

   
    function updateProduct(productId, oldProductName) {
        const newProductName = prompt('Enter new product name:', oldProductName);
        if (newProductName && newProductName !== oldProductName) {
            fetch(`http://localhost:3000/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productName: newProductName })
            })
            .then(response => response.json())
            .then(() => {
                fetchProducts();
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
        } else {
            alert('Product name cannot be empty or the same as the old name.');
        }
    }

    async function fetchCategories() {
        try {
            const response = await fetch('http://localhost:3000/categories');
            const categories = await response.json();
            categoryList.innerHTML = '';
            categorySelect.innerHTML = '<option value="" disabled selected>Select a category</option>';
    
            if (categories.length === 0) {
                categoryList.innerHTML = 'No categories available';
            }
    
            categories.forEach(category => {
                const li = document.createElement('li');
                li.textContent = category.categoryName;
    
                const actionBtns = document.createElement('div');
                actionBtns.classList.add('action-btns');
    
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteCategory(category.categoryId));
                actionBtns.appendChild(deleteBtn);
    
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.classList.add('update-btn');
                updateBtn.addEventListener('click', () => updateCategory(category.categoryId, category.categoryName));
                actionBtns.appendChild(updateBtn);
    
                li.appendChild(actionBtns);
                categoryList.appendChild(li);
    
                
                const option = document.createElement('option');
                option.value = category.categoryId;
                option.textContent = category.categoryName;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            categoryList.innerHTML = 'Error loading categories.';
        }
    }
    
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products = await response.json();
            productList.innerHTML = '';
    
            if (products.length === 0) {
                productList.innerHTML = 'No products available';
                return;
            }
    
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.productName} (Category: ${product.categoryName})`;
    
                const actionBtns = document.createElement('div');
                actionBtns.classList.add('action-btns');
    
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteProduct(product.productId));
                actionBtns.appendChild(deleteBtn);
    
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.classList.add('update-btn');
                updateBtn.addEventListener('click', () => updateProduct(product.productId, product.productName));
                actionBtns.appendChild(updateBtn);
    
                li.appendChild(actionBtns);
                productList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    

    
    fetchCategories();
    fetchProducts();
});
