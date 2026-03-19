// Mobile menu toggle
document.querySelector('.header__burger')?.addEventListener('click', () => {
    document.querySelector('.header__nav')?.classList.toggle('open');
});

// Close menu on nav link click
document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.header__nav')?.classList.remove('open');
    });
});

// Form submission
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const data = new FormData(form);

    const name = data.get('name');
    const contact = data.get('contact');
    const message = data.get('message');

    // For now: open Telegram with pre-filled message
    const text = encodeURIComponent(
        `Заявка с сайта Поляков.prod\n\nИмя: ${name}\nКонтакт: ${contact}\n${message ? 'Задача: ' + message : ''}`
    );
    window.open(`https://t.me/leonid_prod?text=${text}`, '_blank');

    btn.textContent = 'Отправлено!';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Отправить заявку';
        btn.disabled = false;
        form.reset();
    }, 3000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
