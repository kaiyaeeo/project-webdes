    // js/auth.js

    function getUser() {
    try { return JSON.parse(localStorage.getItem('bc_user')); } catch { return null; }
    }
    function setUser(u) { localStorage.setItem('bc_user', JSON.stringify(u)); }
    function clearUser() { localStorage.removeItem('bc_user'); }

    function getCart() { return JSON.parse(localStorage.getItem('bc_cart') || '[]'); }
    function setCart(c) { localStorage.setItem('bc_cart', JSON.stringify(c)); }
    function getWishlist() { return JSON.parse(localStorage.getItem('bc_wish') || '[]'); }
    function setWishlist(w) { localStorage.setItem('bc_wish', JSON.stringify(w)); }
    function getRequests() { return JSON.parse(localStorage.getItem('bc_req') || '[]'); }
    function setRequests(r) { localStorage.setItem('bc_req', JSON.stringify(r)); }

    /** Render the right-side of navbar based on auth state */
    function renderNavRight() {
    const el = document.getElementById('navRight');
    if (!el) return;
    const user = getUser();
    const cart = getCart();
    const wish = getWishlist();

    const base = window.location.pathname.includes('/pages/') ? '../' : '';

    if (user) {
        el.innerHTML = `
        <a class="btn-ico" href="${base}pages/wishlist.html" title="Wishlist">
            <i class="fa fa-heart"></i>
            <span class="badge">${wish.length}</span>
        </a>
        <a class="btn-ico" href="${base}pages/cart.html" title="Keranjang">
            <i class="fa fa-shopping-bag"></i>
            <span class="badge">${cart.length}</span>
        </a>
        <div class="user-chip" onclick="toggleDrop()">
            <img src="${user.avatar}" alt="${user.name}" title="${user.name}"/>
            <div class="u-drop" id="uDrop">
            <a href="${base}pages/dashboard.html"><i class="fa fa-th-large"></i> Dashboard</a>
            <a href="${base}pages/sell.html"><i class="fa fa-plus-circle"></i> Jual Buku</a>
            <div class="u-drop-div"></div>
            <a href="#" onclick="doLogout(event)"><i class="fa fa-sign-out-alt"></i> Keluar</a>
            </div>
        </div>
        `;
    } else {
        el.innerHTML = `
        <a href="${base}pages/login.html" class="btn-outline">Masuk</a>
        <a href="${base}pages/register.html" class="btn-primary">Daftar</a>
        `;
    }
    }

    function toggleDrop() {
    const d = document.getElementById('uDrop');
    if (d) d.classList.toggle('open');
    }
    document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-chip')) {
        const d = document.getElementById('uDrop');
        if (d) d.classList.remove('open');
    }
    });

    function doLogout(e) {
    e.preventDefault();
    clearUser();
    showToast('👋 Berhasil keluar.');
    setTimeout(() => {
        const base = window.location.pathname.includes('/pages/') ? '../' : '';
        window.location.href = base + 'index.html';
    }, 800);
    }

    /** Redirect to login if not authenticated, with redirect-back */
    function requireAuth(redirectTo) {
    if (!getUser()) {
        const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = `${base}login.html?redirect=${encodeURIComponent(redirectTo || '')}`;
        return false;
    }
    return true;
    }

    // Init navbar on every page
    document.addEventListener('DOMContentLoaded', () => {
    renderNavRight();
    // scroll effect
    window.addEventListener('scroll', () => {
        document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 10);
    });
    // hamburger
    document.getElementById('hamburger')?.addEventListener('click', () => {
        document.getElementById('navLinks')?.classList.toggle('open');
    });
    });