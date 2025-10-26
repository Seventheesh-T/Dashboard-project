// src/Pages/SalesChart.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Register chart components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function SalesChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Simulated API - replace with real sales data endpoint
        const res = await axios.get("https://dummyjson.com/products?limit=7");

        const months = ["January", "February", "March", "April", "May", "June", "July"];
        const sales = res.data.products.map((prod) => prod.stock); // Mock sales using stock count

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Total Sales",
              data: sales,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.3)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching sales data:", err);
      }
    };

    fetchSalesData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Line Chart with Grid Settings" },
    },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: true } },
    },
  };

  return (
    <div className="card p-3 mt-4 m-5 shadow-lg" style={{ width: "80%" }}>
      <h5 className="fw-bold text-center fs-5">Total Sales</h5>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-center text-muted">Loading sales chart...</p>
      )}
    </div>
  );
}

export default SalesChart;
