import React, { useState } from 'react';
import axios from 'axios';

const ProductUpload = () => {
    // State to store form data
    const [product, setProduct] = useState({
        productsName: '',
        description: '',
        price: '',
        category: '',
        image: null,
        status: ''
    });

    // State to store response messages
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state

    // Handle input changes for text and select inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Handle image file selection
    const handleFileChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files[0] // Store the image file
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all necessary fields are filled
        if (!product.productsName || !product.description || !product.price || !product.category || !product.status) {
            setMessage('Please fill out all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('ProductsName', product.productsName);
        formData.append('Description', product.description);
        formData.append('Price', product.price);
        formData.append('CategoryID', parseInt(product.category)); // Convert category to int
        formData.append('status', product.status);
    
        if (product.image) {
            formData.append('image', product.image); // Append the image to the form data
        } else {
            setMessage('Please upload an image.');
            return;
        }
        
        setIsLoading(true); // Start loading state

        try {
            const res = await axios.post('http://localhost:8080/api/v2/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(res.data.message); // Display success message
        } catch (error) {
            setMessage('Error uploading product');
            console.error('Error uploading the product:', error);
        } finally {
            setIsLoading(false); // Stop loading state
        }
    };

    return (
        <div>
            <h2>Upload Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productsName"
                        value={product.productsName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} required />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={product.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Product'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductUpload;
