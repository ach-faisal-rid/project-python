const API_URL = "http://127.0.0.1:8000/barang";

// Fungsi untuk mengambil data dari API
async function ambilBarang() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        tampilkanBarang(data);
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

// Fungsi untuk menampilkan data ke tabel HTML
function tampilkanBarang(data) {
    const tbody = document.getElementById("tabel-barang");
    tbody.innerHTML = "";

    data.forEach(barang => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${barang.id}</td>
            <td>${barang.nama}</td>
            <td>${barang.stok}</td>
            <td>Rp ${barang.harga.toLocaleString('id-ID')}</td>
            <td><button class="btn-hapus" onclick="hapusBarang(${barang.id})">Hapus</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Fungsi untuk menambah barang (POST)
document.getElementById("form-barang").addEventListener("submit", async function(e) {
    e.preventDefault(); // Mencegah halaman reload

    const nama = document.getElementById("nama").value;
    const stok = parseInt(document.getElementById("stok").value);
    const harga = parseFloat(document.getElementById("harga").value);

    const dataBaru = { nama: nama, stok: stok, harga: harga };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataBaru)
        });

        if (response.ok) {
            alert("Barang berhasil ditambahkan!");
            document.getElementById("form-barang").reset();
            ambilBarang(); // Refresh tabel
        }
    } catch (error) {
        console.error("Gagal menambah barang:", error);
    }
});

// Fungsi untuk menghapus barang (DELETE)
async function hapusBarang(id) {
    if (confirm("Yakin ingin menghapus barang ini?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Barang berhasil dihapus!");
                ambilBarang(); // Refresh tabel
            }
        } catch (error) {
            console.error("Gagal menghapus barang:", error);
        }
    }
}

// Jalankan fungsi ambilBarang saat halaman pertama kali dibuka
ambilBarang();