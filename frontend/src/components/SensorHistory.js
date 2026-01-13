import React, { useState } from 'react';
import './SensorHistory.css';

function SensorHistory({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!data || data.length === 0) {
    return (
      <div className="history-container">
        <h2>📋 Riwayat Data Sensor</h2>
        <p className="no-data">Tidak ada data sensor</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="history-container">
      <h2>📋 Riwayat Data Sensor</h2>

      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID Sensor</th>
              <th>Intensitas Cahaya</th>
              <th>Kondisi</th>
              <th>Status Lampu</th>
              <th>Tanggal & Waktu</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => {
              const rowNumber = startIndex + index + 1;

              // Use backend data for kondisi
              const kondisiClass = item.kondisi === 'TERANG' ? 'status-terang' : 'status-gelap';
              const lampClass = item.status_lampu === 'ON' ? 'lamp-on' : 'lamp-off';

              return (
                <tr key={item.idSensorLogs}>
                  <td className="table-center">{rowNumber}</td>
                  <td className="table-center">{item.idSensorLogs}</td>
                  <td className="table-value">
                    <strong>{item.cahaya}</strong> lux
                  </td>
                  <td className="table-center">
                    <span className={`badge ${kondisiClass}`}>
                      {item.kondisi === 'TERANG' ? '☀️' : '🌙'} {item.kondisi}
                    </span>
                  </td>
                  <td className="table-center">
                    <span className={`badge ${lampClass}`}>
                      {item.status_lampu === 'ON' ? '💡' : '⚫'} {item.status_lampu}
                    </span>
                  </td>
                  <td className="table-date">
                    {new Date(item.createdAt).toLocaleString('id-ID')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          ← Sebelumnya
        </button>

        <div className="pagination-info">
          Halaman {currentPage} dari {totalPages} | Total: {data.length} data
        </div>

        <button
          className="pagination-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
}

export default SensorHistory;
