/* =====================
   VARIABEL UTAMA
===================== */
const pages = document.querySelectorAll('.page');
const music = document.getElementById('music');

let index = 0;
let started = false;
let typingInterval = null;

/* =====================
   TYPEWRITER EFFECT
===================== */
function typeEffect(el) {
    if (!el) return;

    // hentikan typing sebelumnya
    if (typingInterval) clearInterval(typingInterval);

    // simpan teks asli
    const text = el.dataset.text || el.innerText;
    el.dataset.text = text;
    el.innerText = '';

    let i = 0;
    typingInterval = setInterval(() => {
        el.innerText += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(typingInterval);
            typingInterval = null;
        }
    }, 45);
}

/* =====================
   TAMPILKAN HALAMAN
===================== */
function showPage(i) {
    if (i < 0 || i >= pages.length) return;

    pages.forEach(p => p.classList.remove('active'));
    pages[i].classList.add('active');

    const text = pages[i].querySelector('.type');
    typeEffect(text);

    // jalankan musik setelah interaksi pertama
    if (!started && music) {
        music.volume = 0.4;
        music.play().catch(() => {});
        started = true;
    }
}

/* =====================
   TOMBOL NEXT (PC)
===================== */
document.querySelectorAll('.next').forEach(btn => {
    btn.addEventListener('click', () => {
        if (index < pages.length - 1) {
            index++;
            showPage(index);
        }
    });
});

/* =====================
   TOMBOL UNLOCK (HALAMAN RAHASIA)
===================== */
const unlockBtn = document.querySelector('.unlock');
if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
        if (index < pages.length - 1) {
            index++;
            showPage(index);
        }
    });
}

/* =====================
   SWIPE OTOMATIS (HP)
===================== */
let startX = 0;

document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // swipe kiri
    if (diff > 70 && index < pages.length - 1) {
        index++;
        showPage(index);
    }
});

/* =====================
   FULLSCREEN (GLOBAL)
===================== */
window.goFull = function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    }
};

/* =====================
   INIT
===================== */
showPage(0);
