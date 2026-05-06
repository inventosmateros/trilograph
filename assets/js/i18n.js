
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

    // Update Mailchimp Form Labels
    updateMailchimpLabels(lang);
}

function updateMailchimpLabels(lang) {
    const isEn = lang === 'en';
    const form = document.querySelector('#mc_embed_signup');
    if (!form) return;

    const labels = {
        title: isEn ? 'KICKSTARTER VIP WAITING LIST' : 'LISTA DE ESPERA VIP KICKSTARTER',
        desc: isEn ? 'We will let you know 15 minutes before we launch the campaign so you can get one of the first units with extra discount.' : 'Te avisaremos 15 minutos antes del lanzamiento para que asegures una de las primeras unidades con descuento extra.',
        email: isEn ? 'Email Address' : 'Correo Electrónico',
        name: isEn ? 'First Name' : 'Nombre',
        phone: isEn ? 'Whatsapp' : 'Whatsapp',
        submit: isEn ? 'SUBSCRIBE' : 'SUSCRIBIRME'
    };

    const titleEl = form.querySelector('h2');
    const descEl = form.querySelector('.form-description');
    const emailLabel = form.querySelector('label[for="mce-EMAIL"]');
    const nameLabel = form.querySelector('label[for="mce-FNAME"]');
    const phoneLabel = form.querySelector('label[for="mce-PHONE"]');
    const submitBtn = form.querySelector('input[type="submit"]');

    if (titleEl) titleEl.innerText = labels.title;
    if (descEl) descEl.innerText = labels.desc;
    if (emailLabel) emailLabel.innerHTML = labels.email + ' <span class="asterisk">*</span>';
    if (nameLabel) nameLabel.innerText = labels.name;
    if (phoneLabel) phoneLabel.innerText = labels.phone;
    if (submitBtn) submitBtn.value = labels.submit;
}

function initI18n() {
    // 1. Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && (langParam === 'es' || langParam === 'en')) {
        setLanguage(langParam);
        return;
    }

    // 2. Check localStorage
    const savedLang = localStorage.getItem('trilograph-lang');
    if (savedLang) {
        setLanguage(savedLang);
        return;
    }

    // 3. Browser Language Detection
    const browserLang = navigator.language || navigator.userLanguage;
    const defaultLang = browserLang.startsWith('es') ? 'es' : 'en';
    
    setLanguage(defaultLang);
}

// Countdown Timer
function startCountdown() {
    const targetDate = new Date("May 14, 2026 00:00:00").getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const countdownEl = document.getElementById("countdown");
        if (!countdownEl) return;

        if (distance < 0) {
            clearInterval(timer);
            countdownEl.innerHTML = "LAUNCHED!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const isEn = document.body.classList.contains('lang-en');
        const labels = isEn ? ['days', 'hours', 'minutes'] : ['días', 'horas', 'minutos'];
        
        countdownEl.innerHTML = `
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
