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
              <th>Tanggal & Waktu</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => {
              const rowNumber = startIndex + index + 1;
              const isHighLight = item.cahaya > Math.max(...data.map(d => d.cahaya)) * 0.8;
              const isLowLight = item.cahaya < Math.max(...data.map(d => d.cahaya)) * 0.2;
              
              let statusClass = '';
              let statusText = 'Normal';
              
              if (isHighLight) {
                statusClass = 'status-high';
                statusText = 'Cahaya Terang';
              } else if (isLowLight) {
                statusClass = 'status-low';
                statusText = 'Cahaya Redup';
              }

              return (
                <tr key={item.idSensorLogs} className={statusClass}>
                  <td className="table-center">{rowNumber}</td>
                  <td className="table-center">{item.idSensorLogs}</td>
                  <td className="table-value">
                    <strong>{item.cahaya}</strong> lux
                  </td>
                  <td className="table-date">
                    {new Date(item.createdAt).toLocaleString('id-ID')}
                  </td>
                  <td className="table-center">
                    <span className={`badge ${statusClass}`}>
                      {statusText}
                    </span>
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
