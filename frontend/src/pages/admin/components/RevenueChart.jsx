import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl text-white">
        <h3 className="mb-4 font-semibold">Monthly Revenue</h3>
        <p className="text-gray-400">No revenue data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white">
      <h3 className="mb-4 font-semibold">Monthly Revenue</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          {/* IMPORTANT FIX HERE */}
          <XAxis dataKey="month" stroke="#aaa" />

          <YAxis stroke="#aaa" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#00df9a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
