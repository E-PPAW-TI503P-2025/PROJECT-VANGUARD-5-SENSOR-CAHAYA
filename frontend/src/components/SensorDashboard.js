import React, { useState, useEffect } from 'react';
import './SensorDashboard.css';
import SensorCard from './SensorCard';
import SensorChart from './SensorChart';
import SensorHistory from './SensorHistory';

function SensorDashboard({ onBackToLanding }) {
  const [latestData, setLatestData] = useState(null);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Fetch data terbaru
  const fetchLatestData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sensor/latest');
      const data = await response.json();
      setLatestData(data);
    } catch (err) {
      console.error('Error fetching latest data:', err);
      setError('Gagal mengambil data terbaru');
    }
  };

  // Fetch semua data
  const fetchAllData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sensor');
      const data = await response.json();
      setAllData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching all data:', err);
      setError('Gagal mengambil data sensor');
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLatestData();
    fetchAllData();
  }, []);

  // Auto refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestData();
      fetchAllData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleRefresh = () => {
    setLoading(true);
    fetchLatestData();
    fetchAllData();
  };

  // Fungsi untuk menentukan status cahaya
  const getLightStatus = (lux) => {
    if (lux < 100) return { status: 'Sangat Gelap', color: 'red', icon: '🌑' };
    if (lux < 500) return { status: 'Gelap', color: 'orange', icon: '🌙' };
    if (lux < 1000) return { status: 'Terang', color: 'yellow', icon: '☀️' };
    return { status: 'Sangat Terang', color: 'gold', icon: '🔆' };
  };

  if (loading && !latestData) {
    return (
      <div className="dashboard-container">
        <div className="loading">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <button 
            className="btn btn-back"
            onClick={onBackToLanding}
          >
            ← Kembali ke Beranda
          </button>
          <h1>📊 Dashboard Monitoring Sensor Cahaya</h1>
          <p>Sistem Real-time Monitoring Intensitas Cahaya</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-refresh"
            onClick={handleRefresh}
            disabled={loading}
          >
            🔄 Refresh
          </button>
          <select 
            className="interval-select"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
          >
            <option value={3000}>3 detik</option>
            <option value={5000}>5 detik</option>
            <option value={10000}>10 detik</option>
            <option value={30000}>30 detik</option>
            <option value={60000}>1 menit</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {/* Status Card */}
      {latestData && (
        <div className="status-section">
          <div className="status-card">
            <h2>Status Sensor Terkini</h2>
            <div className="status-content">
              <SensorCard 
                label="Intensitas Cahaya"
                value={latestData.cahaya}
                unit="lux"
                icon="💡"
                color="gold"
              />
              <div className="light-status-card">
                <div className="status-icon">{getLightStatus(latestData.cahaya).icon}</div>
                <div className="status-text">
                  <h3>Status Cahaya</h3>
                  <p className={`status-${getLightStatus(latestData.cahaya).color}`}>
                    {getLightStatus(latestData.cahaya).status}
                  </p>
                </div>
              </div>
              <div className="status-info">
                <p><strong>Waktu Update:</strong> {new Date(latestData.updatedAt).toLocaleString('id-ID')}</p>
                <p><strong>Total Data:</strong> {allData.length} record</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="charts-section">
        <SensorChart data={allData} />
      </div>

      {/* History Section */}
      <div className="history-section">
        <SensorHistory data={allData} />
      </div>

      {/* Statistics */}
      {allData.length > 0 && (
        <div className="stats-section">
          <h2>📈 Statistik Data Sensor</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Nilai Tertinggi</h3>
              <p className="stat-value">
                {Math.max(...allData.map(d => d.cahaya))} lux
              </p>
            </div>
            <div className="stat-box">
              <h3>Nilai Terendah</h3>
              <p className="stat-value">
                {Math.min(...allData.map(d => d.cahaya))} lux
              </p>
            </div>
            <div className="stat-box">
              <h3>Rata-rata</h3>
              <p className="stat-value">
                {(allData.reduce((sum, d) => sum + d.cahaya, 0) / allData.length).toFixed(2)} lux
              </p>
            </div>
            <div className="stat-box">
              <h3>Total Pengukuran</h3>
              <p className="stat-value">{allData.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SensorDashboard;
