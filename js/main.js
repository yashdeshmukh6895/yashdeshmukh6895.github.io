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

    // Reset theme settings and remove theme switcher logic
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('ignite-theme');

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
        const clickables = document.querySelectorAll('a, button, .value-card');
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

    // Join form date sync for Google Forms submission
    const joinForm = document.getElementById('join-form');
    const joinDob = document.getElementById('join-dob');
    const joinDobYear = document.getElementById('join-dob-year');
    const joinDobMonth = document.getElementById('join-dob-month');
    const joinDobDay = document.getElementById('join-dob-day');
    const formSuccessOverlay = document.getElementById('form-success-overlay');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const hiddenIframe = document.getElementById('hidden_iframe');

    if (joinForm && joinDob && joinDobYear && joinDobMonth && joinDobDay) {
        const syncDateFields = () => {
            if (!joinDob.value) {
                joinDobYear.value = '';
                joinDobMonth.value = '';
                joinDobDay.value = '';
                return;
            }

            const [year, month, day] = joinDob.value.split('-');
            joinDobYear.value = year || '';
            joinDobMonth.value = month || '';
            joinDobDay.value = day || '';
        };

        joinDob.addEventListener('change', syncDateFields);
        
        let formSubmitted = false;
        joinForm.addEventListener('submit', (e) => {
            syncDateFields();
            formSubmitted = true;
            // The form will now submit to the hidden_iframe because of target="hidden_iframe"
        });

        // When the hidden iframe loads, check if it's following a form submission
        if (hiddenIframe) {
            hiddenIframe.addEventListener('load', () => {
                if (formSubmitted) {
                    formSuccessOverlay.classList.add('active');
                    formSubmitted = false;
                }
            });
        }

        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', () => {
                joinForm.reset();
                formSuccessOverlay.classList.remove('active');
            });
        }
    }

    // Modal Toggles (Terms & Conditions, Privacy Policy)
    const openTermsBtn = document.getElementById('open-terms');
    const closeTermsBtn = document.getElementById('close-terms');
    const termsModal = document.getElementById('terms-modal');

    const openPrivacyBtn = document.getElementById('open-privacy');
    const closePrivacyBtn = document.getElementById('close-privacy');
    const privacyModal = document.getElementById('privacy-modal');

    const toggleModal = (modal, action) => {
        if (action === 'open') {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable page scroll
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Enable page scroll
        }
    };

    if (openTermsBtn && closeTermsBtn && termsModal) {
        openTermsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(termsModal, 'open');
        });
        closeTermsBtn.addEventListener('click', () => toggleModal(termsModal, 'close'));
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) toggleModal(termsModal, 'close');
        });
    }

    if (openPrivacyBtn && closePrivacyBtn && privacyModal) {
        openPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(privacyModal, 'open');
        });
        closePrivacyBtn.addEventListener('click', () => toggleModal(privacyModal, 'close'));
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) toggleModal(privacyModal, 'close');
        });
    }
});
