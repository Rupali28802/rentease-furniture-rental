export default function LineChart({ labels, data }) {
  const width = 600;
  const height = 220;
  const pad = 40;

  const max = Math.max(...data, 1);
  const min = 0;

  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1 || 1)) * (width - pad * 2);
    const y =
      height - pad - ((d - min) / (max - min || 1)) * (height - pad * 2);
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x || pad} ${
    height - pad
  } L ${pad} ${height - pad} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = pad + (1 - f) * (height - pad * 2);
          return (
            <line
              key={f}
              x1={pad}
              y1={y}
              x2={width - pad}
              y2={y}
              stroke="#e5e7eb"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          );
        })}

        <path d={areaPath} fill="url(#lineFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#22c55e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#22c55e"
            stroke="#fff"
            strokeWidth="1.5"
          />
        ))}

        {/* labels */}
        {labels.map((l, i) => {
          const p = points[i];
          return (
            <text
              key={i}
              x={p?.x}
              y={height - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#9ca3af"
            >
              {l}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
