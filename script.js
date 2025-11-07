document.getElementById('openBtn').addEventListener('click', function() {
    // Hilangkan overlay pembuka
    document.querySelector('.open-overlay').classList.add('inactive');

    // Scroll ke atas konten
    setTimeout(() => {
        document.querySelector('.overlay-header').scrollIntoView({ behavior: 'smooth' });
    }, 800);
});


const overlay = document.querySelector('.open-overlay');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const floatingButtons = document.querySelector('.floating-buttons');
const sidebar = document.getElementById('sidebarMenu');
let isPlaying = false;

// Tombol Open Invitation
openBtn.addEventListener('click', () => {
    overlay.classList.add('inactive');

    // Tunda sedikit biar transisi halus
    setTimeout(() => {
        floatingButtons.classList.add('active');

        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '<span>🔊</span>';
        }).catch(() => {
            console.log('Autoplay blocked, user must interact again.');
        });
    }, 800);
});

// Tombol Music (mute/unmute)
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<span>🔇</span>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<span>🔊</span>';
    }
    isPlaying = !isPlaying;
});

// Tombol Menu ☰ (toggle sidebar)
const menuBtn = document.getElementById('menuBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
});

// Klik di luar sidebar → tutup sidebar
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
});

// Overlay slideshow
const overlayBgs = document.querySelectorAll('.overlay-bg');
let overlayIndex = 0;

function changeOverlayBg() {
    overlayBgs.forEach(bg => bg.classList.remove('active'));
    overlayBgs[overlayIndex].classList.add('active');
    overlayIndex = (overlayIndex + 1) % overlayBgs.length;
}
setInterval(changeOverlayBg, 4000);

// Carousel
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-next');
const prevBtn = document.querySelector('.carousel-prev');
let currentIndex = 0;

function updateCarousel() {
    slides.forEach(slide => slide.classList.remove('prev', 'active', 'next'));
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;

    slides[prevIndex].classList.add('prev');
    slides[currentIndex].classList.add('active');
    slides[nextIndex].classList.add('next');
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

window.addEventListener('DOMContentLoaded', updateCarousel);

// Love Story
const storySlides = document.querySelectorAll('.story-slide');
const storyNext = document.querySelector('.story-next');
const storyPrev = document.querySelector('.story-prev');
let storyIndex = 0;

function updateStory() {
    storySlides.forEach(slide => slide.classList.remove('active'));
    storySlides[storyIndex].classList.add('active');
}
storyNext.addEventListener('click', () => {
    storyIndex = (storyIndex + 1) % storySlides.length;
    updateStory();
});
storyPrev.addEventListener('click', () => {
    storyIndex = (storyIndex - 1 + storySlides.length) % storySlides.length;
    updateStory();
});
window.addEventListener('DOMContentLoaded', updateStory);

// Countdown
const weddingDate = new Date("February 26, 2027 10:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).innerText = 0;
        });
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll
function scrollToContent() {
    const target = document.querySelector('.content-section');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth scroll + auto close sidebar
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        // Tutup sidebar & overlay setelah klik
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');

        // Balikin scroll body
        document.body.style.overflow = '';
    });
});

// === OPEN & CLOSE GIFT SIDEBAR ===
const sendGiftBtn = document.querySelector('.gift button');
const giftSidebar = document.getElementById('giftSidebar');
const giftOverlay = document.getElementById('giftOverlay');

// Buka gift sidebar
sendGiftBtn.addEventListener('click', () => {
    giftSidebar.classList.add('active');
    giftOverlay.classList.add('active');
});

// Tutup sidebar kalau klik overlay
giftOverlay.addEventListener('click', () => {
    giftSidebar.classList.remove('active');
    giftOverlay.classList.remove('active');
});

// === COPY TO CLIPBOARD ===
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');

copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        navigator.clipboard.writeText(text).then(() => {
            // Tampilkan toast modern hijau
            toast.textContent = 'Copied: ' + text;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        });
    });
});

// === FORM SUBMIT ===
const giftForm = document.getElementById('giftForm');
const phoneInput = document.getElementById('phone');
const selectedCountry = document.querySelector('.selected-country');
const countryList = document.querySelector('.country-list');

// Toggle dropdown
selectedCountry.addEventListener('click', () => {
    countryList.style.display = countryList.style.display === 'block' ? 'none' : 'block';
});

// Pilih negara
countryList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        selectedCountry.textContent = li.dataset.code;
        countryList.style.display = 'none';
    });
});

// Tutup dropdown kalau klik luar
document.addEventListener('click', (e) => {
    if (!selectedCountry.contains(e.target) && !countryList.contains(e.target)) {
        countryList.style.display = 'none';
    }
});

// Toast
const confirmationToast = document.createElement('div');
confirmationToast.id = 'confirmationToast';
document.body.appendChild(confirmationToast);

// Submit form
giftForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset form
    giftForm.reset();
    selectedCountry.textContent = '+62'; // reset ke default

    // Tampilkan toast
    confirmationToast.textContent = 'Thank you! Confirmation sent. 💌';
    confirmationToast.classList.add('show');

    // Tutup sidebar setelah toast muncul
    const giftSidebar = document.getElementById('giftSidebar'); // sesuaikan ID atau class
    if (giftSidebar) {
        giftSidebar.style.display = 'none'; // atau pakai class toggle kalau pakai CSS
    }

    // Hilangkan toast setelah 2,5 detik
    setTimeout(() => {
        confirmationToast.classList.remove('show');
    }, 2500);
});

// Cuma bisa input angka
phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
});