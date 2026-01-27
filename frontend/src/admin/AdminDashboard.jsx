import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Percent,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    discounts: 0,
    categories: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!token || !user || !user.isAdmin) {
      navigate("/login");
      return;
    }
    fetchStats();
  }, [navigate, token]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/admin/dashboard-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Welcome back! Here's your store overview</p>
        </div>
        <button className="refresh-btn" onClick={fetchStats}>
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <h3>{stats.products}</h3>
            <p>Total Products</p>
          </div>
          <TrendingUp className="trend-icon" />
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <ShoppingBag />
          </div>
          <div className="stat-content">
            <h3>{stats.orders}</h3>
            <p>Total Orders</p>
          </div>
          <TrendingUp className="trend-icon" />
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <Percent />
          </div>
          <div className="stat-content">
            <h3>{stats.discounts}</h3>
            <p>Active Discounts</p>
          </div>
          <TrendingUp className="trend-icon" />
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <h3>{stats.categories}</h3>
            <p>Categories</p>
          </div>
          <TrendingUp className="trend-icon" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button
            className="action-btn"
            onClick={() => navigate("/admin/add-product")}
          >
            <Package size={24} />
            <span>Add Product</span>
          </button>
          <button
            className="action-btn"
            onClick={() => navigate("/admin/add-category")}
          >
            <Package size={24} />
            <span>Add Category</span>
          </button>
          <button
            className="action-btn"
            onClick={() => navigate("/admin/remove-product")}
          >
            <Package size={24} />
            <span>Manage Products</span>
          </button>
          <button
            className="action-btn"
            onClick={() => navigate("/admin/orders")}
          >
            <ShoppingBag size={24} />
            <span>View Orders</span>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="recent-section">
          <h2>Recent Orders</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">{order._id?.slice(-8)}</td>
                    <td>{order.userName || "Customer"}</td>
                    <td className="price">₹{order.totalAmount?.toFixed(2) || "0.00"}</td>
                    <td>
                      <span className={`status ${order.status || "pending"}`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
