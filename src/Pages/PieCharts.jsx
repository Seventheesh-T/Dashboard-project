import PolarChart from "./components/PolarCharts";
import RevenueExpensesChart from "./components/RevenueExpensesChart";
import GridLineChart from "./components/SalesChart";

function PieCharts() {
  const cardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    padding: "2rem",
    borderRadius: "15px",
    backgroundColor: "white",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
    e.currentTarget.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.25)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "";
  };

  return (
    <div className="container-fluid my-5">

      {/* Gradient Banner */}
      <div
        className="text-white text-center py-5 mb-5"
        style={{
          background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1 className="fw-bold display-4 mb-2">
           Dashboard Analytics
        </h1>
        <p className="lead mb-0">
          Track your sales, revenue, and product performance at a glance.
        </p>
      </div>

      {/* Chart Cards */}
      <div className="row g-5 justify-content-center">

        <div
          className="col-12 col-lg-10 shadow-sm"
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="fw-semibold text-center mb-4 text-primary">
             Total Sales Overview
          </h3>
          <GridLineChart />
        </div>

        <div
          className="col-12 col-lg-10 shadow-sm"
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="fw-semibold text-center mb-4 text-success">
             Revenue vs Expenses
          </h3>
          <RevenueExpensesChart />
        </div>

        <div
          className="col-12 col-lg-10 shadow-sm"
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="fw-semibold text-center mb-4 text-warning">
            Top Products by Rating
          </h3>
          <PolarChart />
        </div>

      </div>
    </div>
  );
}

export default PieCharts;
