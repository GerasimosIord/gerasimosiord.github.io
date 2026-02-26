document.addEventListener('DOMContentLoaded', () => {

    // ─── Theme Toggle ───────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeToggle.innerHTML = isLight
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    });

    // ─── Navbar scroll effect ────────────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ─── Smooth scroll navigation ────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar.offsetHeight + 16;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                    behavior: 'smooth'
                });
                navLinks.classList.remove('open');
            }
        });
    });

    // ─── Mobile hamburger ────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });

    // ─── Section scroll animations ───────────────────────────
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('section').forEach(el => sectionObserver.observe(el));

    // ─── Skills stagger animation ────────────────────────────
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.skill');
                skills.forEach((skill, i) => {
                    setTimeout(() => skill.classList.add('visible'), i * 90);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) skillObserver.observe(skillsSection);

    // ─── Typewriter effect ───────────────────────────────────
    const typeTarget = document.getElementById('typewriter');
    if (typeTarget) {
        const text = 'Bridging biology and computation to uncover insights in genetics & neuroscience.';
        let i = 0;

        function type() {
            if (i < text.length) {
                typeTarget.textContent += text[i];
                i++;
                setTimeout(type, 30 + Math.random() * 20);
            } else {
                typeTarget.classList.add('done');
            }
        }

        setTimeout(type, 1000);
    }

    // ─── Project card 3D tilt + spotlight ───────────────────
    document.querySelectorAll('.project').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;

            card.style.transform = `perspective(700px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-6px)`;
            card.style.setProperty('--mx', `${(x / rect.width)  * 100}%`);
            card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.removeProperty('--mx');
            card.style.removeProperty('--my');
        });
    });

    // ─── Form submission with toast ──────────────────────────
    const form  = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', () => {
        setTimeout(() => {
            toast.classList.add('show');
            form.reset();
            setTimeout(() => toast.classList.remove('show'), 4200);
        }, 800);
    });

    // ─── Scroll to top button ────────────────────────────────
    const scrollBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
