export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
