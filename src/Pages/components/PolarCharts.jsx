// src/Pages/TopProductsPolarChart.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import axios from "axios";

// Register chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PolarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=5");
        const products = res.data.products;

        setChartData({
          labels: products.map((p) => p.title),
          datasets: [
            {
              label: "Product Ratings",
              data: products.map((p) => p.rating), // use ratings dynamically
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 205, 86, 0.6)",
                "rgba(201, 203, 207, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(201, 203, 207)",
                "rgb(54, 162, 235)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching products for chart:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="card p-3 mt-4 m-5 shadow-lg" style={{ width: "80%" }}>
      <h5 className="fw-bold text-center fs-5">Top Products by Rating</h5>
      {chartData ? (
        <PolarArea data={chartData} options={{ responsive: true }} />
      ) : (
        <p className="text-center text-muted">Loading chart...</p>
      )}
    </div>
  );
}

export default PolarChart;
