// =============================================
// script.js - Logika Contoh Interaktif
// Pemrograman Dasar
// =============================================


// =============================================
// DEMO 1A: VARIABEL
// Menampilkan cara menyimpan dan menggunakan variabel
// =============================================

function demoVariabel() {
    // Ambil nilai dari input nama dan usia pengguna
    let nama = document.getElementById("var-nama").value;
    let usia = document.getElementById("var-usia").value;

    // Validasi: pastikan kedua input sudah diisi
    if (nama === "" || usia === "") {
        tampilkanOutput("output-variabel", "⚠️ Isi nama dan usia dulu ya!", false);
        return; // Hentikan fungsi jika ada yang kosong
    }

    // Buat variabel salam dengan menggabungkan teks dan isi variabel nama
    let salam = "Halo, " + nama + "!";

    // Hitung tahun lahir dari tahun sekarang dikurangi usia
    let tahunSekarang = new Date().getFullYear(); // Ambil tahun saat ini
    let tahunLahir = tahunSekarang - Number(usia); // Konversi usia ke angka dulu

    // Susun teks hasil untuk ditampilkan ke layar
    let hasil =
        `📦 Variabel yang Disimpan:\n` +
        `   nama = "${nama}"   → tipe: ${typeof nama}\n` +
        `   usia = ${usia}     → tipe: ${typeof Number(usia)}\n\n` +
        `💬 Hasil:\n` +
        `   ${salam}\n` +
        `   Kamu lahir sekitar tahun ${tahunLahir}.`;

    // Tampilkan hasil ke kotak output
    tampilkanOutput("output-variabel", hasil, true);
}


// =============================================
// DEMO 1B: TIPE DATA
// Mendeteksi jenis tipe data dari nilai yang dimasukkan
// =============================================

function demoTipeData() {
    // Ambil teks input dari pengguna
    let inputTeks = document.getElementById("td-input").value;

    // Validasi: pastikan input tidak kosong
    if (inputTeks === "") {
        tampilkanOutput("output-tipedata", "⚠️ Ketik sesuatu dulu ya!", false);
        return;
    }

    // Coba konversi teks ke angka untuk mengecek apakah itu angka
    let cobaAngka = Number(inputTeks);

    // Tentukan tipe data secara manual berdasarkan nilai input
    let tipeDeteksi; // Nama tipe yang terdeteksi
    let emoji;       // Ikon yang sesuai

    if (inputTeks === "true" || inputTeks === "false") {
        // Jika input persis "true" atau "false" → Boolean
        tipeDeteksi = "Boolean (true / false)";
        emoji = "✅";
    } else if (!isNaN(cobaAngka) && inputTeks.trim() !== "") {
        // Jika bisa dikonversi ke angka → Number
        tipeDeteksi = inputTeks.includes(".")
            ? "Number – Float (Desimal)"   // Ada titik → float
            : "Number – Integer (Bulat)";  // Tidak ada titik → integer
        emoji = "🔢";
    } else {
        // Selain kondisi di atas → String (teks)
        tipeDeteksi = "String (Teks)";
        emoji = "📝";
    }

    // Susun teks hasil
    let hasil =
        `${emoji} Input: "${inputTeks}"\n\n` +
        `📌 Tipe Terdeteksi : ${tipeDeteksi}\n\n` +
        `💡 Contoh tipe data:\n` +
        `   "Halo"  → String\n` +
        `   42      → Number (Integer)\n` +
        `   3.14    → Number (Float)\n` +
        `   true    → Boolean`;

    // Tampilkan hasil
    tampilkanOutput("output-tipedata", hasil, true);
}


// =============================================
// DEMO 2: ARRAY
// Mengelola daftar item menggunakan array
// =============================================

let daftarBelanja = []; // Array global untuk menyimpan item belanja

// Fungsi untuk menambahkan item ke array
function tambahItem() {
    // Ambil elemen input
    let input = document.getElementById("array-item");
    // Hapus spasi di awal dan akhir teks dengan .trim()
    let item = input.value.trim();

    // Validasi: pastikan input tidak kosong
    if (item === "") {
        tampilkanOutput("output-array", "⚠️ Tulis nama item dulu!", false);
        return;
    }

    // Tambahkan item ke akhir array dengan .push()
    daftarBelanja.push(item);

    // Kosongkan input agar siap diisi lagi
    input.value = "";

    // Perbarui tampilan daftar
    tampilkanArray();
}

// Fungsi untuk menghapus item terakhir dari array
function hapusItem() {
    // Cek apakah array tidak kosong
    if (daftarBelanja.length === 0) {
        tampilkanOutput("output-array", "⚠️ Tidak ada item untuk dihapus.", false);
        return;
    }

    // Hapus item terakhir dari array dengan .pop()
    daftarBelanja.pop();

    // Perbarui tampilan daftar
    tampilkanArray();
}

// Fungsi untuk menampilkan isi array ke output
function tampilkanArray() {
    // Jika array kosong, tampilkan pesan kosong
    if (daftarBelanja.length === 0) {
        tampilkanOutput("output-array", "Daftar belanja masih kosong...", false);
        return;
    }

    // Mulai baris teks dengan header
    let baris = `📋 daftarBelanja (${daftarBelanja.length} item):\n\n`;

    // Loop untuk menampilkan setiap item beserta indeksnya
    for (let i = 0; i < daftarBelanja.length; i++) {
        baris += `   [${i}] ${daftarBelanja[i]}\n`; // Indeks dimulai dari 0
    }

    // Tampilkan panjang array di bawah
    baris += `\n📏 Panjang array: ${daftarBelanja.length}`;

    // Tampilkan ke output
    tampilkanOutput("output-array", baris, true);
}


// =============================================
// DEMO 3: FUNGSI
// Membuat dan memanggil fungsi dengan parameter dan return value
// =============================================

// Fungsi menghitung luas persegi panjang
// Parameter: panjang, lebar → nilai input fungsi
// Return: luas → nilai yang dikembalikan fungsi
function hitungLuas(panjang, lebar) {
    let luas = panjang * lebar; // Proses di dalam fungsi
    return luas;                // Kembalikan hasil ke pemanggil
}

// Fungsi menghitung keliling persegi panjang
function hitungKeliling(panjang, lebar) {
    let keliling = 2 * (panjang + lebar); // Rumus keliling
    return keliling;
}

function demoFungsi() {
    // Ambil nilai input dan ubah ke tipe Number
    let panjang = Number(document.getElementById("fn-panjang").value);
    let lebar   = Number(document.getElementById("fn-lebar").value);

    // Validasi: angka harus positif
    if (isNaN(panjang) || isNaN(lebar) || panjang <= 0 || lebar <= 0) {
        tampilkanOutput("output-fungsi", "⚠️ Masukkan angka positif untuk panjang dan lebar!", false);
        return;
    }

    // Panggil fungsi dan simpan nilai kembaliannya
    let luas     = hitungLuas(panjang, lebar);
    let keliling = hitungKeliling(panjang, lebar);

    // Susun teks hasil
    let hasil =
        `🔧 Fungsi dipanggil:\n` +
        `   hitungLuas(${panjang}, ${lebar})      → ${luas} cm²\n` +
        `   hitungKeliling(${panjang}, ${lebar})  → ${keliling} cm\n\n` +
        `📐 Persegi panjang ${panjang} × ${lebar} cm:\n` +
        `   Luas     = ${luas} cm²\n` +
        `   Keliling = ${keliling} cm`;

    // Tampilkan ke output
    tampilkanOutput("output-fungsi", hasil, true);
}


// =============================================
// DEMO 4: PERCABANGAN
// Mengambil keputusan menggunakan if-else
// =============================================

function demoPercabangan() {
    // Ambil nilai dan ubah ke angka
    let nilai = Number(document.getElementById("pc-nilai").value);

    // Validasi: nilai harus antara 0 dan 100
    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        tampilkanOutput("output-percabangan", "⚠️ Masukkan angka antara 0 sampai 100!", false);
        return;
    }

    // Percabangan untuk menentukan grade
    let grade; // Variabel untuk menyimpan hasil kondisi
    let emoji; // Ikon sesuai kondisi

    if (nilai >= 90) {
        // Kondisi 1: nilai 90 ke atas
        grade = "A – Sangat Baik 🌟";
        emoji = "🎉";
    } else if (nilai >= 75) {
        // Kondisi 2: nilai 75 sampai 89
        grade = "B – Baik";
        emoji = "😊";
    } else if (nilai >= 60) {
        // Kondisi 3: nilai 60 sampai 74
        grade = "C – Cukup";
        emoji = "😐";
    } else if (nilai >= 40) {
        // Kondisi 4: nilai 40 sampai 59
        grade = "D – Kurang";
        emoji = "😕";
    } else {
        // Kondisi terakhir (else): nilai di bawah 40
        grade = "E – Perlu Belajar Lebih Keras";
        emoji = "📚";
    }

    // Susun teks hasil dengan menampilkan proses setiap kondisi
    let hasil =
        `${emoji} Nilai: ${nilai}\n\n` +
        `📋 Proses Percabangan:\n` +
        `   if (${nilai} >= 90)  → ${nilai >= 90            ? "✅ TERPENUHI" : "❌ tidak"}\n` +
        `   if (${nilai} >= 75)  → ${nilai >= 75 && nilai < 90 ? "✅ TERPENUHI" : "❌ tidak"}\n` +
        `   if (${nilai} >= 60)  → ${nilai >= 60 && nilai < 75 ? "✅ TERPENUHI" : "❌ tidak"}\n` +
        `   if (${nilai} >= 40)  → ${nilai >= 40 && nilai < 60 ? "✅ TERPENUHI" : "❌ tidak"}\n` +
        `   else             → ${nilai < 40                ? "✅ TERPENUHI" : "❌ tidak"}\n\n` +
        `🏆 Grade: ${grade}`;

    // Tampilkan ke output
    tampilkanOutput("output-percabangan", hasil, true);
}


// =============================================
// DEMO 5: PERULANGAN
// Menggunakan for loop untuk mengeksekusi kode berulang
// =============================================

function demoPerulangan() {
    // Ambil jumlah bintang dari input
    let jumlah = Number(document.getElementById("loop-n").value);

    // Validasi: jumlah harus antara 1 dan 20
    if (isNaN(jumlah) || jumlah < 1 || jumlah > 20) {
        tampilkanOutput("output-perulangan", "⚠️ Masukkan angka antara 1 sampai 20!", false);
        return;
    }

    // Variabel untuk menampung hasil bintang
    let baris = "";

    // For loop: mulai dari i=1, berjalan selama i <= jumlah, tambah 1 tiap putaran
    for (let i = 1; i <= jumlah; i++) {
        baris += "⭐"; // Tambahkan satu bintang per putaran
    }

    // Susun teks penjelasan proses loop
    let hasil = `🔄 for (let i = 1; i <= ${jumlah}; i++)\n\n📊 Proses:\n`;

    // Tampilkan log maksimal 5 iterasi agar tidak terlalu panjang
    let batasLog = Math.min(jumlah, 5);
    for (let i = 1; i <= batasLog; i++) {
        hasil += `   Putaran ke-${i}: tambah ⭐\n`; // Log tiap putaran
    }

    // Tambahkan keterangan jika iterasi lebih dari 5
    if (jumlah > 5) {
        hasil += `   ... (${jumlah - 5} putaran lainnya)\n`;
    }

    // Tampilkan hasil akhir bintang
    hasil += `\n⭐ Hasil (${jumlah} bintang):\n   ${baris}`;

    // Tampilkan ke output
    tampilkanOutput("output-perulangan", hasil, true);
}


// =============================================
// FUNGSI PEMBANTU (Helper)
// Digunakan oleh semua demo di atas
// =============================================

// Fungsi untuk menampilkan teks ke kotak output
// Parameter:
//   id       → id elemen HTML yang menjadi target output
//   pesan    → teks yang akan ditampilkan
//   berhasil → true: tampilkan teks hitam; false: tampilkan teks abu (peringatan)
function tampilkanOutput(id, pesan, berhasil) {
    // Temukan elemen output berdasarkan id-nya
    let elOutput = document.getElementById(id);

    // Isi teks output
    elOutput.textContent = pesan;

    // Tambah atau hapus kelas 'aktif' untuk mengubah warna teks
    if (berhasil) {
        elOutput.classList.add("aktif");    // Teks berubah jadi hitam
    } else {
        elOutput.classList.remove("aktif"); // Teks tetap abu
    }
}
