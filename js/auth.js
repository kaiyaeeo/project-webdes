    /* =====================================================
    auth.js — Autentikasi & Session Management
    BookCircle Platform
    ===================================================== */

    const Auth = {
    /**
     * Cek apakah pengguna sudah login
     */
    check() {
        return !!AppState.user;
    },

    /**
     * Redirect ke login jika belum login
     * @param {string} redirectAfter - URL tujuan setelah login
     */
    requireAuth(redirectAfter) {
        if (!this.check()) {
        const target = redirectAfter || window.location.pathname + window.location.search;
        window.location.href = `login.html?redirect=${encodeURIComponent(target)}`;
        return false;
        }
        return true;
    },

    /**
     * Login user (simulasi)
     */
    login(email, password) {
        if (!email || !password) return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Isi semua field terlebih dahulu' };
        if (!email.includes('@')) return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Format email tidak valid' };
        if (password.length < 4) return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Password terlalu pendek' };

        const name = email.split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

        AppState.user = { name, email, campus: 'UNSOED Purwokerto', major: '', year: '' };
        localStorage.setItem('bc_user', JSON.stringify(AppState.user));
        return { ok: true };
    },

    /**
     * Register user baru
     */
    register(data) {
        const { firstName, email, campus, password, confirmPassword, agree } = data;
        if (!firstName)            return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Nama depan harus diisi' };
        if (!email.includes('@'))  return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Format email tidak valid' };
        if (!campus)               return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Isi nama kampus kamu' };
        if (password.length < 8)   return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Password minimal 8 karakter' };
        if (password !== confirmPassword) return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Konfirmasi password tidak cocok' };
        if (!agree)                return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Setujui syarat & ketentuan terlebih dahulu' };

        AppState.user = { name: firstName + (data.lastName ? ' ' + data.lastName : ''), email, campus, major: data.major || '', year: data.year || '' };
        localStorage.setItem('bc_user', JSON.stringify(AppState.user));
        return { ok: true };
    },

    /**
     * Logout
     */
    logout() {
        AppState.logout();
        showToast('<i class="fa-solid fa-arrow-right-from-bracket"></i> Berhasil keluar!');
        setTimeout(() => window.location.href = '../index.html', 800);
    },

    /**
     * Update profil pengguna
     */
    updateProfile(data) {
        if (!AppState.user) return { ok: false, msg: 'Tidak ada sesi aktif' };
        if (!data.name) return { ok: false, msg: '<i class="fa-solid fa-triangle-exclamation"></i> Nama tidak boleh kosong' };
        Object.assign(AppState.user, data);
        localStorage.setItem('bc_user', JSON.stringify(AppState.user));
        AppState.save();
        return { ok: true };
    }
    };

    /* Expose doLogout globally (dipakai di navbar dropdown) */
    function doLogout() { Auth.logout(); }
