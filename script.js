// Mobile menu toggle
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

burger?.addEventListener('click', (e) => {
    e.stopPropagation();
    nav?.classList.toggle('open');
});

// Close menu on nav link click
document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav?.classList.remove('open');
    });
});

// Close menu on backdrop click
document.addEventListener('click', (e) => {
    if (nav?.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
    }
});

// Form submission with validation
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const data = new FormData(form);

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    const name = data.get('name')?.trim();
    const contact = data.get('contact')?.trim();
    const message = data.get('message')?.trim();

    let hasError = false;

    if (!name) {
        showError(form.querySelector('[name="name"]'), 'Укажите имя');
        hasError = true;
    }
    if (!contact) {
        showError(form.querySelector('[name="contact"]'), 'Укажите способ связи');
        hasError = true;
    }

    if (hasError) return;

    const text = encodeURIComponent(
        `Заявка с сайта Поляков.prod\n\nИмя: ${name}\nКонтакт: ${contact}\n${message ? 'Задача: ' + message : ''}`
    );
    window.open(`https://t.me/L_Polyakov?text=${text}`, '_blank');

    btn.textContent = 'Отправлено!';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Отправить заявку';
        btn.disabled = false;
        form.reset();
    }, 3000);
});

function showError(input, message) {
    input.classList.add('input-error');
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
}

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

// Animated counter on scroll
const counterEl = document.querySelector('.stat__number[data-count]');
if (counterEl) {
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            const end = parseInt(counterEl.dataset.count);
            if (!isNaN(end) && end > 0) {
                const start = performance.now();
                const duration = 800;
                (function update(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counterEl.textContent = Math.round(end * eased);
                    if (progress < 1) requestAnimationFrame(update);
                })(start);
            }
        }
    }, { threshold: 0.5 });
    observer.observe(counterEl);
}
