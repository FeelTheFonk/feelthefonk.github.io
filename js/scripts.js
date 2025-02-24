const initMatrix = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.querySelector('.matrix').appendChild(canvas);

    const resize = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    };
    resize();
    addEventListener('resize', resize);

    const columns = canvas.width / 14;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--orange-02)';
        ctx.font = '14px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = '01'[Math.random() * 2 | 0];
            ctx.fillText(text, i * 14, drops[i] * 14);
            if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 35);
};

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.orb').forEach(orb => {
        orb.classList.remove('active');
        if (orb.dataset.section === sectionId) {
            orb.classList.add('active');
        }
    });
};

const initParallax = () => {
    const cards = document.querySelectorAll('.card');
    addEventListener('scroll', () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < innerHeight && rect.bottom > 0) {
                const shift = (innerHeight - rect.top) * 0.1;
                const rotation = (innerHeight - rect.top) * 0.02;
                card.style.transform = `translateY(${shift}px) rotateX(${rotation}deg)`;
            }
        });
    });
};

const initCodeEffects = () => {
    document.querySelectorAll('.code').forEach(code => {
        code.onmouseover = () => {
            code.style.borderColor = 'var(--orange)';
            code.style.transform = 'scale(1.02)';
            code.style.boxShadow = '0 10px 30px var(--orange-15)';
        };
        code.onmouseout = () => {
            code.style.borderColor = 'var(--orange-15)';
            code.style.transform = 'scale(1)';
            code.style.boxShadow = 'none';
        };
    });
};

const initCardEffects = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.onmousemove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            card.style.transform = `
                perspective(1000px)
                rotateY(${(x - 0.5) * 10}deg)
                rotateX(${-(y - 0.5) * 10}deg)
                translateY(-8px)
            `;

            card.style.backgroundImage = `
                radial-gradient(
                    circle at ${x * 100}% ${y * 100}%,
                    var(--orange-15) 0%,
                    transparent 50%
                )
            `;
        };

        card.onmouseleave = () => {
            card.style.transform = 'translateY(0)';
            card.style.backgroundImage = 'none';
        };
    });
};

const initSkillsEffects = () => {
    document.querySelectorAll('.item').forEach(item => {
        item.onmouseover = () => {
            item.style.transform = 'translateY(-5px) scale(1.1)';
            item.style.boxShadow = '0 5px 15px var(--orange-15)';
        };
        item.onmouseout = () => {
            item.style.transform = 'none';
            item.style.boxShadow = 'none';
        };
    });
};

addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initParallax();
    initCodeEffects();
    initCardEffects();
    initSkillsEffects();

    document.querySelectorAll('.orb').forEach(orb =>
        orb.onclick = () => scrollToSection(orb.dataset.section)
    );

    document.querySelector('.logo').onclick = (e) => {
        e.preventDefault();
        scrollTo({ top: 0, behavior: 'smooth' });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.orb').forEach(orb => {
                    orb.classList.remove('active');
                    if (orb.dataset.section === entry.target.id) {
                        orb.classList.add('active');
                    }
                });
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section =>
        observer.observe(section)
    );
});

addEventListener('popstate', () => {
    const section = location.hash.slice(1);
    if (section) scrollToSection(section);
});

addEventListener('load', () => {
    const section = location.hash.slice(1);
    if (section) {
        setTimeout(() => scrollToSection(section), 100);
    }
});