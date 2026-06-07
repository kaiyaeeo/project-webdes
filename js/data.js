    /* =====================================================
    data.js — Data Buku, State Global, Helper Functions
    BookCircle Platform
    ===================================================== */

    const BOOKS = [
    { id:1,  title:'Kalkulus Edisi 9',             author:'James Stewart',        category:'Teknik & Sains',   course:'Kalkulus 1 & 2',        lecturer:'Dr. Bambang S.',   condition:'Seperti Baru', type:'Dijual',  price:85000,  location:'UNSOED Purwokerto', seller:'Rizky A.',  sellerId:'u1',  desc:'Kondisi masih sangat bagus, tidak ada coretan. Lengkap beserta solusi manual di akhir bab.',  clr:'#362417', tcl:'#F1DABF' },
    { id:2,  title:'Fisika Dasar Vol. 2',           author:'Halliday & Resnick',   category:'Teknik & Sains',   course:'Fisika Dasar 2',         lecturer:'Prof. Hartono',    condition:'Ada Coretan',  type:'Dijual',  price:60000,  location:'UNSOED Purwokerto', seller:'Sari W.',   sellerId:'u2',  desc:'Ada beberapa stabilo di Bab 1–3, sisanya bersih. Sangat berguna karena ada banyak highlight poin penting.',  clr:'#92817A', tcl:'#FFFBFF' },
    { id:3,  title:'Algoritma & Pemrograman C++',  author:'Abdul Kadir',          category:'Teknik & Sains',   course:'Dasar Pemrograman',      lecturer:'Bpk. Eko P.',      condition:'Cukup Baik',   type:'Ditukar', price:0,      location:'UGM Yogyakarta',    seller:'Budi P.',   sellerId:'u3',  desc:'Mau ditukar dengan buku Struktur Data atau Basis Data edisi berapa pun oke.',  clr:'#5C3D28', tcl:'#F9EFE3' },
    { id:4,  title:'Pengantar Ekonomi Mikro',       author:'N. Gregory Mankiw',    category:'Ekonomi & Bisnis', course:'Pengantar Ekonomi',      lecturer:'Dr. Susi H.',      condition:'Seperti Baru', type:'Dijual',  price:70000,  location:'UNDIP Semarang',    seller:'Dewi N.',   sellerId:'u4',  desc:'Beli baru, ternyata salah beli edisi. Kondisi masih mulus seperti baru.',  clr:'#F1DABF', tcl:'#362417' },
    { id:5,  title:'Hukum Perdata Indonesia',       author:'R. Subekti',           category:'Hukum',            course:'Hukum Perdata',          lecturer:'Prof. Anwar K.',   condition:'Ada Coretan',  type:'Dijual',  price:45000,  location:'UNSOED Purwokerto', seller:'Andi S.',   sellerId:'u5',  desc:'Banyak highlight penting di bab Perikatan, Jaminan, dan Wanprestasi. Berguna untuk belajar.',  clr:'#000500', tcl:'#F1DABF' },
    { id:6,  title:'Biokimia Harper Edisi 31',      author:'Victor W. Rodwell',    category:'Kedokteran',        course:'Biokimia',               lecturer:'Dr. Indah R.',     condition:'Fotokopi',     type:'Dijual',  price:40000,  location:'UNDIP Semarang',    seller:'Citra M.',  sellerId:'u6',  desc:'Fotokopi lengkap semua bab, kualitas cetak bagus dan terbaca. Dijilid spiral.',  clr:'#4A2E1A', tcl:'#F9EFE3' },
    { id:7,  title:'Catatan Statistika Dasar',      author:'Mahasiswa Statistika 2022', category:'Catatan Kuliah', course:'Statistika Dasar',    lecturer:'Ibu Ratna',        condition:'Seperti Baru', type:'Donasi',  price:0,      location:'UNSOED Purwokerto', seller:'Putri K.',  sellerId:'u7',  desc:'Catatan lengkap 14 pertemuan plus soal UTS & UAS. Semoga bermanfaat.',  clr:'#B09990', tcl:'#FFFBFF' },
    { id:8,  title:'Bahasa Inggris Akademik',       author:'Jeremy Harmer',        category:'Bahasa & Sastra',  course:'Bahasa Inggris',         lecturer:'Mrs. Sarah A.',    condition:'Cukup Baik',   type:'Dijual',  price:55000,  location:'UGM Yogyakarta',    seller:'Hendra W.', sellerId:'u8',  desc:'Kondisi cukup baik, ada sedikit coretan di bagian grammar exercise.',  clr:'#362417', tcl:'#FFFBFF' },
    { id:9,  title:'Akuntansi Keuangan Menengah',   author:'Kieso & Weygandt',     category:'Ekonomi & Bisnis', course:'Akuntansi Keuangan',     lecturer:'Dr. Fuad H.',      condition:'Seperti Baru', type:'Dijual',  price:95000,  location:'UNDIP Semarang',    seller:'Lina P.',   sellerId:'u9',  desc:'Edisi terbaru, masih sangat mulus. Dijual karena sudah lulus semester tersebut.',  clr:'#92817A', tcl:'#FFFBFF' },
    { id:10, title:'Mekanika Teknik Statika',       author:'R.C. Hibbeler',        category:'Teknik & Sains',   course:'Mekanika Teknik',        lecturer:'Ir. Joko S.',      condition:'Ada Coretan',  type:'Ditukar', price:0,      location:'ITB Bandung',       seller:'Fajar M.',  sellerId:'u10', desc:'Mau ditukar dengan buku Dinamika atau Kekuatan Material. Kondisi ada stabilo.',  clr:'#5C3D28', tcl:'#F1DABF' },
    { id:11, title:'Psikologi Umum',                author:'Rita L. Atkinson',     category:'Psikologi',         course:'Psikologi Dasar',        lecturer:'Dr. Mei A.',       condition:'Cukup Baik',   type:'Dijual',  price:50000,  location:'UI Jakarta',        seller:'Nita R.',   sellerId:'u11', desc:'Kondisi cukup baik, ada stabilo di bab awal (Sensasi dan Persepsi).',  clr:'#F1DABF', tcl:'#362417' },
    { id:12, title:'Ilmu Tanah Dasar',              author:'Henry D. Foth',        category:'Pertanian',         course:'Ilmu Tanah',             lecturer:'Prof. Sarwono',    condition:'Fotokopi',     type:'Donasi',  price:0,      location:'UNSOED Purwokerto', seller:'Tono B.',   sellerId:'u12', desc:'Fotokopi lengkap, donasi untuk adik tingkat jurusan Agronomi. Silakan diambil.',  clr:'#4A2E1A', tcl:'#F9EFE3' },
    { id:13, title:'Manajemen Pemasaran',           author:'Philip Kotler',        category:'Ekonomi & Bisnis', course:'Manajemen Pemasaran',    lecturer:'Bpk. David K.',    condition:'Seperti Baru', type:'Dijual',  price:80000,  location:'UNAIR Surabaya',    seller:'Yuni A.',   sellerId:'u13', desc:'Edisi 16, masih sangat bagus. Dijual karena sudah lulus mata kuliah ini.',  clr:'#362417', tcl:'#F1DABF' },
    { id:14, title:'Struktur Data & Algoritma',     author:'Robert Sedgewick',     category:'Teknik & Sains',   course:'Struktur Data',          lecturer:'Ibu Wulan P.',     condition:'Cukup Baik',   type:'Dijual',  price:65000,  location:'ITS Surabaya',      seller:'Dani H.',   sellerId:'u14', desc:'Sedikit lusuh di cover depan, isi masih lengkap dan bagus, tidak ada sobek.',  clr:'#000500', tcl:'#F9EFE3' },
    { id:15, title:'Farmakologi Dasar',             author:'Bertram G. Katzung',   category:'Kedokteran',        course:'Farmakologi',            lecturer:'Dr. Hani S.',      condition:'Ada Coretan',  type:'Dijual',  price:75000,  location:'UNDIP Semarang',    seller:'Mega S.',   sellerId:'u15', desc:'Banyak highlight penting untuk belajar. Berguna banget buat ujian blok.',  clr:'#92817A', tcl:'#FFFBFF' },
    { id:16, title:'Catatan Kalkulus 1 Lengkap',    author:'Komunitas Teknik 2021', category:'Catatan Kuliah',  course:'Kalkulus 1',             lecturer:'Bpk. Agus T.',     condition:'Seperti Baru', type:'Donasi',  price:0,      location:'UNSOED Purwokerto', seller:'Rini S.',   sellerId:'u16', desc:'Catatan lengkap beserta rumus kunci dan contoh soal UTS/UAS. Semoga bermanfaat.',  clr:'#B09990', tcl:'#FFFBFF' },
    { id:17, title:'Hukum Bisnis & Perusahaan',     author:'Ahmad Yani',           category:'Hukum',            course:'Hukum Bisnis',           lecturer:'Dr. Rizal M.',     condition:'Cukup Baik',   type:'Dijual',  price:48000,  location:'UNPAD Bandung',     seller:'Asep K.',   sellerId:'u17', desc:'Kondisi cukup baik, bergaris di beberapa tempat penting.',  clr:'#362417', tcl:'#FFFBFF' },
    { id:18, title:'Rangkuman Fisika Modern',       author:'Tim Asisten FIS 2020', category:'Catatan Kuliah',   course:'Fisika Modern',          lecturer:'Dr. Kusuma W.',    condition:'Fotokopi',     type:'Donasi',  price:0,      location:'UNS Solo',          seller:'Bagas P.',  sellerId:'u18', desc:'Rangkuman lengkap dengan gambar yang sudah dicetak bagus.',  clr:'#5C3D28', tcl:'#F9EFE3' },
    ];

    const SAMPLE_REQUESTS = [
    { id:1, title:'Kalkulus Stewart Edisi 9',    course:'Kalkulus 2',       budget:80000, note:'Butuh ASAP untuk UTS minggu depan!', by:'Ahmad F.', time:'2 jam lalu' },
    { id:2, title:'Hukum Pidana Indonesia',      course:'Hukum Pidana',     budget:50000, note:'Edisi apa saja oke, kondisi bersih preferred.', by:'Siti N.', time:'5 jam lalu' },
    { id:3, title:'Rangkuman Biokimia',          course:'Biokimia',         budget:0,     note:'Minta donasi ya, lagi bokek banget 😅', by:'Dito P.', time:'1 hari lalu' },
    { id:4, title:'Manajemen Operasi Edisi 12',  course:'Manajemen Operasi',budget:60000, note:'Buat tugas kelompok semester ini.', by:'Wida R.', time:'2 hari lalu' },
    ];

    // ===== APP STATE =====
    const AppState = {
    books: [...BOOKS],
    user: null,
    cart: [],
    wishlist: [],
    myRequests: [],

    get filteredBooks() { return this._filtered || [...this.books]; },
    set filteredBooks(v) { this._filtered = v; },

    init() {
        const u  = localStorage.getItem('bc_user');
        const c  = localStorage.getItem('bc_cart');
        const w  = localStorage.getItem('bc_wish');
        const r  = localStorage.getItem('bc_req');
        const ob = localStorage.getItem('bc_own_books');
        if (u)  this.user = JSON.parse(u);
        if (c)  this.cart = JSON.parse(c);
        if (w)  this.wishlist = JSON.parse(w);
        if (r)  this.myRequests = JSON.parse(r);
        if (ob) {
        const ownBooks = JSON.parse(ob);
        ownBooks.forEach(b => {
            if (!this.books.find(x => x.id === b.id)) this.books.unshift(b);
        });
        }
        this.filteredBooks = [...this.books];
    },

    save() {
        if (this.user) localStorage.setItem('bc_user', JSON.stringify(this.user));
        localStorage.setItem('bc_cart', JSON.stringify(this.cart));
        localStorage.setItem('bc_wish', JSON.stringify(this.wishlist));
        localStorage.setItem('bc_req',  JSON.stringify(this.myRequests));
        const own = this.books.filter(b => b.isOwn);
        if (own.length) localStorage.setItem('bc_own_books', JSON.stringify(own));
    },

    logout() {
        this.user = null;
        localStorage.removeItem('bc_user');
    }
    };

    // ===== HELPERS =====
    function condClass(c) {
    return { 'Seperti Baru':'cond-baru','Cukup Baik':'cond-baik','Ada Coretan':'cond-coretan','Fotokopi':'cond-fotokopi' }[c] || 'cond-baik';
    }
    function typeBadgeClass(t) {
    return { 'Dijual':'type-dijual','Ditukar':'type-ditukar','Donasi':'type-donasi' }[t] || 'type-dijual';
    }
    function priceDisplay(book, full=false) {
    if (book.type === 'Donasi')  return full ? '<span class="book-price free"><i class="fa-solid fa-gift"></i> Gratis</span>' : '<span class="book-price free">Gratis!</span>';
    if (book.type === 'Ditukar') return full ? '<span class="book-price swap"><i class="fa-solid fa-arrows-rotate"></i> Tukar</span>' : '<span class="book-price swap">Tukar</span>';
    return `<span class="book-price">Rp ${book.price.toLocaleString('id-ID')}</span>`;
    }
    function avatarUrl(name, bg='362417', fg='ffffff') {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${bg}&textColor=${fg}`;
    }
    function isLoggedIn() { return !!AppState.user; }
    function redirect(path) { window.location.href = path; }
    function getParam(key) { return new URLSearchParams(window.location.search).get(key); }

    // Toast (shared across all pages)
    let _toastTimer;
    function showToast(msg, duration=3000) {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.className = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => t.classList.remove('show'), duration);
    }

    // Inject navbar HTML (shared)
    // Tambahkan parameter `prefix` dengan nilai bawaan string kosong
    function buildNavbar(activePage, prefix = '') {
    const loggedIn = isLoggedIn();
    const u = AppState.user;
    const cartCount = AppState.cart.length;
    const wishCount = AppState.wishlist.length;

    // Gunakan prefix untuk menyesuaikan path
    const links = [
        { href: prefix + 'index.html',           label:'Beranda',   id:'home'      },
        { href: prefix + 'pages/catalog.html',   label:'Katalog',   id:'catalog'   },
        { href: prefix + 'pages/wishlist.html',  label:'Wishlist',  id:'wishlist'  },
        { href: prefix + 'index.html#tentang',   label:'Tentang',   id:'about'     },
    ];

    const linksHTML = links.map(l =>
        `<a href="${l.href}" class="${activePage===l.id?'active':''}">${l.label}</a>`
    ).join('');

    const rightHTML = loggedIn ? `
        <a href="${prefix}pages/cart.html" class="btn-icon" title="Keranjang">
        <i class="fa fa-shopping-bag"></i>
        <span class="nav-badge" id="cartBadge">${cartCount}</span>
        </a>
        <a href="${prefix}pages/wishlist.html" class="btn-icon" title="Wishlist">
        <i class="fa fa-heart"></i>
        <span class="nav-badge" id="wishBadge">${wishCount}</span>
        </a>
        <div class="user-avatar-wrap">
        <img src="${avatarUrl(u?.name || '')}" class="user-avatar" onclick="toggleDropdown()" alt="${u?.name || ''}"/>
        <div class="user-dropdown hidden" id="userDropdown">
            <a href="${prefix}pages/dashboard.html"><i class="fa fa-th-large"></i> Dashboard</a>
            <a href="${prefix}pages/sell.html"><i class="fa fa-plus-circle"></i> Jual Buku</a>
            <div class="dropdown-divider"></div>
            <a href="#" onclick="doLogout()"><i class="fa fa-sign-out-alt"></i> Keluar</a>
        </div>
        </div>
    ` : `
        <a href="${prefix}pages/cart.html" class="btn-icon" title="Keranjang">
        <i class="fa fa-shopping-bag"></i>
        <span class="nav-badge" id="cartBadge">${cartCount}</span>
        </a>
        <a href="${prefix}pages/login.html" class="btn-outline sm">Masuk</a>
        <a href="${prefix}pages/register.html" class="btn-primary sm">Daftar</a>
    `;

    const mobileLinks = links.map(l =>
        `<a href="${l.href}" class="${activePage===l.id?'active':''}">${l.label}</a>`
    ).join('');

    return `
        <nav class="navbar" id="navbar">
        <div class="nav-inner">
            <a href="${prefix}index.html" class="nav-logo">
            <span class="logo-star">✦</span> BookCircle
            </a>
            <button class="hamburger" id="hamburger" onclick="toggleMobileNav()" aria-label="Menu">
            <span></span><span></span><span></span>
            </button>
            <div class="nav-links">${linksHTML}</div>
            <div class="nav-right">${rightHTML}</div>
        </div>
        </nav>
        <div class="mobile-nav" id="mobileNav">
        ${mobileLinks}
        <div class="mobile-nav-divider"></div>
        ${loggedIn
            ? `<div class="mobile-nav-actions">
                <a href="${prefix}pages/dashboard.html" class="btn-outline sm full">Dashboard</a>
                <a href="#" onclick="doLogout()" class="btn-primary sm full">Keluar</a>
            </div>`
            : `<div class="mobile-nav-actions">
                <a href="${prefix}pages/login.html" class="btn-outline sm">Masuk</a>
                <a href="${prefix}pages/register.html" class="btn-primary sm">Daftar</a>
            </div>`}
        </div>
        <div class="toast" id="toast"></div>
    `;
    }

    function buildFooter(prefix = '') {
    return `
        <footer class="footer">
        <div class="footer-top">
            <div class="footer-brand">
            <div class="nav-logo"><span class="logo-star">✦</span> BookCircle</div>
            <p>Platform sirkulasi buku & catatan kuliah untuk mahasiswa Indonesia.</p>
            <div class="footer-socials">
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-tiktok"></i></a>
            </div>
            </div>
            <div class="footer-col">
            <h4>Platform</h4>
            <a href="${prefix}pages/catalog.html">Katalog Buku</a>
            <a href="${prefix}pages/sell.html">Jual Buku</a>
            <a href="${prefix}pages/wishlist.html">Wishlist</a>
            <a href="${prefix}pages/dashboard.html">Dashboard</a>
            </div>
            <div class="footer-col">
            <h4>Dukungan</h4>
            <a href="#">Cara Penggunaan</a>
            <a href="#">FAQ</a>
            <a href="#">Hubungi Kami</a>
            </div>
            <div class="footer-col">
            <h4>Legal</h4>
            <a href="#">Syarat & Ketentuan</a>
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Kebijakan Pengembalian</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2025 BookCircle. Dibuat dengan ✦ untuk mahasiswa Indonesia.</p>
            <p>Made with <span style="color:var(--almond)">♥</span></p>
        </div>
        </footer>
    `;
    }

    // Build a single book card HTML
    function buildBookCard(book, pathPrefix='') {
    const inWish = AppState.wishlist.some(w => w.id === book.id);
    return `
        <div class="book-card" onclick="window.location='${pathPrefix}pages/detail.html?id=${book.id}'">
        <div class="book-card-visual">
            <div class="book-spine" style="background:${book.clr}">
            <span style="color:${book.tcl}">${book.title}</span>
            </div>
            <span class="card-type-badge ${typeBadgeClass(book.type)}">${book.type}</span>
            <button class="card-wish-btn ${inWish?'in-wish':''}"
            onclick="handleWishToggle(event,${book.id},this)"
            title="${inWish?'Hapus Wishlist':'Simpan'}">
            ${inWish ? '<i class="fa-solid fa-heart" style="color:#e74c3c"></i>' : '<i class="fa-regular fa-heart"></i>'}
            </button>
        </div>
        <div class="book-card-body">
            <span class="book-course-tag">${book.course}</span>
            <div class="book-card-title">${book.title}</div>
            <div class="book-card-author">${book.author}</div>
            <div class="book-card-foot">
            <span class="cond-pill ${condClass(book.condition)}">${book.condition}</span>
            ${priceDisplay(book)}
            </div>
            <div class="book-card-location"><i class="fa fa-map-marker-alt"></i> ${book.location}</div>
        </div>
        <div class="book-card-actions">
            <button class="btn-cart" onclick="handleAddCart(event,${book.id})"><i class="fa fa-bag-shopping"></i> Keranjang</button>
            <button class="btn-chat-sm" onclick="handleChat(event,${book.id})"><i class="fa fa-comments"></i> Chat</button>
        </div>
        </div>
    `;
    }

    // Shared handlers (called from card buttons)
    function handleWishToggle(e, id, btn) {
    e.stopPropagation();
    if (!isLoggedIn()) { window.location.href = 'login.html?redirect='+encodeURIComponent(window.location.pathname); return; }
    const book = AppState.books.find(b => b.id === id);
    const idx  = AppState.wishlist.findIndex(w => w.id === id);
    if (idx > -1) {
        AppState.wishlist.splice(idx,1);
        btn.innerHTML = '<i class="fa-regular fa-heart"></i>'; btn.classList.remove('in-wish');
        showToast('<i class="fa-solid fa-heart-crack"></i> Dihapus dari wishlist.');
    } else {
        AppState.wishlist.push(book);
        btn.innerHTML = '<i class="fa-solid fa-heart" style="color:#e74c3c"></i>'; btn.classList.add('in-wish');
        showToast('<i class="fa-solid fa-heart" style="color:#e74c3c"></i> Disimpan ke wishlist!');
    }
    AppState.save();
    updateBadges();
    }

    function handleAddCart(e, id) {
    e.stopPropagation();
    if (!isLoggedIn()) { window.location.href = 'login.html?redirect='+encodeURIComponent(window.location.pathname); return; }
    const book = AppState.books.find(b => b.id === id);
    if (AppState.cart.some(c => c.id === id)) { showToast('<i class="fa-solid fa-book"></i> Sudah ada di keranjang!'); return; }
    AppState.cart.push(book);
    AppState.save();
    updateBadges();
    showToast('<i class="fa-solid fa-basket-shopping"></i> Ditambahkan ke keranjang!');
    }

    function handleChat(e, id) {
    e.stopPropagation();
    if (!isLoggedIn()) { window.location.href = 'login.html?redirect='+encodeURIComponent(window.location.pathname); return; }
    window.location.href = `detail.html?id=${id}&chat=1`;
    }

    function updateBadges() {
    const cb = document.getElementById('cartBadge');
    const wb = document.getElementById('wishBadge');
    if (cb) cb.textContent = AppState.cart.length;
    if (wb) wb.textContent = AppState.wishlist.length;
    }

    function toggleDropdown() {
    document.getElementById('userDropdown')?.classList.toggle('hidden');
    }
    document.addEventListener('click', e => {
    if (!e.target.closest('.user-avatar-wrap')) {
        document.getElementById('userDropdown')?.classList.add('hidden');
    }
    });

    function toggleMobileNav() {
    document.getElementById('mobileNav')?.classList.toggle('open');
    document.getElementById('hamburger')?.classList.toggle('open');
    }

    function doLogout() {
    AppState.logout();
    showToast('👋 Berhasil keluar!');
    setTimeout(() => window.location.href = '../index.html', 900);
    }

    // Scroll navbar shadow
    window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Init state on every page load
    AppState.init();
