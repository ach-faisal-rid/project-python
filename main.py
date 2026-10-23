from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

from fastapi.middleware.cors import CORSMiddleware # <-- Tambahkan ini

app = FastAPI(
    title="Stok API", 
    description="REST API Manajemen Stok Barang"
    )

# Tambahkan blok ini agar HTML bisa akses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- MODEL DATA ----------
class Barang(BaseModel):
    nama: str
    stok: int
    harga: float

class BarangUpdate(BaseModel):
    nama: Optional[str] = None
    stok: Optional[int] = None
    harga: Optional[float] = None

# ---------- "DATABASE" SEMENTARA ----------
db_barang = {}
counter = {"id": 1}

# ---------- READ: semua barang ----------
@app.get("/barang")
def get_semua_barang():
    return list(db_barang.values())

# ---------- READ: barang berdasarkan ID ----------
@app.get("/barang/{barang_id}")
def get_barang(barang_id: int):
    if barang_id not in db_barang:
        raise HTTPException(
            status_code=404, 
            detail="Barang tidak ditemukan"
        )
    return db_barang[barang_id]

# ---------- CREATE ----------
@app.post("/barang", status_code=201)
def tambah_barang(barang: Barang):
    new_id = counter["id"]
    counter["id"] += 1
    db_barang[new_id] = {"id": new_id, **barang.dict()}
    return db_barang[new_id]

# ---------- UPDATE ----------
@app.put("/barang/{id}")
def update_barang(id: int, barang: BarangUpdate):
    if id not in db_barang:
        raise HTTPException(status_code=404, detail="Barang tidak ditemukan")
    data = db_barang[id]
    if barang.nama is not None:
        data["nama"] = barang.nama
    if barang.stok is not None:
        data["stok"] = barang.stok
    if barang.harga is not None:
        data["harga"] = barang.harga
    return data


# ---------- DELETE ----------
@app.delete("/barang/{id}", status_code=204)
def hapus_barang(id: int):
    if id not in db_barang:
        raise HTTPException(status_code=404, detail="Barang tidak ditemukan")
    del db_barang[id]
    return None

