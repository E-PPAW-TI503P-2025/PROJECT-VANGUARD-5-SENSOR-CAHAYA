import React from 'react';
import './SensorChart.css';

function SensorChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-container">Tidak ada data untuk ditampilkan</div>;
  }

  // Ambil 20 data terakhir untuk chart
  const chartData = data.slice(0, 20).reverse();

  // Cari max dan min untuk scaling
  const maxValue = Math.max(...chartData.map(d => d.cahaya));
  const minValue = Math.min(...chartData.map(d => d.cahaya));
  const range = maxValue - minValue || 1;
  const chartHeight = 300;
  const padding = 40;

  const getBarHeight = (value) => {
    return ((value - minValue) / range) * (chartHeight - padding);
  };

  return (
    <div className="chart-container">
      <h2>📉 Grafik Intensitas Cahaya (20 Data Terakhir)</h2>

      <div className="chart-wrapper">
        <svg
          className="chart-svg"
          viewBox="0 0 800 350"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid */}
          <defs>
            <pattern id="grid" width="80" height="35" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 35" fill="none" stroke="#f0f0f0" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="800" height="350" fill="url(#grid)" />

          {/* Axes */}
          <line x1="40" y1="320" x2="780" y2="320" stroke="#333" strokeWidth="2" />
          <line x1="40" y1="20" x2="40" y2="320" stroke="#333" strokeWidth="2" />

          {/* Y-axis labels */}
          <text x="35" y="325" textAnchor="end" fontSize="12" fill="#666">0</text>
          <text x="35" y="185" textAnchor="end" fontSize="12" fill="#666">{(minValue + range / 2).toFixed(0)}</text>
          <text x="35" y="25" textAnchor="end" fontSize="12" fill="#666">{maxValue.toFixed(0)}</text>

          {/* Bars */}
          {chartData.map((item, index) => {
            const x = 40 + (index / (chartData.length - 1 || 1)) * 740;
            const height = getBarHeight(item.cahaya);
            return (
              <g key={index}>
                <rect
                  x={x - 15}
                  y={320 - height}
                  width="30"
                  height={height}
                  fill="#4CAF50"
                  opacity="0.7"
                  className="chart-bar"
                >
                  <title>{item.cahaya} ADC</title>
                </rect>
                <text
                  x={x}
                  y="335"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#666"
                  transform={`rotate(45 ${x} 335)`}
                >
                  {index % 2 === 0 ? index : ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
          <span>Intensitas Cahaya</span>
        </div>
      </div>
    </div>
  );
}

export default SensorChart;
