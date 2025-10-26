// src/Pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({
    title: "", price: "", description: "",
    brand: "", category: "", stock: "", rating: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct({
          title: res.data.title,
          price: res.data.price,
          description: res.data.description,
          brand: res.data.brand,
          category: res.data.category,
          stock: res.data.stock,
          rating: res.data.rating
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://dummyjson.com/products/${id}`, product);
      alert("✅ Product updated successfully!");

      const updatedData = { id: Number(id), ...product };

      if (location.state?.from === "details") {
        navigate(`/products/${id}`, {
          state: { updatedProduct: updatedData }
        });
      } else {
        navigate("/products", {
          state: { updatedProduct: updatedData }
        });
      }

    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Product...</span>
        </div>
      </div>
    );

return (
  <>
    <div className="container mt-5">
      {/* ✅ Inline Back Button */}
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i> Back
      </button>

      <div className="card shadow-lg border-0 rounded-4 p-4 animate__animated animate__fadeIn">
        <h3 className="text-center fw-bold mb-4">
          <i className="bi bi-pencil-square me-2"></i>Edit Product
        </h3>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Product Name</label>
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
            <label className="form-label">Price (₹)</label>
            <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" name="stock" value={product.stock} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Rating</label>
            <input type="number" step="0.1" className="form-control" name="rating" value={product.rating} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={product.description} onChange={handleChange} rows="3" required />
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-success px-4" type="submit">
              <i className="bi bi-check-circle me-2"></i>Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);

}

export default EditProduct;
