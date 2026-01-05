# 📊 Dashboard Monitoring Sensor Cahaya

Dashboard monitoring real-time untuk sistem sensor cahaya (light intensity) berbasis IoT.

## 📁 Struktur Komponen

Semua file dashboard disimpan di folder `src/components/`:

```
components/
├── SensorDashboard.js      # Komponen utama dashboard
├── SensorDashboard.css     # Styling dashboard
├── SensorCard.js           # Komponen kartu sensor individual
├── SensorCard.css          # Styling kartu sensor
├── SensorChart.js          # Komponen grafik data sensor
├── SensorChart.css         # Styling grafik
├── SensorHistory.js        # Komponen tabel riwayat data
└── SensorHistory.css       # Styling tabel riwayat
```

## ✨ Fitur Dashboard

### 1. **Status Terkini**
- Menampilkan nilai intensitas cahaya terbaru dalam format kartu
- Waktu update terakhir
- Total data yang telah disimpan

### 2. **Grafik Real-time**
- Visualisasi 20 data terakhir dalam bentuk bar chart
- Skalabilitas otomatis berdasarkan min-max nilai
- Hover untuk melihat detail nilai

### 3. **Tabel Riwayat**
- Daftar lengkap semua data sensor
- Paginasi (10 item per halaman)
- Status indikator:
  - 🟡 **Cahaya Terang** - Nilai tinggi
  - 🔵 **Cahaya Redup** - Nilai rendah
  - 🟢 **Normal** - Nilai standar

### 4. **Statistik**
- Nilai tertinggi (max)
- Nilai terendah (min)
- Rata-rata (average)
- Total pengukuran

### 5. **Kontrol**
- 🔄 Tombol refresh manual
- ⏱️ Interval auto-refresh (3s, 5s, 10s, 30s, 1 menit)

## 🔌 Backend Integration

Dashboard terhubung ke backend API:

```
Backend URL: http://localhost:3001/api/sensor
```

### Endpoints yang Digunakan:

1. **GET /api/sensor** - Mengambil semua data sensor
   ```json
   Response:
   [
     {
       "idSensorLogs": 1,
       "cahaya": 500,
       "createdAt": "2026-01-05T10:30:00Z",
       "updatedAt": "2026-01-05T10:30:00Z"
     }
   ]
   ```

2. **GET /api/sensor/latest** - Mengambil data sensor terbaru
   ```json
   Response:
   {
     "idSensorLogs": 1,
     "cahaya": 500,
     "createdAt": "2026-01-05T10:30:00Z",
     "updatedAt": "2026-01-05T10:30:00Z"
   }
   ```

## 🚀 Cara Menggunakan

### 1. Setup Backend

```bash
cd backend
npm install
npm start
# Backend akan running di http://localhost:3001
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm start
# Frontend akan running di http://localhost:3000
```

### 3. Pastikan Backend Running

Dashboard memerlukan backend yang aktif. Jika tidak tersambung, akan menampilkan error message.

## 🎨 Tampilan & Design

### Warna Tema:
- **Primary Color**: `#667eea` (Ungu)
- **Secondary Color**: `#764ba2` (Ungu gelap)
- **Accent Color**: `#f39c12` (Emas)
- **Success**: `#27ae60` (Hijau)

### Responsive Design:
- ✅ Desktop (1400px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

## 📊 Komponen Detail

### SensorDashboard (Komponen Utama)
- Mengelola state untuk data sensor
- Fetch data dari API
- Mengontrol interval refresh otomatis
- Menggabungkan semua sub-komponen

**Props yang digunakan**: None (mengambil dari API)

**State**:
```javascript
- latestData: Object (data sensor terbaru)
- allData: Array (semua data sensor)
- loading: Boolean (status loading)
- error: String (pesan error)
- refreshInterval: Number (interval refresh dalam ms)
```

### SensorCard (Komponen Kartu)
Menampilkan nilai sensor dalam format kartu.

**Props**:
```javascript
- label: String (label sensor)
- value: Number (nilai sensor)
- unit: String (satuan)
- icon: String (emoji icon)
- color: String (warna theme)
```

### SensorChart (Komponen Grafik)
Visualisasi data sensor menggunakan SVG bar chart.

**Props**:
```javascript
- data: Array (array data sensor)
```

### SensorHistory (Komponen Riwayat)
Menampilkan tabel riwayat data dengan pagination.

**Props**:
```javascript
- data: Array (array data sensor)
```

## 🔧 Konfigurasi

### Mengubah API URL

Jika backend running di port/host berbeda, edit URL di `SensorDashboard.js`:

```javascript
const response = await fetch('http://localhost:3001/api/sensor/latest');
// Ubah menjadi URL yang sesuai
```

### Mengubah Interval Refresh Default

Di `SensorDashboard.js`:

```javascript
const [refreshInterval, setRefreshInterval] = useState(5000); // Ubah nilai (ms)
```

### Mengubah Item Per Halaman

Di `SensorHistory.js`:

```javascript
const itemsPerPage = 10; // Ubah sesuai kebutuhan
```

## 📱 Mobile Optimization

Dashboard sudah fully responsive dengan breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🐛 Troubleshooting

### "Gagal mengambil data"
- ✓ Pastikan backend running di http://localhost:3001
- ✓ Cek CORS configuration di backend
- ✓ Cek Network tab di DevTools browser

### "Tidak ada data untuk ditampilkan"
- ✓ Pastikan ada data di database
- ✓ Cek endpoint `/api/sensor` di Postman

### Chart tidak tampil
- ✓ Pastikan data sensor minimal ada 1 record
- ✓ Buka browser console (F12) untuk melihat error

## 📝 Notes

- Data di-update secara real-time sesuai interval yang dipilih
- Maksimal 20 data terakhir ditampilkan di grafik (untuk performa)
- Pagination di tabel berfungsi untuk navigasi data besar
- Semua timestamp dalam format lokal (sesuai timezone sistem)

## 🎯 Future Enhancements

Ide pengembangan lebih lanjut:
- [ ] Export data ke CSV/Excel
- [ ] Filter data berdasarkan tanggal range
- [ ] Alert notifikasi untuk nilai ekstrem
- [ ] Grafik tambahan (line chart, pie chart)
- [ ] Real-time data dengan WebSocket
- [ ] Dark mode theme
- [ ] Authentication system
