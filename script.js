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
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('section').forEach(el => sectionObserver.observe(el));

    // ─── Skills stagger animation ────────────────────────────
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill').forEach((skill, i) => {
                    setTimeout(() => skill.classList.add('visible'), i * 100);
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
        const text = 'Quantifying biological complexity \u2014 from sequencing reads to causal structure.';
        let i = 0;

        function type() {
            if (i < text.length) {
                typeTarget.textContent += text[i];
                i++;
                // Slightly variable speed — feels more human
                const pause = text[i - 1] === '\u2014' ? 260 : 34 + Math.random() * 22;
                setTimeout(type, pause);
            } else {
                typeTarget.classList.add('done');
            }
        }

        setTimeout(type, 1100);
    }

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

    // ─── Scroll progress bar ─────────────────────────────────
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const updateProgress = () => {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            const ratio = max > 0 ? h.scrollTop / max : 0;
            progressBar.style.transform = `scaleX(${ratio})`;
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ─── Count-up for research stats ─────────────────────────
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function animateCount(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const start = performance.now();
        (function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(easeOutCubic(p) * target);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        })(start);
    }

    const statsBlock = document.querySelector('.research-stats');
    if (statsBlock) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.count').forEach(animateCount);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
        statObserver.observe(statsBlock);
    }

    // ─── Project cards: cursor-following spotlight ───────────
    document.querySelectorAll('.project').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    // ─── Staggered card reveals ──────────────────────────────
    [
        { container: '.project-grid', items: '.project',        step: 90 },
        { container: '.about-aside',  items: '.highlight-card', step: 80 }
    ].forEach(({ container, items, step }) => {
        const el = document.querySelector(container);
        if (!el) return;
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll(items).forEach((item, i) => {
                        setTimeout(() => item.classList.add('in'), i * step);
                    });
                    o.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        obs.observe(el);
    });

});
