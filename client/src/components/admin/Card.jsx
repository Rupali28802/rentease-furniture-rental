export default function Card({
  title,
  value,
  icon,
  change,
  color = "text-green-600",
  iconBg = "bg-green-100 dark:bg-green-900/40",
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </p>
          {change !== undefined && (
            <p
              className={`text-xs mt-1 ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% vs last 7 days
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}
        >
          <span className={`text-xl ${color}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
