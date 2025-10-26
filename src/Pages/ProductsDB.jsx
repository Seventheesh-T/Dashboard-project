// src/Pages/ProductsDB.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaEdit,
  FaTag,
  FaBox,
  FaStore,
  FaMoneyBillWave,
  FaPercent,
  FaHeart,
  FaShoppingCart
} from "react-icons/fa";

function ProductsDB() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching product:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.updatedProduct) {
      setProduct(location.state.updatedProduct);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Product...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back
      </button>

      <div className="card shadow-lg border-0 rounded-4 p-4 animate__animated animate__fadeIn bg-light">
        <div className="row g-4 align-items-center">

          {/* Image & Title Section */}
          <div className="col-md-4 text-center border-end">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded shadow-sm mb-3"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            <h4 className="fw-bold text-primary">{product.title}</h4>
            <span className="badge bg-info text-dark px-3 py-2">{product.category}</span>

            <div className="mt-3 d-grid gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() =>-
                  navigate(`/products/edit/${product.id}`, {
                    state: { from: "details" },
                  })
                }
              >
                <FaEdit className="me-2" />
                Edit Product
              </button>

                
            </div>
          </div>

          {/* Details Section */}
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <p className="mb-2">
                  <FaTag className="me-2 text-secondary" />
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p className="mb-2">
                  <FaBox className="me-2 text-secondary" />
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p className="mb-2">
                  <FaStore className="me-2 text-secondary" />
                  <strong>Category:</strong> {product.category}
                </p>
              </div>

              <div className="col-md-6">
                <p className="mb-2">
                  <FaMoneyBillWave className="me-2 text-secondary" />
                  <strong>Price:</strong> ${product.price}
                </p>
                <p className="mb-2">
                  <FaPercent className="me-2 text-secondary" />
                  <strong>Discount:</strong> {product.discountPercentage}%
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong> {product.rating}
                </p>
              </div>

              <div className="col-12">
                <p>
                  <strong>Description:</strong><br />
                  {product.description}
                </p>
              </div>
            </div>

            <hr />
            <div className="text-end text-muted">
              <small>Product ID: #{product.id}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsDB;
