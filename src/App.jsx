import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Dashboard from "./Pages/Dashboard";
import PieCharts from "./Pages/PieCharts";
import Settings from "./Pages/Settings";
import Customers from "./Pages/Customers";
import CustomersDB from "./Pages/CustomersDB";
import EditCustomer from "./Pages/EditCustomer";
import Products from "./Pages/products";
import ProductsDB from "./Pages/ProductsDB";
import EditProduct from "./Pages/EditProduct";
import Error from "./Pages/Error";
import Login from "./validation/Login";
import Register from "./validation/Register";
import CreateCustomer from "./Pages/CreateCustomer";
import CreateProduct from "./Pages/CreateProduct";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  // ✅ reactive auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* Redirect root based on auth */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />

      {/* Protected routes */}
      {isAuthenticated ? (
        <Route element={<Layouts />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="piecharts" element={<PieCharts />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomersDB />} />
          <Route path="customers/edit/:id" element={<EditCustomer />} />
          <Route path="customers/create" element={<CreateCustomer />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductsDB />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default App;
