// src/App.jsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layouts from './layouts/Layouts';
import Dashboard from './Pages/Dashboard';
import PieCharts from './Pages/PieCharts';
import Settings from './Pages/Settings';
import Customers from './Pages/Customers';
import CustomersDB from './Pages/CustomersDB';
import EditCustomer from './Pages/EditCustomer'; // ✅ Added import
import Products from './Pages/products';
import ProductsDB from './Pages/ProductsDB';
import EditProduct from './Pages/EditProduct';
import Error from './Pages/Error';
import Login from './validation/Login';
import Register from './validation/Register';
import CreateCustomer from './Pages/CreateCustomer';
import CreateProduct from "./Pages/CreateProduct";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* ✅ Login route OUTSIDE layout */}
      <Route path="/" element={<Login />} />
       <Route path="/Register" element={<Register />} />


      {/* ✅ Default redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* ✅ All layout-wrapped routes */}
      <Route element={<Layouts />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="PieCharts" element={<PieCharts />}/>
        
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomersDB />} />
        <Route path="customers/edit/:id" element={<EditCustomer />} /> {/* ✅ Added */}
        <Route path="customers/create" element={<CreateCustomer />} />


        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductsDB />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="/products/create" element={<CreateProduct />} />


        <Route path="settings" element={<Settings />} />
        <Route path="ForgotPassword" element ={<ForgotPassword/>} />

        {/* 404 fallback */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>

   
  );
}

export default App;
