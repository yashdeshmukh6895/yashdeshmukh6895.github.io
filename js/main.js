document.addEventListener("DOMContentLoaded", () => {
    // Integrate GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Hero Animations (Play immediately)
    const tl = gsap.timeline();
    
    tl.to(".hero-badge", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    })
    .to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6")
    .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .to(".hero-cta", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    // Hero Parallax
    gsap.to(".hero-bg img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 3. Scroll Reveal Animations
    
    // Fade Up Elements
    const fadeUpElements = gsap.utils.toArray('.fade-up:not(.hero-badge):not(.hero-title):not(.hero-subtitle):not(.hero-cta)');
    
    fadeUpElements.forEach(elem => {
        // Read delay from inline style if present
        const delay = elem.style.getPropertyValue('--delay') || 0;
        
        gsap.to(elem, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: parseFloat(delay),
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // trigger when top of elem hits 85% of viewport
                toggleActions: "play none none none"
            }
        });
    });

    // Fade In & Scale Elements (Images)
    const fadeScaleElements = gsap.utils.toArray('.fade-in-scale');
    
    fadeScaleElements.forEach(elem => {
        gsap.to(elem, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Staggered list items in 'What We Offer'
    gsap.from(".offer-list li", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".offer-list",
            start: "top 80%",
        }
    });
    
    // Staggered feature tags
    gsap.from(".feature-tag", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".offer-features",
            start: "top 80%",
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 17, 21, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(107, 210, 219, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 17, 21, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        }
    });

    // Theme Switcher Logic
    const themeBtns = document.querySelectorAll('.theme-btn');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('ignite-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.theme-btn[data-set="${savedTheme}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-set');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('ignite-theme', theme);
            
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.15,
                ease: "power2.out"
            });
        });

        // Hover effect on clickable elements
        const clickables = document.querySelectorAll('a, button, .value-card, .theme-btn');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }
});
