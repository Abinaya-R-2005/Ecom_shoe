import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Percent,
  PlusCircle,
  Layers,
  Headphones,
  LogOut
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    discounts: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user || !user.isAdmin) {
      navigate("/login");
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const productsRes = await fetch("http://localhost:5000/products");
      const products = await productsRes.json();

      const ordersRes = await fetch("http://localhost:5000/admin/orders");
      const orders = await ordersRes.json();

      const activeDiscounts = products.filter(
        (p) =>
          p.discountPercent > 0 &&
          new Date(p.discountStart) <= new Date() &&
          new Date(p.discountEnd) >= new Date()
      );

      setStats({
        products: products.length,
        orders: orders.length,
        discounts: activeDiscounts.length
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-page">
      <div className="admin-card">

        {/* Header */}
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card green">
            <Package size={28} />
            <h3>{stats.products}</h3>
            <p>Total Products</p>
          </div>

          <div className="stat-card blue">
            <ShoppingBag size={28} />
            <h3>{stats.orders}</h3>
            <p>Placed Orders</p>
          </div>

          <div className="stat-card purple">
            <Percent size={28} />
            <h3>{stats.discounts}</h3>
            <p>Active Discounts</p>
          </div>
        </div>

        {/* Actions */}
        <div className="admin-actions-grid">
          <button onClick={() => navigate("/admin/add-category")}>
            <Layers /> Add Category
          </button>

          <button onClick={() => navigate("/admin/add-product")}>
            <PlusCircle /> Add Product
          </button>

          <button onClick={() => navigate("/admin/remove-product")}>
            <Package /> Manage Products
          </button>

          <button onClick={() => navigate("/admin/orders")}>
            <ShoppingBag /> Orders
          </button>

          <button onClick={() => navigate("/admin/support")}>
            <Headphones /> Support
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
