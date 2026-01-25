// Countdown Timer
function updateCountdown() {
    // Date cible : 1er février 2026 à 10h00 (heure de Paris)
    const targetDate = new Date('2026-02-01T10:00:00+01:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Si la date est dépassée
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Mettre à jour le compteur toutes les secondes
setInterval(updateCountdown, 1000);
updateCountdown(); // Initialiser immédiatement

// Logo Glitch Effect
function triggerGlitch() {
    const logoWrapper = document.querySelector('.logo-wrapper');
    logoWrapper.classList.add('glitch');
    
    setTimeout(() => {
        logoWrapper.classList.remove('glitch');
    }, 300);
}

// Déclencher le glitch aléatoirement
function scheduleGlitch() {
    const delay = 3000 + Math.random() * 3000; // Entre 3 et 6 secondes
    setTimeout(() => {
        triggerGlitch();
        scheduleGlitch(); // Programmer le prochain glitch
    }, delay);
}

scheduleGlitch();

// Newsletter Form
const form = document.getElementById('newsletter-form');
const successMessage = document.getElementById('success-message');
const emailInput = document.getElementById('email-input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    console.log('Email soumis:', email);
    
    // Masquer le formulaire
    form.style.display = 'none';
    
    // Afficher le message de succès
    successMessage.style.display = 'block';
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
        form.style.display = 'flex';
        successMessage.style.display = 'none';
        emailInput.value = '';
    }, 3000);
});
