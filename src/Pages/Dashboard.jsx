// src/Pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <h4 className="text-center mt-5">Loading Dashboard...</h4>;
  }

  // Summary Stats
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 20).length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const inStock = products.filter(p => p.stock >= 20).length;

  // Group by category for Doughnut chart
  const categoryMap = {};
  products.forEach(product => {
    categoryMap[product.category] = (categoryMap[product.category] || 0) + 1;
  });

  const categoryChartData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: 'Product Count',
        data: Object.values(categoryMap),
        backgroundColor: [
          'blue', 'turquoise', 'orange', 'red', 'violet', 'green', 'pink', 'brown'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Low Stock Products Table
  const lowStockProducts = products
    .filter(p => p.stock < 20)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10); // top 10 lowest stock

  return (
    <div className="container mt-3">
      {/* Summary Cards */}
      <div className="row m-1 px-2">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "16px" }}>Total Products</h5>
              <p className="card-text fs-4">{totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "16px" }}>Low Stock</h5>
              <p className="card-text fs-4">{lowStock}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "16px" }}>Out of Stock</h5>
              <p className="card-text fs-4">{outOfStock}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: "16px" }}>In Stock</h5>
              <p className="card-text fs-4">{inStock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Low Stock Table */}
      <div className="row mt-4 mb-4">
        {/* Doughnut Chart */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Product Distribution by Category</h5>
            <Doughnut data={categoryChartData} />
          </div>
        </div>

        {/* Low Stock Table */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Low Stock Products</h5>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.title}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`badge ${product.stock === 0 ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {product.stock === 0 ? 'Out of Stock' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
