document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('categoryForm');
    const categoryNameInput = document.getElementById('categoryName');
    const categoryList = document.getElementById('categoryList');
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const categorySelect = document.getElementById('categorySelect');
    const productList = document.getElementById('productList');

    // Load categories
    fetch('http://localhost:3000/categories')
        .then(response => response.json())
        .then(categories => {
            categoryList.innerHTML = '';
            categorySelect.innerHTML = '<option value="" disabled selected>Select a category</option>';
            categories.forEach(category => {
                // Add to category list
                const li = document.createElement('li');
                li.textContent = category.categoryName;
                li.dataset.id = category.categoryId;

                // Add delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteCategory(category.categoryId);
                li.appendChild(deleteBtn);

                // Add update button
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.onclick = () => updateCategory(category.categoryId, category.categoryName);
                li.appendChild(updateBtn);

                categoryList.appendChild(li);

                // Add to category select
                const option = document.createElement('option');
                option.value = category.categoryId;
                option.textContent = category.categoryName;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

    // Load products
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.productName} (Category: ${product.categoryName})`;
                li.dataset.id = product.productId;

                // Add delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.onclick = () => deleteProduct(product.productId);
                li.appendChild(deleteBtn);

                // Add update button
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

    // Add category
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
            categoryNameInput.value = ''; // Clear input field
            location.reload(); // Reload the page to refresh the category list
        })
        .catch(error => {
            console.error('Error adding category:', error);
        });
    };

    // Add product
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
            productNameInput.value = ''; // Clear input field
            fetchProducts(); // Refresh product list
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    };

    // Delete category
    function deleteCategory(categoryId) {
        fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchCategories(); // Refresh category list
        })
        .catch(error => {
            console.error('Error deleting category:', error);
        });
    }

    // Update category
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
                fetchCategories(); // Refresh category list
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });
        } else {
            alert('Category name cannot be empty or the same as the old name.');
        }
    }

    // Delete product
    function deleteProduct(productId) {
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchProducts(); // Refresh product list
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
    }

    // Update product
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
                fetchProducts(); // Refresh product list
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
        } else {
            alert('Product name cannot be empty or the same as the old name.');
        }
    }

    // Fetch categories after adding, deleting or updating
    function fetchCategories() {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(categories => {
                categoryList.innerHTML = '';
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
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    // Fetch products after adding, deleting or updating
    function fetchProducts() {
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
                    deleteBtn.onclick = () => deleteProduct(product.productId);
                    li.appendChild(deleteBtn);

                    const updateBtn = document.createElement('button');
                    updateBtn.textContent = 'Update';
                    updateBtn.onclick = () => updateProduct(product.productId, product.productName);
                    li.appendChild(updateBtn);

                    productList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Initial data fetch
    fetchCategories();
    fetchProducts();
});
