# Sistem Manajemen Stok Barang

Proyek latihan aplikasi manajemen stok sederhana. Backend dibuat dengan FastAPI dan menyimpan data sementara di memori; frontend menggunakan HTML, CSS, dan JavaScript untuk berinteraksi dengan API.

## Fitur

- Melihat daftar barang.
- Menambahkan barang dengan nama, jumlah stok, dan harga.
- Menghapus barang setelah konfirmasi.
- Mengakses dokumentasi API interaktif dari FastAPI.

> Data hanya disimpan di memori. Semua barang akan hilang ketika server backend dimulai ulang.

## Persiapan

Pastikan Python 3.9 atau lebih baru sudah tersedia. Dari folder proyek, buat dan aktifkan virtual environment:

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
```

Jika PowerShell menolak aktivasi skrip, jalankan perintah berikut hanya untuk sesi terminal saat ini, lalu aktifkan kembali:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

Pasang dependensi backend:

```powershell
python -m pip install fastapi uvicorn
```

## Menjalankan aplikasi

1. Di terminal pertama pada folder proyek, jalankan backend:

   ```powershell
   uvicorn main:app --reload
   ```

   API tersedia di `http://127.0.0.1:8000`, dan dokumentasinya di `http://127.0.0.1:8000/docs`.

2. Di terminal kedua, sajikan file frontend:

   ```powershell
   cd frontend
   python -m http.server 5500
   ```

3. Buka `http://127.0.0.1:5500` di browser. Pastikan backend tetap berjalan agar frontend dapat membaca dan mengubah data.

Frontend saat ini mengirim permintaan ke `http://127.0.0.1:8000/barang`. Backend mengaktifkan CORS agar halaman frontend dapat mengakses API.

## Endpoint API

| Metode | Endpoint | Kegunaan |
| --- | --- | --- |
| `GET` | `/barang` | Mengambil semua barang |
| `GET` | `/barang/{barang_id}` | Mengambil barang berdasarkan ID |
| `POST` | `/barang` | Menambahkan barang |
| `PUT` | `/barang/{id}` | Memperbarui satu atau beberapa kolom barang |
| `DELETE` | `/barang/{id}` | Menghapus barang |

Contoh isi permintaan `POST /barang`:

```json
{
  "nama": "Buku Tulis",
  "stok": 12,
  "harga": 5000
}
```

Untuk permintaan `PUT`, kirim hanya kolom yang ingin diubah, misalnya:

```json
{
  "stok": 20
}
```

## Panduan belajar

1. **Struktur data dan validasi** — pelajari model `Barang` dan `BarangUpdate` di `main.py`, lalu amati bagaimana FastAPI memvalidasi JSON.
2. **Operasi CRUD** — telusuri fungsi endpoint dan penyimpanan `db_barang` serta `counter`. Coba panggil endpoint melalui halaman `/docs`.
3. **Permintaan HTTP di browser** — di `frontend/script.js`, ikuti `fetch` untuk `GET`, `POST`, dan `DELETE`, lalu lihat bagaimana hasil API ditampilkan di tabel.
4. **Tampilan** — ubah struktur pada `frontend/index.html` dan gaya pada `frontend/style.css`, kemudian muat ulang halaman.
5. **Pengembangan lanjutan** — coba tambahkan fitur edit barang, validasi stok/harga, penyimpanan permanen dengan database, dan pengujian otomatis.

## Struktur proyek

```text
project-python/
├── main.py
├── README.md
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
```
