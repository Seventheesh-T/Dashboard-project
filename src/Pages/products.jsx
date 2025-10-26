// src/Pages/Products.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaEye, FaPlusCircle } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      const updatedList = products.filter((product) => product.id !== id);
      setProducts(updatedList);
      setFilteredProducts(updatedList);
      alert(`Product ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const updatedProduct = location.state?.updatedProduct;
    if (updatedProduct) {
      const updatedList = products.map((product) =>
        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
      );
      setProducts(updatedList);
      setFilteredProducts(updatedList);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Filter by search term only
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (loading) return <h4 className="text-center mt-5">Loading Products...</h4>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Products List</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/products/create")}
        >
          <FaPlusCircle className="me-2" />
          Create Product
        </button>
      </div>

      {/* Search Filter */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by product name"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100"
            onClick={() => setSearchTerm("")}
          >
            Filter
          </button>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-3"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-3"
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
