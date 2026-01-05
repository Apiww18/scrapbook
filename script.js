const pages = document.querySelectorAll('.page');
const music = document.getElementById('music');

let index = 0;
let started = false;
let typingInterval = null;

/* =====================
   TYPEWRITER EFFECT
===================== */
function typeEffect(el) {
    if (typingInterval) clearInterval(typingInterval);

    const text = el.dataset.text || el.innerText;
    el.dataset.text = text;
    el.innerText = '';

    let i = 0;
    typingInterval = setInterval(() => {
        el.innerText += text[i];
        i++;
        if (i >= text.length) clearInterval(typingInterval);
    }, 45);
}

/* =====================
   SHOW PAGE
===================== */
function showPage(i) {
    if (i < 0 || i >= pages.length) return;

    pages.forEach(p => p.classList.remove('active'));
    pages[i].classList.add('active');

    const text = pages[i].querySelector('.type');
    if (text) typeEffect(text);

    // play music after first interaction
    if (!started) {
        music.volume = 0.4;
        music.play().catch(() => {});
        started = true;
    }
}

/* =====================
   NEXT BUTTON (PC)
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
   UNLOCK SECRET
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
   AUTO SWIPE (HP)
===================== */
let startX = 0;

document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 70 && index < pages.length - 1) {
        index++;
        showPage(index);
    }
});

/* =====================
   INIT
===================== */
showPage(0);