// src/Pages/RevenueExpensesChart.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function RevenueExpensesChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        // Simulated API call - replace with your real endpoint
        const res = await axios.get("https://dummyjson.com/carts?limit=6");
        const months = ["January", "February", "March", "April", "May", "June"];

        // Using carts total as mock "revenue" and expenses as 65% of revenue
        const revenues = res.data.carts.map((cart) => cart.total);
        const expenses = revenues.map((rev) => rev * 0.65);

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Revenue",
              data: revenues,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: expenses,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching finance data:", err);
      }
    };

    fetchFinanceData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Revenue vs Expenses",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="card p-3 mt-4 m-5 shadow-lg" style={{ width: "80%" }}>
      <h5 className="fw-bold text-center fs-5">Revenue & Expenses Overview</h5>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center text-muted">Loading chart...</p>
      )}
    </div>
  );
}

export default RevenueExpensesChart;

