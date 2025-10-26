// src/Pages/CreateProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    thumbnail: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://dummyjson.com/products/add", product);
      alert("✅ Product created successfully!");
      navigate("/products", {
        state: { newProduct: res.data }
      });
    } catch (err) {
      console.error("Error creating product:", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h3 className="text-center mb-4">Create New Product</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={product.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Brand</label>
            <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price ($)</label>
            <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" name="stock" value={product.stock} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Thumbnail (URL)</label>
            <input type="text" className="form-control" name="thumbnail" value={product.thumbnail} onChange={handleChange} required />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="3" value={product.description} onChange={handleChange} required />
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success px-4" type="submit">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
