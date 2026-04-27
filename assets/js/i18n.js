
function setLanguage(lang) {
    document.body.classList.remove('lang-es', 'lang-en');
    document.body.classList.add('lang-' + lang);
    localStorage.setItem('trilograph-lang', lang);
    
    // Update active state in switcher
    document.querySelectorAll('.lang-switcher a').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('onclick').includes(lang)) {
            el.classList.add('active');
        }
    });
}

function initI18n() {
    const savedLang = localStorage.getItem('trilograph-lang') || 'es';
    setLanguage(savedLang);
}

// Countdown Timer
function startCountdown() {
    const targetDate = new Date("May 5, 2026 00:00:00").getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "LAUNCHED!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById("countdown").innerHTML = `
            <div class="countdown-item"><span class="number">${days}</span><span class="label">días</span></div>
            <div class="countdown-item"><span class="number">${hours}</span><span class="label">horas</span></div>
            <div class="countdown-item"><span class="number">${minutes}</span><span class="label">minutos</span></div>
        `;
        
        // Update labels for English version if needed, but since it's just numbers mostly, 
        // I'll make the labels class-based or just simple text for now.
        // Actually, let's make it smarter:
        const isEn = document.body.classList.contains('lang-en');
        const labels = isEn ? ['days', 'hours', 'minutes'] : ['días', 'horas', 'minutos'];
        
        document.getElementById("countdown").innerHTML = `
            <div class="countdown-item"><span class="number">${days}</span><span class="label">${labels[0]}</span></div>
            <div class="countdown-item"><span class="number">${hours}</span><span class="label">${labels[1]}</span></div>
            <div class="countdown-item"><span class="number">${minutes}</span><span class="label">${labels[2]}</span></div>
        `;

    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    startCountdown();
});
