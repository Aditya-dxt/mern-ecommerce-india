import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#00df9a", "#ffbb28", "#ff4d4f", "#1890ff"];

export default function OrderStatusChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl text-white">
        <h3 className="mb-4 font-semibold">Order Status</h3>
        <p className="text-gray-400">No order status data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white">
      <h3 className="mb-4 font-semibold">Order Status</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
