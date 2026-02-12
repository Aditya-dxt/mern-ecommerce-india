import { useEffect, useState } from "react";
import api from "../../utils/axios";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import OrderStatusChart from "./components/OrderStatusCard";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          dashboardRes,
          orderStatusRes,
          revenueRes,
        ] = await Promise.all([
          api.get("/admin/dashboard/analytics"),
          api.get("/admin/analytics/order-status"),
          api.get("/admin/analytics/revenue-monthly"),
        ]);

        // ==============================
        // Dashboard Summary
        // ==============================
        const summary =
          dashboardRes.data?.data || dashboardRes.data || {};
        setDashboardData(summary);

        // ==============================
        // Order Status Chart Data
        // ==============================
        const orderData = Array.isArray(orderStatusRes.data?.data)
          ? orderStatusRes.data.data
          : Array.isArray(orderStatusRes.data)
          ? orderStatusRes.data
          : [];

        setOrderStatusData(orderData);

        // ==============================
        // Revenue Chart Data
        // ==============================
        const rawRevenue = Array.isArray(revenueRes.data?.data)
          ? revenueRes.data.data
          : Array.isArray(revenueRes.data)
          ? revenueRes.data
          : [];

        // Format month numbers to month names
        const formattedRevenue = rawRevenue.map((item) => ({
          month: new Date(
            item.year,
            item.month - 1
          ).toLocaleString("default", { month: "short" }),
          revenue: item.revenue,
        }));

        setRevenueData(formattedRevenue);

      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchAnalytics();
  }, []);

  if (error)
    return (
      <div className="p-10 text-red-500 font-semibold">
        Error: {error}
      </div>
    );

  if (!dashboardData)
    return (
      <div className="p-10 text-white">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Welcome back, Admin 👋
      </p>

      {/* ==============================
          Stats Section
      ============================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Users"
          value={dashboardData.totalUsers || 0}
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.totalOrders || 0}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${dashboardData.totalRevenue || 0}`}
        />
        <StatCard
          title="Total Products"
          value={dashboardData.totalProducts || 0}
        />
      </div>

      {/* ==============================
          Charts Section
      ============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RevenueChart data={revenueData} />
        <OrderStatusChart data={orderStatusData} />
      </div>
    </div>
  );
}
