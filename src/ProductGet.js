import React, { Component } from 'react';
import axios from 'axios';
import './ProductGet.css'; // เพิ่มไฟล์ CSS สำหรับจัดการ layout

export class ProductGet extends Component {
  state = {
    products: [], // เก็บข้อมูลผลิตภัณฑ์ที่ดึงมา
    isLoading: true, // สถานะการโหลด
    error: null, // เก็บข้อผิดพลาดหากมี
    editingProduct: null, // เก็บข้อมูลผลิตภัณฑ์ที่กำลังแก้ไข
    formData: {
      ProductsName: '',
      Description: '',
      Price: '',
      status: ''
    } // ข้อมูลฟอร์มสำหรับการแก้ไข
  };

  // เรียกใช้ API เมื่อคอมโพเนนต์โหลดครั้งแรก
  componentDidMount() {
    this.fetchProducts();
  }

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API
  fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v2/products');
      this.setState({ products: response.data, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  // ฟังก์ชันสำหรับลบผลิตภัณฑ์
  handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v2/products/${productId}`);
      this.fetchProducts(); // รีเฟรชข้อมูลหลังจากลบเสร็จ
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // ฟังก์ชันสำหรับแก้ไขผลิตภัณฑ์
  handleEdit = (product) => {
    this.setState({
      editingProduct: product.Products_id,
      formData: {
        ProductsName: product.ProductsName,
        Description: product.Description,
        Price: product.Price,
        status: product.status
      }
    });
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไข
  handleSaveEdit = async () => {
    const { editingProduct, formData } = this.state;
    try {
      await axios.put(`http://localhost:8080/api/v2/products/${editingProduct}`, formData);
      this.setState({ editingProduct: null }); // รีเซ็ตสถานะการแก้ไข
      this.fetchProducts(); // รีเฟรชข้อมูลหลังจากแก้ไขเสร็จ
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์มแก้ไข
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value }
    });
  };

  render() {
    const { products, isLoading, error, editingProduct, formData } = this.state;

    if (isLoading) {
      return <div>Loading...</div>; // แสดงข้อความขณะกำลังโหลดข้อมูล
    }

    if (error) {
      return <div>Error: {error}</div>; // แสดงข้อความเมื่อมีข้อผิดพลาด
    }

    return (
      <div className="products-container">
        <h2 className="title">Products List</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.Products_id} className="product-card">
              {editingProduct === product.Products_id ? (
                <div>
                  <input
                    type="text"
                    name="ProductsName"
                    value={formData.ProductsName}
                    onChange={this.handleInputChange}
                  />
                  <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    name="Price"
                    value={formData.Price}
                    onChange={this.handleInputChange}
                  />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={this.handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button onClick={this.handleSaveEdit}>Save</button>
                  <button onClick={() => this.setState({ editingProduct: null })}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3>{product.ProductsName || 'Unnamed Product'}</h3>
                  <p>Description: {product.Description || 'No description available'}</p>
                  <p>Price: ${product.Price || 'N/A'}</p>
                  <p>Status: {product.status || 'N/A'}</p>
                  {product.ImageURL ? (
                    <img
                      src={`http://localhost:8080/${product.ImageURL}`}
                      alt={product.ProductsName}
                      className="product-image"
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                  <button onClick={() => this.handleEdit(product)}>Edit</button>
                  <button onClick={() => this.handleDelete(product.Products_id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductGet;
