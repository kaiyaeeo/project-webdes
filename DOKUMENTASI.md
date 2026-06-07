# 📘 Dokumentasi Kode Website BookCircle
### Penjelasan Tampilan Halaman — Referensi File & Baris Kode

---

## Daftar Isi

1. [Fondasi: Variabel & Pengaturan Global](#1-fondasi)
2. [Landing Page (index.html)](#2-landing-page)
   - [Navbar](#21-navbar)
   - [Hero Section](#22-hero-section)
   - [Stats Strip](#23-stats-strip-angka-animasi)
   - [Kategori](#24-kategori)
   - [Featured Books](#25-featured-books-buku-terbaru)
   - [How It Works](#26-cara-kerjanya)
   - [Request Banner](#27-request-banner)
   - [Testimonial](#28-testimonial)
   - [Footer](#29-footer)
3. [Halaman Login (pages/login.html)](#3-halaman-login)
4. [Halaman Daftar (pages/register.html)](#4-halaman-register)
5. [Halaman Katalog (pages/catalog.html)](#5-halaman-katalog)
6. [Halaman Detail Buku (pages/detail.html)](#6-halaman-detail-buku)
7. [Halaman Jual Buku (pages/sell.html)](#7-halaman-jual-buku)
8. [Halaman Wishlist (pages/wishlist.html)](#8-halaman-wishlist)
9. [Data & State Management (js/data.js)](#9-data--state-management)
10. [Auth Management (js/auth.js)](#10-auth-management)
11. [App Logic (js/app.js)](#11-app-logic)

---

## 1. Fondasi

### Palet Warna (CSS Variables)
**📄 File:** `css/main.css` — **Baris 7–52**

```css
:root {
  --snow:        #FFFBFF;   /* Putih krem — background utama */
  --almond:      #F1DABF;   /* Krem kekuningan — aksen hangat */
  --taupe:       #92817A;   /* Abu-abu kecoklatan — teks sekunder */
  --coffee:      #362417;   /* Coklat gelap — warna dominan/CTA */
  --black:       #000500;   /* Hitam pekat — background gelap */
}
```

> **Penjelasan:** Semua warna disimpan sebagai **CSS Custom Properties** (variabel). Artinya, ketika kamu menulis `background: var(--coffee)` di mana saja, browser akan mengganti `var(--coffee)` dengan `#362417`. Keuntungannya: kalau mau ganti tema warna seluruh website, cukup ubah di satu tempat ini saja.

---

### Sistem Radius & Shadow
**📄 File:** `css/main.css` — **Baris 40–52**

```css
--r-sm:  8px;    /* sudut membulat kecil, untuk tombol kecil */
--r-md:  12px;   /* sudut membulat sedang */
--r-lg:  18px;   /* sudut membulat besar, untuk kartu */
--r-xl:  26px;   /* sudut membulat sangat besar */
--r-2xl: 36px;   /* sudut membulat ekstra, untuk panel utama */

--shadow-sm: 0 2px 10px rgba(54,36,23,0.08);   /* bayangan ringan */
--shadow-md: 0 6px 24px rgba(54,36,23,0.11);   /* bayangan sedang */
--shadow-lg: 0 14px 44px rgba(54,36,23,0.16);  /* bayangan kuat */
--shadow-xl: 0 24px 64px rgba(54,36,23,0.20);  /* bayangan maksimal */
```

> **Penjelasan:** Daripada menuliskan `border-radius: 18px` berulang-ulang, kita simpan di variabel. `rgba(54,36,23,...)` adalah versi RGB dari warna coklat `#362417` — ini dipakai untuk bayangan agar warna shadownya senada dengan tema.

---

### Animasi Global
**📄 File:** `css/main.css` — **Baris 131–154**

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes blobFloat {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(24px,-18px) scale(1.04); }
  66%     { transform: translate(-18px,14px) scale(0.96); }
}

.anim-fadeUp { animation: fadeUp 0.55s var(--ease) both; }
.anim-d1     { animation-delay: 0.08s; }  /* delay 1 */
.anim-d2     { animation-delay: 0.16s; }  /* delay 2 */
.anim-d3     { animation-delay: 0.24s; }  /* delay 3 */
```

> **Penjelasan:** `fadeUp` membuat elemen muncul dari bawah ke atas sambil fade-in. `blobFloat` membuat lingkaran latar bergerak perlahan seperti mengambang. Class `.anim-d1`, `.anim-d2`, dst. memberikan jeda waktu berbeda agar elemen muncul bergantian (efek staggered/bergelombang), bukan serentak.

---

## 2. Landing Page

**📄 File utama:** `index.html`

---

### 2.1 Navbar

**📄 File:** `js/data.js` — **Baris 100–191** (fungsi `buildNavbar`)
**📄 Style:** `css/components.css` — **Baris 1–100**

#### Cara Navbar Dipasang
```html
<!-- index.html, Baris 22 -->
<div id="navbarMount"></div>

<!-- index.html, Baris 246 -->
<script>
  document.getElementById('navbarMount').innerHTML = buildNavbar('home');
</script>
```

> **Penjelasan:** Navbar tidak ditulis langsung di HTML, melainkan dibuat oleh fungsi JavaScript `buildNavbar()` dari `data.js`. Hasilnya di-*inject* ke dalam `div#navbarMount`. Teknik ini disebut **dynamic rendering** — keuntungannya: kita cukup ubah satu fungsi untuk memperbarui navbar di semua halaman sekaligus.

#### Logika Tampilan Navbar (Login vs Belum Login)
```javascript
// js/data.js, Baris 128–157
const rightHTML = loggedIn ? `
  <!-- Jika sudah login: tampilkan avatar + dropdown -->
  <img src="${avatarUrl(u.name)}" class="user-avatar" onclick="toggleDropdown()"/>
  <div class="user-dropdown hidden" id="userDropdown">
    <a href="dashboard.html">Dashboard</a>
    <a href="#" onclick="doLogout()">Keluar</a>
  </div>
` : `
  <!-- Jika belum login: tampilkan tombol Masuk & Daftar -->
  <a href="login.html" class="btn-outline sm">Masuk</a>
  <a href="register.html" class="btn-primary sm">Daftar</a>
`;
```

> **Penjelasan:** Operator ternary `loggedIn ? ... : ...` artinya "kalau sudah login, tampilkan A; kalau belum, tampilkan B". Fungsi `avatarUrl()` menghasilkan gambar avatar dari layanan DiceBear berdasarkan nama pengguna — jadi setiap user punya avatar inisial otomatis.

#### Navbar Sticky (menempel saat scroll)
```css
/* css/components.css, Baris 1–10 */
.navbar {
  position: fixed;          /* tetap di atas saat halaman di-scroll */
  top: 0; left: 0; right: 0;
  z-index: 800;             /* muncul di atas elemen lain */
  backdrop-filter: blur(20px); /* efek kaca buram di belakang navbar */
  background: rgba(255,251,255,0.88); /* background semi-transparan */
}
.navbar.scrolled { box-shadow: var(--shadow-md); } /* bayangan muncul saat scroll */
```

> **Penjelasan:** `position: fixed` membuat navbar "nempel" di atas layar meski halaman digulir. `backdrop-filter: blur()` menciptakan efek **glassmorphism** (kaca buram). Class `.scrolled` ditambahkan via JavaScript saat pengguna menggulir — memberikan bayangan agar navbar terlihat terpisah dari konten.

---

### 2.2 Hero Section

**📄 File HTML:** `index.html` — **Baris 24–73**
**📄 File CSS:** `css/pages.css` — **Baris 9–115**

#### Struktur Layout Hero
```html
<!-- index.html, Baris 25 -->
<section class="hero" id="beranda">
  <!-- Layer 1: Background dekoratif -->
  <div class="hero-bg">
    <div class="blob blob-1"></div>  <!-- Lingkaran blur kiri -->
    <div class="blob blob-2"></div>  <!-- Lingkaran blur kanan -->
    <div class="hero-grain"></div>   <!-- Tekstur noise/grain -->
  </div>

  <!-- Layer 2: Konten teks (kiri) -->
  <div class="hero-content anim-fadeUp">...</div>

  <!-- Layer 3: Visual buku mengambang (kanan) -->
  <div class="hero-visual anim-fadeUp anim-d3">...</div>
</section>
```

```css
/* css/pages.css, Baris 9–18 */
.hero {
  min-height: 100vh;              /* tinggi minimal = 1 layar penuh */
  display: grid;
  grid-template-columns: 1fr 1fr; /* bagi dua kolom sama besar */
  align-items: center;            /* konten rata tengah vertikal */
  padding: 100px 6% 70px;         /* padding atas 100px biar tidak ketutup navbar */
  position: relative;
  overflow: hidden;               /* sembunyikan blob yang keluar area */
}
```

> **Penjelasan:** Hero menggunakan **CSS Grid** dengan dua kolom (`1fr 1fr`): kolom kiri untuk teks, kanan untuk ilustrasi buku. `min-height: 100vh` artinya tinggi minimal sama dengan tinggi layar browser. `overflow: hidden` memastikan lingkaran blob yang ukurannya besar tidak menyebabkan scrollbar horizontal.

#### Background Blob (Lingkaran Kabur)
```css
/* css/pages.css, Baris 22–34 */
.blob {
  position: absolute;
  border-radius: 50%;          /* bentuk lingkaran sempurna */
  filter: blur(90px);          /* diburamkan sangat kuat */
  opacity: 0.32;               /* transparan 68% */
}
.blob-1 {
  width: 560px; height: 560px;
  background: var(--almond);   /* warna krem */
  top: -100px; right: -80px;   /* posisi pojok kanan atas, sengaja setengah keluar */
  animation: blobFloat 9s ease-in-out infinite; /* gerak mengambang terus */
}
.blob-2 {
  width: 380px; height: 380px;
  background: var(--taupe);    /* warna abu-abu */
  bottom: 0; left: -60px;      /* posisi pojok kiri bawah */
  animation: blobFloat 12s ease-in-out infinite reverse; /* gerak berlawanan arah */
}
```

> **Penjelasan:** Blob adalah lingkaran besar yang di-blur sangat kuat hingga terlihat seperti gradien atau cahaya. `filter: blur(90px)` adalah kuncinya. Dua blob bergerak dengan kecepatan berbeda (9s dan 12s) dan arah berlawanan (`reverse`) untuk menciptakan ilusi kedalaman dan kehidupan.

#### Tekstur Grain (Noise)
```css
/* css/pages.css, Baris 30–34 */
.hero-grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise inline */
  opacity: 0.55;
}
```

> **Penjelasan:** Tekstur noise/grain dibuat dengan SVG `feTurbulence` yang di-embed langsung sebagai URL data — tidak perlu file gambar eksternal. Ini menambah kedalaman dan mencegah tampilan terasa terlalu "flat/digital".

#### Judul Hero (Animasi Masuk)
```html
<!-- index.html, Baris 32–36 -->
<div class="hero-content anim-fadeUp">
  <div class="hero-eyebrow">✦ Platform Mahasiswa Indonesia</div>
  <h1 class="hero-title">
    Buku Bekas,<br/><em>Nilai Baru.</em>
  </h1>
```

```css
/* css/pages.css, Baris 47–54 */
.hero-title {
  font-size: clamp(2.6rem, 4.5vw, 4.2rem); /* responsif: min 2.6rem, ideal 4.5vw, max 4.2rem */
  font-weight: 900;
  color: var(--black);
  line-height: 1.04;
}
.hero-title em { display: block; } /* <em> ditampilkan sebagai baris baru */
```

> **Penjelasan:** `clamp(min, ideal, max)` adalah fungsi CSS modern untuk ukuran font **responsif otomatis** — font mengecil di layar kecil, membesar di layar besar, tanpa perlu media query. Tag `<em>` di dalam judul secara default *italic*, tapi kita ubah menjadi `display: block` agar turun ke baris baru + warnanya jadi coklat gelap.

#### Search Bar Hero
```html
<!-- index.html, Baris 42–48 -->
<div class="search-bar">
  <i class="fa fa-search"></i>
  <input type="text" id="heroSearch"
    placeholder="Cari buku, mata kuliah, atau nama dosen..."
    onkeydown="if(event.key==='Enter')goSearch()"/>
  <button class="search-btn" onclick="goSearch()">Cari Buku</button>
</div>
```

```javascript
// index.html, Baris 282–285
function goSearch() {
  const q = document.getElementById('heroSearch').value.trim();
  window.location.href = `pages/catalog.html?q=${encodeURIComponent(q)}`;
}
```

> **Penjelasan:** `onkeydown="if(event.key==='Enter')goSearch()"` memungkinkan pengguna menekan Enter untuk mencari, bukan hanya klik tombol. Fungsi `goSearch()` mengambil nilai input lalu **berpindah halaman** ke `catalog.html` dengan query search di URL (`?q=...`). `encodeURIComponent()` mengubah karakter spesial (spasi, &, dll) menjadi format aman untuk URL.

#### Quick Tags (Pintasan Pencarian)
```html
<!-- index.html, Baris 50–57 -->
<div class="hero-quick-tags">
  <span class="quick-tag" onclick="goSearchQuery('Kalkulus')">Kalkulus</span>
  <span class="quick-tag" onclick="goSearchQuery('Fisika')">Fisika Dasar</span>
  <!-- ... -->
</div>
```

```javascript
// index.html, Baris 286–288
function goSearchQuery(q) {
  window.location.href = `pages/catalog.html?q=${encodeURIComponent(q)}`;
}
```

> **Penjelasan:** Quick tags adalah tombol pintasan — ketika diklik langsung membuka katalog dengan filter pencarian tertentu. Ini meningkatkan **UX** karena pengguna tidak perlu mengetik kata umum.

#### Buku Mengambang (Floating Books Visual)
```html
<!-- index.html, Baris 65–72 -->
<div class="hero-visual anim-fadeUp anim-d3">
  <div class="books-float">
    <div class="float-book fb-1"><span>Kalkulus</span></div>
    <div class="float-book fb-2"><span>Fisika Dasar</span></div>
    <div class="float-book fb-3"><span>Algoritma</span></div>
    <div class="float-book fb-4"><span>Ekonomi Mikro</span></div>
  </div>
</div>
```

```css
/* css/pages.css, Baris 86–115 */
.books-float {
  position: relative;
  width: 300px; height: 380px; /* kotak pembatas */
}
.float-book {
  position: absolute;          /* posisi bebas di dalam .books-float */
  width: 175px; height: 235px;
  border-radius: 4px 14px 14px 4px; /* sudut kiri rata, kanan membulat = bentuk punggung buku */
}
/* Setiap buku punya posisi, warna, rotasi, dan animasi berbeda */
.fb-1 { background: var(--coffee); top:0;   left:0;    transform: rotate(-7deg); animation: f1 4.5s ease-in-out infinite; }
.fb-2 { background: var(--almond); top:28px;left:58px; transform: rotate(4deg);  animation: f2 5.5s ease-in-out infinite; }
.fb-3 { background: var(--taupe);  top:8px; left:100px;transform: rotate(-3deg); animation: f3 6.5s ease-in-out infinite; }
.fb-4 { background: var(--almond-mid); top:55px; left:18px; transform: rotate(6deg); }

/* Efek hover: buku tegak lurus dan naik saat di-hover */
.float-book:hover {
  transform: rotate(0deg) translateY(-14px) scale(1.06) !important;
  z-index: 10 !important;
}

/* Animasi mengambang naik-turun */
@keyframes f1 { 0%,100%{transform:rotate(-7deg)translateY(0)} 50%{transform:rotate(-7deg)translateY(-11px)} }
```

> **Penjelasan:** Empat buku ditumpuk dengan `position: absolute` di dalam kontainer relatif, masing-masing digeser berbeda (top, left). `border-radius: 4px 14px 14px 4px` meniru bentuk punggung buku nyata — sudut kiri tajam (tempat dijilid), sudut kanan membulat. Setiap buku animasi naik-turun dengan durasi berbeda (4.5s, 5.5s, 6.5s) sehingga gerakannya tidak sinkron — terlihat lebih alami.

---

### 2.3 Stats Strip (Angka Animasi)

**📄 File HTML:** `index.html` — **Baris 75–98**
**📄 File CSS:** `css/pages.css` — **Baris 117–143**
**📄 File JS:** `index.html` — **Baris 263–279** (di dalam `<script>`)

```html
<!-- index.html, Baris 79 -->
<span class="stat-num" data-target="2400">0</span>
```

```javascript
// index.html, Baris 264–279
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // abaikan jika belum terlihat
    entry.target.querySelectorAll('.stat-num').forEach(el => {
      const target = +el.dataset.target; // ambil angka tujuan dari data-target="2400"
      let cur = 0, step = target / 60;   // bagi 60 langkah
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString(); clearInterval(t); }
        else el.textContent = Math.floor(cur).toLocaleString();
      }, 22); // update setiap 22ms ≈ 60fps
    });
    statsObs.unobserve(entry.target); // hanya animasi sekali
  });
}, { threshold: 0.3 }); // trigger saat 30% elemen terlihat
```

> **Penjelasan:** `IntersectionObserver` adalah API browser yang mendeteksi apakah suatu elemen masuk ke area tampilan (viewport). Angka dimulai dari 0 dan naik bertahap ke angka target (`data-target`). Ini disebut **counter animation on scroll** — angka baru bergerak saat pengguna menggulir ke bagian statistik, bukan saat halaman pertama dimuat.

---

### 2.4 Kategori

**📄 File HTML:** `index.html` — **Baris 100–150**
**📄 File CSS:** `css/pages.css` — **Baris 145–168**

```html
<!-- index.html, Baris 108 -->
<div class="cat-card" onclick="goCat('Teknik & Sains')">
  <div class="cat-emoji">⚗️</div>
  <h3>Teknik & Sains</h3>
  <p>324 buku</p>
</div>
```

```css
/* css/pages.css, Baris 146–168 */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  /* auto-fill: isi kolom sebanyak mungkin; minmax: minimal 170px, maksimal 1fr */
  gap: 14px;
}
.cat-card:hover {
  border-color: var(--coffee);
  background: var(--almond-light);
  transform: translateY(-4px);    /* naik 4px saat hover */
  box-shadow: var(--shadow-md);   /* bayangan muncul */
}
```

```javascript
// index.html, Baris 289–291
function goCat(cat) {
  window.location.href = `pages/catalog.html?cat=${encodeURIComponent(cat)}`;
}
```

> **Penjelasan:** `grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))` adalah pola grid responsif otomatis — browser akan mengisi kolom sebanyak yang muat, dengan lebar minimum 170px. Di layar lebar muat 6 kolom, di layar mobile mungkin 2–3 kolom, **tanpa perlu media query**. Klik kartu memanggil `goCat()` yang membuka katalog dengan filter kategori.

---

### 2.5 Featured Books (Buku Terbaru)

**📄 File HTML:** `index.html` — **Baris 152–161**
**📄 File JS:** `index.html` — **Baris 257–261** + `js/data.js` — **Baris 234–266**

```html
<!-- index.html, Baris 159 -->
<div class="books-grid" id="featuredGrid"></div>
<!-- Grid kosong, diisi oleh JavaScript -->
```

```javascript
// index.html, Baris 258–261
const grid = document.getElementById('featuredGrid');
AppState.books.slice(0, 8).forEach(b => {  // ambil 8 buku pertama
  grid.innerHTML += buildBookCard(b, '');   // tambahkan kartu HTML ke grid
});
```

```javascript
// js/data.js, Baris 235–266 — fungsi buildBookCard
function buildBookCard(book, pathPrefix='') {
  const inWish = AppState.wishlist.some(w => w.id === book.id); // cek apakah di wishlist
  return `
    <div class="book-card" onclick="window.location='${pathPrefix}pages/detail.html?id=${book.id}'">
      <div class="book-card-visual">
        <div class="book-spine" style="background:${book.clr}">
          <span style="color:${book.tcl}">${book.title}</span>
        </div>
        <span class="card-type-badge ${typeBadgeClass(book.type)}">${book.type}</span>
        <button class="card-wish-btn ${inWish?'in-wish':''}"
          onclick="handleWishToggle(event,${book.id},this)">
          ${inWish?'❤️':'🤍'}
        </button>
      </div>
      ...
    </div>
  `;
}
```

> **Penjelasan:** `buildBookCard()` adalah **template function** — menerima data satu buku, mengembalikan string HTML kartu lengkap. Warna cover buku (`book.clr`, `book.tcl`) disimpan di data buku itu sendiri, sehingga setiap buku punya warna unik. `e.stopPropagation()` pada tombol wish mencegah event klik "merembet" ke kartu induk (yang akan membuka halaman detail).

---

### 2.6 Cara Kerjanya

**📄 File HTML:** `index.html` — **Baris 163–192**
**📄 File CSS:** `css/pages.css` — **Baris 176–194**

```html
<!-- index.html, Baris 170–174 -->
<div class="step-card">
  <div class="step-num">01</div>
  <h3>Daftar Gratis</h3>
  <p>Buat akun dengan email kampusmu...</p>
</div>
```

```css
/* css/pages.css, Baris 182–184 */
.step-card {
  border-left: 3px solid var(--almond-mid); /* garis aksen di sisi kiri */
  padding: 28px 22px;
}
.step-num {
  font-size: 2.8rem; font-weight: 900;
  color: var(--almond-mid); /* nomor besar tapi warna redup = dekoratif */
}
```

> **Penjelasan:** Efek visual "langkah" dibuat hanya dengan `border-left: 3px solid` — garis tipis di kiri kartu. Angka besar (`2.8rem`) berwarna redup (`almond-mid`) berfungsi dekoratif, sementara judul langkah (`h3`) menjadi fokus utama.

---

### 2.7 Request Banner

**📄 File HTML:** `index.html` — **Baris 194–203**
**📄 File CSS:** `css/pages.css` — **Baris 196–208**

```html
<!-- index.html, Baris 195–203 -->
<div class="request-strip">
  <div class="request-strip-inner">
    <div>
      <h2>Tidak menemukan buku yang dicari?</h2>
      <p>Pasang permintaan wishlist dan kami bantu carikan...</p>
    </div>
    <a href="pages/wishlist.html" class="btn-primary lg">
      <i class="fa fa-bell"></i> Pasang Permintaan
    </a>
  </div>
</div>
```

```css
/* css/pages.css, Baris 197–208 */
.request-strip { background: var(--coffee); padding: 60px 6%; }
.request-strip-inner {
  display: flex;
  justify-content: space-between; /* teks di kiri, tombol di kanan */
  align-items: center;
  flex-wrap: wrap; /* di layar kecil: pindah ke bawah */
}
/* Override: tombol di section gelap pakai warna sebaliknya */
.request-strip .btn-primary { background: var(--almond); color: var(--coffee); }
.request-strip .btn-primary:hover { background: var(--snow); }
```

> **Penjelasan:** Banner ini menggunakan background gelap (`var(--coffee)`) sebagai **kontras visual** untuk memisahkan section. Warna tombol dibalik — yang biasanya putih-di-gelap, kini jadi almond-di-gelap — karena background sudah gelap. `flex-wrap: wrap` memungkinkan teks dan tombol pindah ke baris berbeda di layar mobile.

---

### 2.8 Testimonial

**📄 File HTML:** `index.html` — **Baris 205–238**
**📄 File CSS:** `css/pages.css` — **Baris 210–227**

```html
<!-- index.html, Baris 212–219 -->
<div class="testi-card">
  <div class="testi-stars">★★★★★</div>
  <p>"Hemat 200rb buat buku Kalkulus Stewart!..."</p>
  <div class="testi-author">
    <!-- Avatar dari layanan DiceBear — dibuat otomatis berdasarkan nama -->
    <img src="https://api.dicebear.com/7.x/initials/svg?seed=Rina&backgroundColor=F1DABF&textColor=362417" alt="Rina"/>
    <div>
      <strong>Rina S.</strong>
      <span>Teknik Sipil, UNSOED</span>
    </div>
  </div>
</div>
```

> **Penjelasan:** Avatar testimonial menggunakan API **DiceBear** — layanan gratis yang menghasilkan gambar SVG avatar inisial secara otomatis dari parameter URL. `seed=Rina` = nama orang, `backgroundColor=F1DABF` = warna latar, `textColor=362417` = warna teks. Tidak perlu upload foto!

---

### 2.9 Footer

**📄 File:** `js/data.js` — **Baris 193–232** (fungsi `buildFooter`)
**📄 Style:** `css/components.css` — **Baris (seksi footer)**

```javascript
// js/data.js, Baris 193
function buildFooter() {
  return `
    <footer class="footer">
      <div class="footer-top"> <!-- Grid 4 kolom: brand + 3 kolom link -->
        <div class="footer-brand">...</div>
        <div class="footer-col"><h4>Platform</h4>...</div>
        <div class="footer-col"><h4>Dukungan</h4>...</div>
        <div class="footer-col"><h4>Legal</h4>...</div>
      </div>
      <div class="footer-bottom">...</div> <!-- Copyright -->
    </footer>
  `;
}
```

> **Penjelasan:** Seperti navbar, footer juga dibuat dinamis oleh fungsi JavaScript agar konsisten di semua halaman. Di `index.html` dipanggil dengan `buildFooter()`, hasilnya di-inject ke `div#footerMount`.

---

## 3. Halaman Login

**📄 File:** `pages/login.html`

### Layout Dua Kolom
**Baris 1–10 (CSS)** | **`css/pages.css` Baris 229–302**

```html
<!-- pages/login.html, Baris 23 -->
<div class="auth-layout">
  <!-- Kiri: Panel branding dengan warna gelap -->
  <div class="auth-side">...</div>
  <!-- Kanan: Form login -->
  <div class="auth-form-side">...</div>
</div>
```

```css
/* css/pages.css, Baris 229–234 */
.auth-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr; /* setengah-setengah */
}
.auth-side {
  background: var(--coffee); /* panel kiri gelap */
  padding: 60px;
}
```

> **Penjelasan:** Halaman auth menggunakan grid 50/50. Panel kiri berisi branding dan statistik (memperkuat kepercayaan), panel kanan berisi form. Di mobile, panel kiri disembunyikan (`display: none`) karena terlalu sempit.

### Validasi Login
```javascript
// pages/login.html, Baris (fungsi doLogin)
function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;

  if (!email || !pass) { showToast('⚠️ Isi semua field'); return; }
  if (!email.includes('@')) { showToast('⚠️ Format email tidak valid'); return; }
  if (pass.length < 4)  { showToast('⚠️ Password terlalu pendek'); return; }

  // Simpan user ke state dan localStorage
  AppState.user = { name: ..., email, campus: 'UNSOED Purwokerto' };
  localStorage.setItem('bc_user', JSON.stringify(AppState.user));

  // Redirect ke halaman tujuan atau dashboard
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  window.location.href = redirect || 'dashboard.html';
}
```

> **Penjelasan:** Validasi dilakukan bertahap — jika satu kondisi gagal, fungsi berhenti (`return`) dan menampilkan pesan error via `showToast()`. Setelah berhasil login, data user disimpan di `localStorage` agar tetap ada meski browser ditutup. Parameter `?redirect=` di URL digunakan untuk mengembalikan pengguna ke halaman yang ingin mereka akses sebelum login.

### Toggle Tampil/Sembunyikan Password
```html
<!-- pages/login.html -->
<div style="position:relative">
  <input type="password" id="loginPass" style="padding-right:42px"/>
  <button onclick="togglePassVis('loginPass', this)">
    <i class="fa fa-eye"></i>
  </button>
</div>
```

```javascript
// js/app.js
function togglePassVis(inputId, btn) {
  const inp = document.getElementById(inputId);
  inp.type  = inp.type === 'password' ? 'text' : 'password'; // ganti tipe input
  const icon = btn.querySelector('i');
  icon.className = inp.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
}
```

> **Penjelasan:** Trik sederhana — input `type="password"` menampilkan titik-titik, input `type="text"` menampilkan teks biasa. Dengan toggle tipe input, kita bisa membuat fitur "lihat password" tanpa library tambahan.

---

## 4. Halaman Register

**📄 File:** `pages/register.html`

### Indikator Kekuatan Password
**Baris (fungsi checkStrength)**

```javascript
// pages/register.html
function checkStrength(val) {
  let score = 0;
  if (val.length >= 8)          score++; // panjang cukup
  if (/[A-Z]/.test(val))        score++; // ada huruf besar
  if (/[0-9]/.test(val))        score++; // ada angka
  if (/[^A-Za-z0-9]/.test(val)) score++; // ada karakter spesial

  const levels = [
    { pct:'0%',   color:'transparent', label:'' },
    { pct:'25%',  color:'#e74c3c',     label:'Lemah' },
    { pct:'50%',  color:'#f39c12',     label:'Cukup' },
    { pct:'75%',  color:'#2ecc71',     label:'Kuat' },
    { pct:'100%', color:'#27ae60',     label:'Sangat Kuat' },
  ];
  // Update progress bar dan teks
  fill.style.width      = levels[score].pct;
  fill.style.background = levels[score].color;
  text.textContent      = levels[score].label;
}
```

> **Penjelasan:** Fungsi ini menggunakan **regular expression (regex)** untuk mendeteksi karakteristik password. `/[A-Z]/` cocok dengan huruf besar, `/[0-9]/` cocok dengan angka, `/[^A-Za-z0-9]/` cocok dengan karakter yang BUKAN huruf/angka (simbol). Skor 0–4 menentukan warna dan lebar progress bar.

---

## 5. Halaman Katalog

**📄 File:** `pages/catalog.html`
**📄 Style:** `css/pages.css` — **Baris 304–414**

### Layout Sidebar + Main
```css
/* css/pages.css, Baris 304–309 */
.catalog-layout {
  display: flex;          /* sidebar dan main berdampingan */
  padding-top: 66px;      /* beri ruang untuk navbar fixed */
  min-height: 100vh;
}
/* Filter sidebar menempel saat scroll */
.filter-panel {
  width: 268px;
  position: sticky;
  top: 66px;              /* menempel tepat di bawah navbar */
  height: calc(100vh - 66px); /* tinggi = layar - navbar */
  overflow-y: auto;       /* bisa di-scroll sendiri jika filter banyak */
}
```

> **Penjelasan:** `position: sticky` pada sidebar membuat panel filter "menempel" saat konten di-scroll, tapi tetap di dalam kontainer parent. `calc(100vh - 66px)` menghitung tinggi tepat — total tinggi layar dikurangi tinggi navbar. Hasilnya sidebar bisa di-scroll secara independen.

### Logika Filter Buku
```javascript
// pages/catalog.html (fungsi applyFilters)
function applyFilters() {
  const q   = document.getElementById('fSearch').value.toLowerCase();
  const cat = document.getElementById('fCategory').value;
  // ...ambil semua nilai filter...

  filteredBooks = AppState.books.filter(b => {
    // Cocokkan pencarian dengan judul, penulis, mata kuliah, atau dosen
    const matchQ = !q || [b.title, b.author, b.course, b.lecturer]
                          .some(s => s.toLowerCase().includes(q));
    const matchCat  = !cat || b.category === cat;
    const matchType = types.length === 0 || types.includes(b.type);
    const matchCond = conds.length === 0 || conds.includes(b.condition);
    const matchP    = b.type !== 'Dijual' || (b.price >= pMin && b.price <= pMax);

    return matchQ && matchCat && matchType && matchCond && matchP;
    // Semua kondisi harus terpenuhi (AND logic)
  });
  renderPage();
}
```

> **Penjelasan:** `Array.filter()` membuat array baru hanya berisi buku yang lolos semua kondisi. `.some()` digunakan untuk mengecek apakah kata kunci ada di SALAH SATU dari beberapa field (judul, penulis, dosen) — cukup satu yang cocok. Jika filter kosong (`!q`, `types.length === 0`), kondisi dianggap lolos otomatis.

### Pagination Dinamis
```javascript
// pages/catalog.html (fungsi renderPage)
const total = filteredBooks.length;
const start = (currentPage - 1) * PER_PAGE;  // PER_PAGE = 12
const slice = filteredBooks.slice(start, start + PER_PAGE); // ambil 12 buku

// Buat tombol halaman
for (let i = 1; i <= totalPages; i++) {
  if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
    pgHTML += `<button class="${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
  } else if (Math.abs(i - currentPage) === 2) {
    pgHTML += `<button disabled>…</button>`; // ellipsis
  }
}
```

> **Penjelasan:** `slice(start, start + PER_PAGE)` mengambil potongan array dari indeks tertentu. Logika pagination pintar: selalu tampilkan halaman pertama, terakhir, dan yang dekat dengan halaman aktif — sisanya diganti `…` untuk menghemat ruang.

---

## 6. Halaman Detail Buku

**📄 File:** `pages/detail.html`
**📄 Style:** `css/pages.css` — **Baris 416–500**

### Baca ID dari URL
```javascript
// pages/detail.html
const bookId  = +getParam('id');    // ambil ?id=5 dari URL, konversi ke number
const openChat = getParam('chat') === '1'; // apakah harus buka chat langsung?

// js/data.js
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}
```

> **Penjelasan:** `URLSearchParams` adalah API bawaan browser untuk membaca parameter URL. `+getParam('id')` — tanda `+` di depan mengonversi string `"5"` menjadi number `5`. Jika URL mengandung `?chat=1`, panel chat akan otomatis terbuka.

### Layout Detail Grid
```css
/* css/pages.css, Baris 422–428 */
.detail-grid {
  display: grid;
  grid-template-columns: 380px 1fr; /* kolom kiri fixed 380px, kanan fleksibel */
  gap: 48px;
}
.detail-cover-panel {
  position: sticky;   /* cover buku menempel saat info panjang di-scroll */
  top: 90px;
}
```

> **Penjelasan:** Kolom kiri punya lebar tetap (`380px`) karena cover buku tidak perlu berubah ukuran. Kolom kanan (`1fr`) mengisi sisa ruang. `position: sticky` pada panel cover membuat gambar buku tetap terlihat saat pengguna membaca deskripsi panjang.

### Thumbnail Interaktif (Ganti Warna Cover)
```javascript
// pages/detail.html
function selectThumb(el, bg) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');                          // highlight thumb aktif
  document.getElementById('mainCover').style.background = bg; // ganti warna cover
}
```

> **Penjelasan:** Karena buku tidak punya foto nyata, simulasi galeri dibuat dengan mengubah warna background cover. Tiga thumbnail dengan nuansa warna berbeda dari buku yang sama — klik thumbnail mengubah warna cover utama secara langsung melalui JavaScript.

---

## 7. Halaman Jual Buku

**📄 File:** `pages/sell.html`

### Multi-Step Form (4 Langkah)
```javascript
// pages/sell.html (fungsi goStep)
function goStep(n) {
  // Validasi sebelum maju ke langkah berikutnya
  if (n > currentStep) {
    if (currentStep === 1) {
      if (!document.getElementById('sTitle').value.trim()) {
        showToast('⚠️ Judul buku wajib diisi'); return;
      }
    }
    if (currentStep === 2) {
      const cond = document.querySelector('input[name="cond"]:checked');
      if (!cond) { showToast('⚠️ Pilih kondisi buku'); return; }
    }
  }
  // Sembunyikan langkah lama, tampilkan langkah baru
  document.getElementById('step' + currentStep).classList.remove('active');
  currentStep = n;
  document.getElementById('step' + currentStep).classList.add('active');
  updateStepUI(); // perbarui indikator progress
}
```

```css
/* pages/sell.html <style> */
.form-step         { display: none; }  /* semua langkah tersembunyi */
.form-step.active  { display: block; animation: fadeUp .4s; } /* kecuali yang aktif */
```

> **Penjelasan:** Semua 4 langkah form ada di HTML sekaligus, tapi hanya yang memiliki class `.active` yang ditampilkan. Pindah langkah = hapus `.active` dari yang lama, tambahkan ke yang baru. Validasi dilakukan sebelum mengizinkan maju ke langkah berikutnya.

### Live Preview Listing
```javascript
// pages/sell.html (fungsi updatePreview)
function updatePreview() {
  const d = getFormData(); // kumpulkan semua nilai form
  const side = document.getElementById('sidePreview');
  if (!d.title) {
    side.innerHTML = '<p>Mulai isi form untuk melihat preview</p>';
    return;
  }
  // Render kartu mini dari data form
  side.innerHTML = `
    <div class="preview-mini-title">${d.title}</div>
    <div class="preview-mini-price">Rp ${d.price.toLocaleString('id-ID')}</div>
  `;
}
// Dipanggil setiap kali input berubah: oninput="updatePreview()"
```

> **Penjelasan:** Preview real-time membantu pengguna melihat hasil sebelum publish. Setiap kali pengguna mengetik (`oninput`), fungsi `updatePreview()` dipanggil ulang dan merender ulang preview. Ini adalah pola **reactive UI** sederhana tanpa framework.

---

## 8. Halaman Wishlist

**📄 File:** `pages/wishlist.html`

### Sistem Tab
```javascript
// pages/wishlist.html
let activeTab = 'saved';

function switchTab(tab, btn) {
  activeTab = tab;
  // Hapus 'active' dari semua tombol, tambahkan ke yang diklik
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Sembunyikan semua konten, tampilkan yang sesuai
  document.getElementById('tab-saved').style.display = tab === 'saved' ? 'block' : 'none';
  document.getElementById('tab-mine').style.display  = tab === 'mine'  ? 'block' : 'none';
  document.getElementById('tab-all').style.display   = tab === 'all'   ? 'block' : 'none';
}
```

> **Penjelasan:** Sistem tab manual tanpa library — semua konten tab ada di HTML, tapi hanya satu yang `display: block` pada satu waktu. Pola ini lebih sederhana dari framework tapi sangat efektif untuk 2–5 tab.

---

## 9. Data & State Management

**📄 File:** `js/data.js`

### AppState — Pusat Data Aplikasi
```javascript
// js/data.js, Baris (AppState object)
const AppState = {
  books: [...BOOKS],  // semua data buku
  user: null,         // data pengguna yang login
  cart: [],           // isi keranjang
  wishlist: [],       // buku yang disimpan
  myRequests: [],     // permintaan buku yang dipasang

  init() { /* baca dari localStorage saat halaman dimuat */ },
  save() { /* simpan ke localStorage setiap ada perubahan */ },
  logout() { /* hapus data user dari state dan localStorage */ }
};
AppState.init(); // dipanggil otomatis saat data.js dimuat
```

> **Penjelasan:** `AppState` adalah **single source of truth** — semua data aplikasi disimpan di satu objek ini. `localStorage` digunakan untuk persistensi data antar sesi browser (tutup-buka browser data tetap ada). Pola ini mirip konsep **Redux** tapi versi sederhana tanpa library.

### Data Buku
```javascript
// js/data.js, Baris 1–70 (contoh satu entri)
const BOOKS = [
  {
    id: 1,
    title: 'Kalkulus Edisi 9',
    author: 'James Stewart',
    category: 'Teknik & Sains',
    course: 'Kalkulus 1 & 2',      // digunakan untuk filter mata kuliah
    lecturer: 'Dr. Bambang S.',     // digunakan untuk filter dosen
    condition: 'Seperti Baru',      // Seperti Baru | Cukup Baik | Ada Coretan | Fotokopi
    type: 'Dijual',                 // Dijual | Ditukar | Donasi
    price: 85000,
    location: 'UNSOED Purwokerto',
    seller: 'Rizky A.',
    clr: '#362417',                 // warna cover buku
    tcl: '#F1DABF',                 // warna teks di cover
    desc: 'Kondisi masih sangat bagus...',
  },
  // ... 17 buku lainnya
];
```

> **Penjelasan:** Data buku disimpan sebagai array of objects di JavaScript (bukan database). Setiap buku punya field `clr` dan `tcl` (text color) untuk menentukan tampilan cover visual yang unik. Di produksi nyata, data ini akan datang dari API/database, tapi untuk prototype ini cukup dari file JS.

---

## 10. Auth Management

**📄 File:** `js/auth.js`

### Proteksi Halaman
```javascript
// js/auth.js
const Auth = {
  requireAuth(redirectAfter) {
    if (!this.check()) {
      // Simpan halaman tujuan di URL, redirect ke login
      const target = redirectAfter || window.location.pathname;
      window.location.href = `login.html?redirect=${encodeURIComponent(target)}`;
      return false;
    }
    return true;
  }
};

// Contoh penggunaan di pages/sell.html:
if (!Auth.check()) window.location.href = 'login.html?redirect=sell.html';
```

> **Penjelasan:** Halaman yang memerlukan login (jual buku, dashboard, dll.) langsung cek di awal. Jika belum login, redirect ke halaman login dengan menyertakan URL tujuan sebagai parameter. Setelah login berhasil, pengguna diarahkan kembali ke halaman yang ingin mereka tuju.

---

## 11. App Logic

**📄 File:** `js/app.js`

### Sistem Chat Inline
```javascript
// js/app.js
const ChatState = {
  threads: {},  // menyimpan riwayat chat per buku: { bookId: [{text, sent}] }
  autoReplies: ['Masih tersedia!', 'Bisa COD di kampus', ...],

  getThread(id) { /* buat thread baru jika belum ada */ },
  addMsg(id, text, sent) { /* tambah pesan ke thread */ },
  autoReply(id) { /* pilih reply acak dari autoReplies */ }
};

function openChatPanel(bookId) {
  // Seed pesan pertama jika baru pertama kali chat
  if (ChatState.getThread(bookId).length === 0) {
    ChatState.addMsg(bookId, `Halo! Apakah "${book.title}" masih tersedia?`, true);
    setTimeout(() => {
      ChatState.autoReply(bookId); // balas otomatis setelah 900ms
      renderChatMessages(bookId);
    }, 900);
  }
  // Tampilkan panel chat
  document.getElementById('chatPanel').classList.remove('hidden');
}
```

> **Penjelasan:** Sistem chat adalah **simulasi** — tidak ada server sungguhan. Pesan disimpan di objek `ChatState.threads` (dalam memori, bukan database). Auto-reply dipilih secara acak dari array `autoReplies` dengan delay 900ms untuk mensimulasikan "orang yang sedang mengetik". `setTimeout()` digunakan untuk menciptakan jeda yang realistis.

### Toast Notification
```javascript
// js/data.js (fungsi showToast)
let _toastTimer;
function showToast(msg, duration=3000) {
  let t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');       // picu animasi muncul
  clearTimeout(_toastTimer);     // batalkan timer sebelumnya (jika ada)
  _toastTimer = setTimeout(() => {
    t.classList.remove('show');  // sembunyikan setelah 3 detik
  }, duration);
}
```

```css
/* css/main.css, Baris 102–122 */
.toast {
  position: fixed;
  bottom: 28px; left: 50%;
  transform: translateX(-50%) translateY(120px); /* default: tersembunyi di bawah */
  transition: transform 0.28s ease;
}
.toast.show {
  transform: translateX(-50%) translateY(0); /* muncul ke atas saat .show aktif */
}
```

> **Penjelasan:** Toast adalah notifikasi kecil yang muncul sementara. Trik utamanya: elemen selalu ada di DOM, tapi `translateY(120px)` membuatnya "bersembunyi" di luar layar bagian bawah. Menambah class `.show` menggesernya ke `translateY(0)` — muncul ke tampilan. CSS `transition` membuat gerakan ini mulus. `clearTimeout` mencegah timer sebelumnya mengganggu jika toast baru dipanggil sebelum yang lama selesai.

---

## Ringkasan Arsitektur

```
index.html  →  js/data.js (AppState, buildNavbar, buildFooter, buildBookCard)
                         ↓
pages/*.html  →  js/auth.js (Auth.check, requireAuth)
                         ↓
              js/app.js (ChatState, sendChat, togglePassVis)
                         ↓
              css/main.css (variabel, reset, animasi)
              css/components.css (navbar, tombol, kartu, form)
              css/pages.css (layout per halaman)
```

| Konsep | Teknik yang Dipakai | File |
|--------|--------------------|----|
| State management | Plain JS Object + localStorage | `js/data.js` |
| Dynamic HTML | Template string + innerHTML | `js/data.js` |
| Auth guard | Cek di awal halaman + redirect | `js/auth.js` |
| Animasi scroll | IntersectionObserver | `index.html` |
| Filter buku | Array.filter() + URLSearchParams | `catalog.html` |
| Multi-step form | Class toggle (active/hidden) | `sell.html` |
| Toast notification | CSS transform toggle | `js/data.js` |
| Responsive layout | CSS Grid + Flexbox + clamp() | semua CSS |

---

*Dokumentasi ini mencakup seluruh halaman dan komponen utama website BookCircle.*
*Setiap perubahan pada kode dapat dilacak kembali ke file dan baris yang tercantum di sini.*
