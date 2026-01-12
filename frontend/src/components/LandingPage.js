import React from 'react';
import './LandingPage.css';

function LandingPage({ onEnterDashboard }) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <header className="landing-header">
          <h1>🌟 PROJECT VANGUARD 5</h1>
          <h2>Sensor Cahaya Monitoring System</h2>
        </header>

        <section className="team-intro">
          <h3>👥 Tim Pengembang</h3>
          <div className="team-members">
            <div className="member-card">
              <div className="member-avatar">👨‍💻</div>
              <h4>Nabila, Aldys, Syafrina</h4>
              <p>Full Stack Developer</p>
              <p>Spesialisasi: Backend & IoT Integration</p>
            </div>
            <div className="member-card">
              <div className="member-avatar">👩‍💻</div>
              <h4>Hendrian, C-regar</h4>
              <p>Frontend Developer</p>
              <p>Spesialisasi: UI/UX & React</p>
            </div>
            <div className="member-card">
              <div className="member-avatar">🔧</div>
              <h4>Haris, Ilam</h4>
              <p>Laporan Boys</p>
              <p>Spesialisasi: Microsoft Word & Design Proposal</p>
            </div>
            <div className="member-card">
              <div className="member-avatar">📊</div>
              <h4>Nayla, Asti</h4>
              <p>Laporan Girl</p>
              <p>Spesialisasi: Microsoft Word & Plan UML</p>
            </div>
          </div>
        </section>

        <section className="project-description">
          <h3>📋 Tentang Proyek</h3>
          <p>
            Project Vanguard 5 adalah sistem monitoring intensitas cahaya berbasis IoT yang dirancang
            untuk memberikan pemantauan real-time terhadap kondisi pencahayaan di berbagai lingkungan.
            Sistem ini menggunakan sensor cahaya yang terintegrasi dengan database dan dashboard web
            untuk visualisasi data yang mudah dipahami.
          </p>
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Real-time Monitoring</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span>Data Visualization</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <span>Auto Refresh</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Responsive Design</span>
            </div>
          </div>
        </section>

        <div className="landing-actions">
          <button
            className="btn btn-primary"
            onClick={onEnterDashboard}
          >
            🚀 Masuk ke Dashboard Monitoring
          </button>
        </div>

        <footer className="landing-footer">
          <p>&copy; 2024 Project Vanguard 5. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;