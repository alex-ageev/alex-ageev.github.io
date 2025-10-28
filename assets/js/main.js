// ZincArt - Main JavaScript File

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load translations first
    await loadTranslations();
    
    // Initialize all components
    initLoader();
    initNavigation();
    initMobileMenu();
    initRevealAnimations();
    initLightbox();
    initDynamicGallery();
    initLanguageSwitcher();
    initMaterialsSlider();
    initFAQ();
    initProcessAccordion();
    initToTop();
    initFormHandling();
    initWhatsApp();
    updateFooterYear();
    
    // Initialize counters after a short delay to ensure DOM is ready
    setTimeout(() => {
        initCounters();
    }, 100);
});

// Modern Loader
function initLoader() {
    const loader = document.querySelector('.modern-loader');
    if (loader) {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Skip loader for reduced motion users
            loader.style.display = 'none';
            return;
        }
        
        // Hide loader after images are ready or timeout
        let imagesLoaded = 0;
        const totalImages = document.querySelectorAll('img').length;
        const timeout = setTimeout(() => {
            hideLoader();
        }, 1200); // Fallback timeout
        
        // Check if images are loaded
        if (totalImages === 0) {
            hideLoader();
            return;
        }
        
        document.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    clearTimeout(timeout);
                    hideLoader();
                }
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        clearTimeout(timeout);
                        hideLoader();
                    }
                });
            }
        });
        
        function hideLoader() {
            loader.classList.add('fade-out');
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.remove();
            }, 800);
        }
    }
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        if (window.scrollY > 24) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for desktop anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Smooth scrolling for mobile menu anchor links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu first
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                }
                
                // Wait for menu to close, then scroll
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 300); // Wait for Bootstrap animation to complete
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileMenuToggle) {
        // Handle mobile menu toggle
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('show');
        });
        
        // Handle mobile menu close
        const closeButtons = mobileMenu.querySelectorAll('[data-bs-dismiss="offcanvas"]');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
            });
        });
        
        // Handle overlay click to close menu
        const overlay = mobileMenu.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
            });
        }
        
        // Handle escape key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
            }
        });
        
        // Handle Bootstrap offcanvas events
        mobileMenu.addEventListener('show.bs.offcanvas', function() {
            mobileMenu.classList.add('show');
        });
        
        mobileMenu.addEventListener('hide.bs.offcanvas', function() {
            mobileMenu.classList.remove('show');
        });
    }
}

// Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


// Language System
let currentLanguage = 'pt'; // Portuguese as default
let translations = {};

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch('assets/js/languages.json');
        translations = await response.json();
        console.log('Translations loaded successfully');
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Language Switcher
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('selectedLanguage') || 'pt';
    
    // Set active language button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Save to localStorage
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Update page content
            updatePageLanguage(selectedLang);
        });
    });
    
    // Initial language update
    updatePageLanguage(savedLang);
}

function updatePageLanguage(lang) {
    currentLanguage = lang;
    
    if (!translations[lang]) {
        console.error(`Translations for language ${lang} not found`);
        return;
    }
    
    const t = translations[lang];
    
    // Update navigation
    updateNavigation(t.nav);
    
    // Update hero section
    updateHero(t.hero);
    
    // Update stats section
    updateStats(t.stats);
    
    // Update services section
    updateServices(t.services);
    
    // Update materials section
    updateMaterials(t.materials);
    
    // Update gallery section
    updateGallery(t.gallery);
    
    // Update process section
    updateProcess(t.process);
    
    // Update pricing section
    updatePricing(t.pricing);
    
    // Update FAQ section
    updateFAQ(t.faq);
    
    // Update parallax section
    updateParallax(t.parallax);
    
    // Update contact section
    updateContact(t.contact);
    
    // Update contact info sections
    updateContactInfo(t.contact);
    
    // Update contact dark section
    updateContactDark(t.contact);
    
    // Update advantages section
    updateAdvantages(t.advantages);
    
    // Update features section
    updateFeatures(t.features);
    
    // Update warranty section
    updateWarranty(t.warranty);
    
    // Update coverage section
    updateCoverage(t.coverage);
    
    // Update speed section
    updateSpeed(t.speed);
    
    // Update materials section
    updateMaterialsSection(t.materialsSection);
    
    // Update footer
    updateFooter(t.footer);
    
    // Update loader
    updateLoader(t.loader);
    
    // Update menu
    updateMenu(t.menu);
    
    // Update page title and meta
    updatePageMeta(lang, t);
}

function updateNavigation(nav) {
    const navLinks = document.querySelectorAll('.nav-link');
    const navTexts = [
        nav.services,
        nav.materials,
        nav.portfolio,
        nav.process,
        nav.faq,
        nav.contact
    ];
    
    navLinks.forEach((link, index) => {
        if (navTexts[index]) {
            link.textContent = navTexts[index];
        }
    });
    
    // Update WhatsApp button
    const whatsappBtn = document.querySelector('#whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.innerHTML = `<i class="bi bi-whatsapp"></i> ${nav.whatsapp}`;
        whatsappBtn.setAttribute('aria-label', `WhatsApp ${nav.whatsapp}`);
    }
    
    // Update contact/quote button
    const quoteBtn = document.querySelector('.btn-primary[href="#contact"]');
    if (quoteBtn) {
        quoteBtn.textContent = nav.quote;
    }
    
    // Update mobile menu button
    const menuBtn = document.querySelector('.navbar-toggler');
    if (menuBtn) {
        menuBtn.setAttribute('aria-label', nav.menu);
    }
}

function updateHero(hero) {
    // Update eyebrow text
    const eyebrowEl = document.querySelector('.eyebrow');
    if (eyebrowEl) eyebrowEl.textContent = hero.eyebrow;
    
    // Update main title - need to handle the split spans
    const titleContainer = document.querySelector('.hero-content h1');
    if (titleContainer) {
        // For Portuguese: "Revestimentos em Zinco e Cobre"
        if (currentLanguage === 'pt') {
            titleContainer.innerHTML = `
                Revestimentos em <span class="split hero-title-zinc">Zinco</span><br> e <span class="split hero-title-copper">Cobre</span>
            `;
        } else {
            titleContainer.innerHTML = `
                Zinc and <span class="split hero-title-zinc">Copper</span><br> <span class="split hero-title-copper">Cladding</span>
            `;
        }
    }
    
    // Update description
    const descEl = document.querySelector('.hero-content .lead');
    if (descEl) descEl.textContent = hero.description;
    
    // Update buttons
    const ctaBtn = document.querySelector('.hero-content .btn-primary');
    const galleryBtn = document.querySelector('.hero-content .btn-outline-light');
    if (ctaBtn) ctaBtn.innerHTML = `<i class="bi bi-envelope-paper"></i> ${hero.cta}`;
    if (galleryBtn) {
        const galleryText = currentLanguage === 'pt' ? 'Ver portfólio' : 'View portfolio';
        galleryBtn.innerHTML = `<i class="bi bi-images"></i> ${galleryText}`;
    }
    
    // Update trust indicators
    const trustEl = document.querySelector('.trust');
    if (trustEl) trustEl.textContent = hero.trust;
    
    // Update guarantee box
    const guaranteeLabelEl = document.querySelector('.guarantee-box .label');
    const guaranteeValueEl = document.querySelector('.guarantee-box .value');
    if (guaranteeLabelEl) guaranteeLabelEl.textContent = hero.guarantee;
    if (guaranteeValueEl) guaranteeValueEl.textContent = hero.guaranteeValue;
    
    // Update WhatsApp button
    const whatsappBtn = document.querySelector('.btn-whatsapp span');
    if (whatsappBtn) whatsappBtn.textContent = hero.whatsapp;
}


function updateGallery(gallery) {
    const titleEl = document.querySelector('#gallery h2');
    const subtitleEl = document.querySelector('#gallery .lead');
    
    if (titleEl) titleEl.textContent = gallery.title;
    if (subtitleEl) subtitleEl.textContent = gallery.subtitle;
}

function updateProcess(process) {
    const titleEl = document.querySelector('#process h2');
    const subtitleEl = document.querySelector('#process .lead');
    
    if (titleEl) titleEl.textContent = process.title;
    if (subtitleEl) subtitleEl.textContent = process.subtitle;
    
    // Update process steps
    const stepCards = document.querySelectorAll('.process-step-card');
    const stepData = [
        process.consultation,
        process.planning,
        process.production,
        process.installation
    ];
    
    stepCards.forEach((card, index) => {
        if (stepData[index]) {
            const title = card.querySelector('.step-title');
            const subtitle = card.querySelector('.step-subtitle');
            const description = card.querySelector('.step-details p');
            const features = card.querySelectorAll('.step-features li');
            
            if (title) title.textContent = stepData[index].title;
            if (subtitle) subtitle.textContent = stepData[index].subtitle;
            if (description) description.textContent = stepData[index].description;
            
            // Update features list
            if (features && stepData[index].features) {
                features.forEach((feature, featureIndex) => {
                    if (stepData[index].features[featureIndex]) {
                        // Keep the icon and update the text
                        const icon = feature.querySelector('i');
                        if (icon) {
                            feature.innerHTML = icon.outerHTML + ' ' + stepData[index].features[featureIndex];
                        } else {
                            feature.textContent = stepData[index].features[featureIndex];
                        }
                    }
                });
            }
        }
    });
    
    // Update guarantee section
    const guaranteeTitle = document.querySelector('.quality-guarantee-card h4');
    const guaranteeItems = document.querySelectorAll('.guarantee-item');
    
    if (guaranteeTitle) guaranteeTitle.textContent = process.guarantee.title;
    
    const guaranteeData = [
        process.guarantee.materials,
        process.guarantee.timing,
        process.guarantee.team,
        process.guarantee.warranty
    ];
    
    guaranteeItems.forEach((item, index) => {
        if (guaranteeData[index]) {
            const title = item.querySelector('h6');
            const desc = item.querySelector('p');
            if (title) title.textContent = guaranteeData[index].title;
            if (desc) desc.textContent = guaranteeData[index].description;
        }
    });
}


function updateFAQ(faq) {
    const titleEl = document.querySelector('#faq h2');
    if (titleEl) titleEl.textContent = faq.title;
    
    // Update FAQ questions and answers
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        if (faq.questions[index]) {
            const question = item.querySelector('.faq-question span');
            const answer = item.querySelector('.faq-answer p');
            
            if (question) question.textContent = faq.questions[index].question;
            if (answer) answer.textContent = faq.questions[index].answer;
        }
    });
}

function updateContact(contact) {
    const titleEl = document.querySelector('#contact h2');
    if (titleEl) titleEl.textContent = contact.form.title;
    
    // Update form labels
    const nameLabel = document.querySelector('label[for="name"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const phoneLabel = document.querySelector('label[for="phone"]');
    const cityLabel = document.querySelector('label[for="city"]');
    const projectLabel = document.querySelector('label[for="project"]');
    const messageLabel = document.querySelector('label[for="message"]');
    const submitBtn = document.querySelector('#contact button[type="submit"]');
    const consentLabel = document.querySelector('label[for="consent"]');
    
    if (nameLabel) nameLabel.textContent = contact.form.name;
    if (emailLabel) emailLabel.textContent = contact.form.email;
    if (phoneLabel) phoneLabel.textContent = contact.form.phone;
    if (cityLabel) cityLabel.textContent = contact.form.city;
    if (projectLabel) projectLabel.textContent = contact.form.project;
    if (messageLabel) messageLabel.textContent = contact.form.message;
    if (submitBtn) submitBtn.innerHTML = `<i class="bi bi-send"></i> ${contact.form.submit}`;
    if (consentLabel) consentLabel.textContent = contact.form.consent;
    
    // Update form subtitle
    const formSubtitle = document.querySelector('#contact .text-muted');
    if (formSubtitle) formSubtitle.textContent = contact.form.subtitle;
    
    // Update form placeholders
    const cityInput = document.querySelector('#city');
    const messageTextarea = document.querySelector('#message');
    if (cityInput) cityInput.placeholder = contact.form.cityPlaceholder;
    if (messageTextarea) messageTextarea.placeholder = contact.form.messagePlaceholder;
    
    // Update project type selectbox
    const projectSelect = document.querySelector('#project');
    if (projectSelect && contact.form.projectTypes) {
        const options = projectSelect.querySelectorAll('option');
        if (options.length > 0) {
            options[0].textContent = contact.form.projectTypes.placeholder;
        }
        if (options.length > 1) {
            options[1].textContent = contact.form.projectTypes.roof;
        }
        if (options.length > 2) {
            options[2].textContent = contact.form.projectTypes.facade;
        }
        if (options.length > 3) {
            options[3].textContent = contact.form.projectTypes.drain;
        }
        if (options.length > 4) {
            options[4].textContent = contact.form.projectTypes.repair;
        }
        if (options.length > 5) {
            options[5].textContent = contact.form.projectTypes.other;
        }
    }
    
    // Update contact info cards
    const contactCards = document.querySelectorAll('.contact-info-card');
    if (contactCards.length > 0) {
        // First card - location
        const locationCard = contactCards[0];
        const locationTitle = locationCard.querySelector('h5');
        const locationText = locationCard.querySelector('p');
        if (locationTitle) locationTitle.innerHTML = `<i class="bi bi-geo-alt"></i> ${contact.title}`;
        if (locationText) locationText.textContent = contact.location;
        
        // Second card - phone
        if (contactCards[1]) {
            const phoneCard = contactCards[1];
            const phoneTitle = phoneCard.querySelector('h5');
            const phoneText = phoneCard.querySelector('p');
            if (phoneTitle) phoneTitle.innerHTML = `<i class="bi bi-telephone"></i> Ligue-nos`;
            if (phoneText) phoneText.textContent = contact.phone;
        }
    }
}

function updateFooter(footer) {
    const descEl = document.querySelector('.footer-description');
    const instagramEl = document.querySelector('.instagram-link span');
    const copyrightEl = document.querySelector('.copyright-text');
    const phoneEl = document.querySelector('.contact-info .mb-1:first-child');
    const emailEl = document.querySelector('.contact-info .mb-1:nth-child(2)');
    const locationEl = document.querySelector('.contact-info div:last-child');
    const instagramHandleEl = document.querySelector('.instagram-link span');
    
    // Update copyright text in footer
    const copyrightTextEl = document.querySelector('.copyright-text');
    if (copyrightTextEl) {
        copyrightTextEl.innerHTML = `© <span class="current-year"></span> ZincArt — ${footer.copyright}`;
    }
    
    if (descEl) descEl.textContent = footer.description;
    if (instagramEl) instagramEl.textContent = footer.instagram;
    if (copyrightEl) copyrightEl.textContent = footer.copyright;
    if (phoneEl) phoneEl.innerHTML = `<i class="bi bi-telephone me-2"></i>${footer.phone}`;
    if (emailEl) emailEl.innerHTML = `<i class="bi bi-envelope me-2"></i>${footer.email}`;
    if (locationEl) locationEl.innerHTML = `<i class="bi bi-geo-alt me-2"></i>${footer.location}`;
    if (instagramHandleEl) instagramHandleEl.textContent = footer.instagramHandle;
}

function updatePageMeta(lang, t) {
    // Update page title
    document.title = `ZincArt - ${t.hero.title}`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = t.hero.description;
    }
}

function updateStats(stats) {
    const titleEl = document.querySelector('.stats-section h2');
    const subtitleEl = document.querySelector('.stats-section .lead');
    const experienceEl = document.querySelector('.counter-label');
    const projectsEl = document.querySelectorAll('.counter-label')[1];
    const warrantyEl = document.querySelectorAll('.counter-label')[2];
    
    if (titleEl) titleEl.textContent = stats.title;
    if (subtitleEl) subtitleEl.textContent = stats.subtitle;
    if (experienceEl) experienceEl.textContent = stats.experience;
    if (projectsEl) projectsEl.textContent = stats.projects;
    if (warrantyEl) warrantyEl.textContent = stats.warranty;
}

function updatePricing(pricing) {
    const titleEl = document.querySelector('#pricing h2');
    const subtitleEl = document.querySelector('#pricing .lead');
    const consultationTitleEl = document.querySelector('.consultation-title');
    const priceValueEl = document.querySelector('.price-value');
    const priceNoteEl = document.querySelector('.price-note');
    const ctaEl = document.querySelector('.consultation-cta .btn');
    const responseEl = document.querySelector('.consultation-cta .small');
    
    if (titleEl) titleEl.textContent = pricing.title;
    if (subtitleEl) subtitleEl.textContent = pricing.subtitle;
    if (consultationTitleEl) consultationTitleEl.textContent = pricing.consultation.title;
    if (priceValueEl) priceValueEl.textContent = pricing.consultation.price;
    if (priceNoteEl) priceNoteEl.textContent = pricing.consultation.note;
    if (ctaEl) ctaEl.textContent = pricing.consultation.cta;
    if (responseEl) responseEl.textContent = pricing.consultation.response;
    
    // Update consultation features
    const features = document.querySelectorAll('.consultation-features .feature-item span');
    pricing.consultation.features.forEach((feature, index) => {
        if (features[index]) {
            features[index].textContent = feature;
        }
    });
}

function updateParallax(parallax) {
    const titleEl = document.querySelector('.parallax-content h2');
    const subtitleEl = document.querySelector('.parallax-content .lead');
    
    if (titleEl) titleEl.textContent = parallax.title;
    if (subtitleEl) subtitleEl.textContent = parallax.subtitle;
    
    // Update parallax features
    const featureTitles = document.querySelectorAll('.parallax-content h5');
    const featureDescs = document.querySelectorAll('.parallax-content .small');
    
    parallax.features.forEach((feature, index) => {
        if (featureTitles[index]) featureTitles[index].textContent = feature.title;
        if (featureDescs[index]) featureDescs[index].textContent = feature.description;
    });
}

function updateAdvantages(advantages) {
    const titleEl = document.querySelector('#advantages-title');
    const qualityTitleEl = document.querySelectorAll('.advantages .card-title')[0];
    const qualityDescEl = document.querySelectorAll('.advantages .card-text')[0];
    const speedTitleEl = document.querySelectorAll('.advantages .card-title')[1];
    const speedDescEl = document.querySelectorAll('.advantages .card-text')[1];
    const coverageTitleEl = document.querySelectorAll('.advantages .card-title')[2];
    const coverageDescEl = document.querySelectorAll('.advantages .card-text')[2];
    const teamTitleEl = document.querySelectorAll('.advantages .card-title')[3];
    const teamDescEl = document.querySelectorAll('.advantages .card-text')[3];
    
    if (titleEl) titleEl.textContent = advantages.title;
    if (qualityTitleEl) qualityTitleEl.textContent = advantages.quality.title;
    if (qualityDescEl) qualityDescEl.textContent = advantages.quality.description;
    if (speedTitleEl) speedTitleEl.textContent = advantages.speed.title;
    if (speedDescEl) speedDescEl.textContent = advantages.speed.description;
    if (coverageTitleEl) coverageTitleEl.textContent = advantages.coverage.title;
    if (coverageDescEl) coverageDescEl.textContent = advantages.coverage.description;
    if (teamTitleEl) teamTitleEl.textContent = advantages.team.title;
    if (teamDescEl) teamDescEl.textContent = advantages.team.description;
}

function updateFeatures(features) {
    const titleEl = document.querySelector('#features-title');
    const subtitleEl = document.querySelector('#features .lead');
    
    if (titleEl) titleEl.textContent = features.title;
    if (subtitleEl) subtitleEl.textContent = features.subtitle;
}

function updateLoader(loader) {
    const loadingEl = document.querySelector('.loader-subtitle');
    if (loadingEl) loadingEl.textContent = loader.loading;
}

function updateMenu(menu) {
    const menuTitleEl = document.querySelector('#offcanvasNavLabel');
    if (menuTitleEl) menuTitleEl.textContent = menu.title;
}

function updateContactInfo(contact) {
    // Update contact info sections that might exist
    const contactInfoSections = document.querySelectorAll('.contact-info-card');
    contactInfoSections.forEach((section, index) => {
        const title = section.querySelector('h5');
        const text = section.querySelector('p');
        
        if (index === 0 && title) {
            title.innerHTML = `<i class="bi bi-geo-alt"></i> ${contact.title}`;
        }
        if (index === 1 && title) {
            title.innerHTML = `<i class="bi bi-telephone"></i> Ligue-nos`;
        }
        if (index === 2 && title) {
            title.innerHTML = `<i class="bi bi-envelope"></i> Escreva-nos`;
        }
    });
}

function updateServices(services) {
    const titleEl = document.querySelector('#services h2');
    if (titleEl) titleEl.textContent = services.title;
    
    // Update service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceData = [
        services.roofing,
        services.facades,
        services.gutters,
        services.decor,
        services.repair,
        services.design
    ];
    
    serviceCards.forEach((card, index) => {
        if (serviceData[index]) {
            const title = card.querySelector('.card-title');
            const desc = card.querySelector('.card-text');
            if (title) {
                // Clear existing content and rebuild with icon
                const icon = title.querySelector('i');
                if (icon) {
                    title.innerHTML = icon.outerHTML + ' ' + serviceData[index].title;
                } else {
                    title.textContent = serviceData[index].title;
                }
            }
            if (desc) desc.textContent = serviceData[index].description;
        }
    });
}

function updateMaterials(materials) {
    const titleEl = document.querySelector('#materials h2');
    if (titleEl) titleEl.textContent = materials.title;
    
    // Update material items in the list
    const materialItems = document.querySelectorAll('.material-item');
    const materialData = [
        { 
            title: materials.zinc, 
            subtitle: "VMZINC • elZinc • RHEINZINK", 
            desc: materials.zincDesc || "Líder mundial em zinco titânio" 
        },
        { 
            title: materials.copper, 
            subtitle: "Materiais de alta qualidade", 
            desc: materials.copperDesc || "Durabilidade e resistência excepcionais" 
        },
        { 
            title: materials.composites, 
            subtitle: materials.compositesDesc, 
            desc: materials.compositesDescFull || "Tecnologia avançada para máxima performance" 
        }
    ];
    
    materialItems.forEach((item, index) => {
        if (materialData[index]) {
            const titleEl = item.querySelector('h5');
            const subtitleEl = item.querySelector('p');
            const descEl = item.querySelector('.material-desc');
            
            if (titleEl) titleEl.textContent = materialData[index].title;
            if (subtitleEl) subtitleEl.textContent = materialData[index].subtitle;
            if (descEl) descEl.textContent = materialData[index].desc;
        }
    });
}

function updateContactDark(contact) {
    // Update contact dark section
    const contactDarkTitle = document.querySelector('.contact-dark h2');
    const contactDarkSubtitle = document.querySelector('.contact-dark .lead');
    
    if (contactDarkTitle) contactDarkTitle.textContent = contact.contactInfo.title;
    if (contactDarkSubtitle) contactDarkSubtitle.textContent = contact.contactInfo.subtitle;
    
    // Update contact info cards in dark section
    const contactCards = document.querySelectorAll('.contact-dark .contact-info-card');
    contactCards.forEach((card, index) => {
        const title = card.querySelector('h5');
        const text = card.querySelector('p');
        const small = card.querySelector('.small');
        
        if (index === 0 && title) {
            title.innerHTML = `<i class="bi bi-telephone"></i> Ligue-nos`;
        }
        if (index === 1 && title) {
            title.innerHTML = `<i class="bi bi-envelope"></i> Escreva-nos`;
        }
        if (index === 2 && title) {
            title.innerHTML = `<i class="bi bi-geo-alt"></i> ${contact.contactInfo.allPortugal}`;
        }
        
        if (text) {
            if (index === 0) text.textContent = contact.phone;
            if (index === 1) text.textContent = contact.email;
            if (index === 2) text.textContent = contact.contactInfo.locations;
        }
        
        if (small) {
            if (index === 0) small.textContent = 'Seg-Sáb: 8:00-20:00';
            if (index === 1) small.textContent = contact.contactInfo.responseTime;
            if (index === 2) small.textContent = contact.contactInfo.freeVisit;
        }
    });
}

function updateWarranty(warranty) {
    // Update warranty sections - find elements by text content
    const allH5 = document.querySelectorAll('h5');
    const allP = document.querySelectorAll('p');
    
    allH5.forEach(title => {
        const text = title.textContent.toLowerCase();
        if (text.includes('10 лет гарантии') || text.includes('10-year warranty') || text.includes('10 anos de garantia')) {
            title.textContent = warranty.title;
        }
    });
    
    allP.forEach(desc => {
        const text = desc.textContent.toLowerCase();
        if (text.includes('полная гарантия') || text.includes('complete warranty') || text.includes('garantia completa')) {
            desc.textContent = warranty.description;
        }
    });
}

function updateCoverage(coverage) {
    // Update coverage sections - find elements by text content
    const allH5 = document.querySelectorAll('h5');
    const allP = document.querySelectorAll('p');
    
    allH5.forEach(title => {
        const text = title.textContent.toLowerCase();
        if (text.includes('по всей португалии') || text.includes('throughout portugal') || text.includes('em todo o portugal')) {
            title.textContent = coverage.title;
        }
    });
    
    allP.forEach(desc => {
        const text = desc.textContent.toLowerCase();
        if (text.includes('работаем в любом регионе') || text.includes('we work in any region') || text.includes('trabalhamos em qualquer região')) {
            desc.textContent = coverage.description;
        }
    });
}

function updateSpeed(speed) {
    // Update speed sections - find elements by text content
    const allH5 = document.querySelectorAll('h5');
    const allP = document.querySelectorAll('p');
    
    allH5.forEach(title => {
        const text = title.textContent.toLowerCase();
        if (text.includes('быстрые сроки') || text.includes('fast timelines') || text.includes('prazos rápidos')) {
            title.textContent = speed.title;
        }
    });
    
    allP.forEach(desc => {
        const text = desc.textContent.toLowerCase();
        if (text.includes('смета за 24-48 часов') || text.includes('estimate in 24-48 hours') || text.includes('orçamento em 24-48 horas')) {
            desc.textContent = speed.description;
        }
    });
}

function updateMaterialsSection(materials) {
    // Update materials sections - find elements by text content
    const allH5 = document.querySelectorAll('h5');
    const allP = document.querySelectorAll('p');
    
    allH5.forEach(title => {
        const text = title.textContent.toLowerCase();
        if (text.includes('сертифицированные материалы') || text.includes('certified materials') || text.includes('materiais certificados')) {
            title.textContent = materials.title;
        }
    });
    
    allP.forEach(desc => {
        const text = desc.textContent.toLowerCase();
        if (text.includes('только премиальные материалы') || text.includes('only premium materials') || text.includes('apenas materiais premium')) {
            desc.textContent = materials.description;
        }
    });
}

// Dynamic Gallery
function initDynamicGallery() {
    const galleryContainer = document.getElementById('dynamicGallery');
    if (!galleryContainer) return;

    // Gallery images data
    const galleryImages = [
        { src: 'g1.JPG', alt: 'Кровля — проект' },
        { src: 'g2.JPG', alt: 'Фасад — проект' },
        { src: 'g3.jpg', alt: 'Водосток — проект' },
        { src: 'g4.jpg', alt: 'Кровля — объект' },
        { src: 'g5.jpg', alt: 'Фасад — объект' },
        { src: 'g6.jpg', alt: 'Водостоки — объект' },
        { src: 'g7.jpg', alt: 'Кровля — детали' },
        { src: 'g8.jpg', alt: 'Фасад — детали' },
        { src: 'g9.jpg', alt: 'Водостоки — детали' },
        { src: 'g10.jpg', alt: 'Кровля — современный проект' },
        { src: 'g11.jpg', alt: 'Фасад — современный проект' },
        { src: 'g12.jpg', alt: 'Водостоки — современный проект' },
        { src: 'g13.jpg', alt: 'Кровля — архитектурное решение' },
        { src: 'g14.jpg', alt: 'Фасад — архитектурное решение' },
        { src: 'g15.jpg', alt: 'Водостоки — архитектурное решение' },
        { src: 'g16.jpg', alt: 'Кровля — премиум качество' },
        { src: 'g17.jpg', alt: 'Фасад — премиум качество' },
        { src: 'g18.jpg', alt: 'Водостоки — премиум качество' },
        { src: 'g19.jpg', alt: 'Комплексное решение' }
    ];

    // Generate gallery items
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'col-6 col-lg-4';
        
        galleryItem.innerHTML = `
            <a class="gallery-thumb glightbox" href="assets/images/gallery/${image.src}" data-gallery="zincart">
                <img src="assets/images/gallery/${image.src}" alt="${image.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="bi bi-zoom-in"></i>
                </div>
            </a>
        `;
        
        galleryContainer.appendChild(galleryItem);
    });
    
    // Reinitialize lightbox after dynamic content is added
    setTimeout(() => {
        if (typeof GLightbox !== 'undefined') {
            // Destroy existing lightbox if any
            if (window.glightboxInstance) {
                window.glightboxInstance.destroy();
            }
            
            // Create new lightbox instance
            window.glightboxInstance = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: false,
                skin: 'clean',
                width: '90vw',
                height: '90vh',
                zoomable: true,
                draggable: true,
                dragToleranceX: 40,
                dragToleranceY: 65,
                preload: true,
                slideEffect: 'slide',
                moreText: 'Показать больше',
                moreLength: 60,
                closeOnOutsideClick: true,
                closeButton: true,
                touchFollowAxis: true,
                keyboardNavigation: true,
                closeOnEscape: true,
                autoFocus: true,
                openEffect: 'zoom',
                closeEffect: 'zoom',
                slideEffect: 'slide'
            });
            
            console.log('GLightbox reinitialized for dynamic gallery');
        }
    }, 200);
}

// Lightbox and Gallery
function initLightbox() {
    // Wait for DOM to be ready and images to load
    setTimeout(() => {
        if (typeof GLightbox !== 'undefined') {
            window.glightboxInstance = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: false,
                skin: 'clean',
                width: '90vw',
                height: '90vh',
                zoomable: true,
                draggable: true,
                dragToleranceX: 40,
                dragToleranceY: 65,
                preload: true,
                slideEffect: 'slide',
                moreText: 'Показать больше',
                moreLength: 60,
                closeOnOutsideClick: true,
                closeButton: true,
                touchFollowAxis: true,
                keyboardNavigation: true,
                closeOnEscape: true,
                autoFocus: true,
                openEffect: 'zoom',
                closeEffect: 'zoom',
                slideEffect: 'slide'
            });
            
            console.log('GLightbox initialized successfully');
        } else {
            console.error('GLightbox is not loaded');
        }
    }, 100);
}


// Initialize Swiper for materials slider
function initMaterialsSlider() {
    if (typeof Swiper !== 'undefined') {
        const materialsSwiper = new Swiper('.materials-swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                const otherAnswer = q.nextElementSibling;
                if (otherAnswer) {
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                this.classList.add('active');
                if (answer) {
                    answer.classList.add('active');
                }
            }
        });
    });
}

// Process Accordion
function initProcessAccordion() {
    const processCards = document.querySelectorAll('.process-step-card');
    
    processCards.forEach(card => {
        const header = card.querySelector('.step-header');
        
        if (header) {
            header.addEventListener('click', function() {
                const isActive = card.classList.contains('active');
                
                // Close all other cards
                processCards.forEach(c => {
                    c.classList.remove('active');
                });
                
                // Toggle current card
                if (!isActive) {
                    card.classList.add('active');
                }
            });
        }
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    // Simple fallback: animate all counters after a delay
    setTimeout(() => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            if (target > 0) {
                animateCounter(counter, target);
            }
        });
    }, 500);
    
    // Also use intersection observer for better UX
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target')) || 0;
                    
                    if (target > 0 && counter.textContent === '0') {
                        animateCounter(counter, target);
                    }
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.3 });
        
        counters.forEach(counter => {
            if (counter.getAttribute('data-target')) {
                counterObserver.observe(counter);
            }
        });
    }
}

function animateCounter(counter, target) {
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// To Top Button
function initToTop() {
    const toTopBtn = document.querySelector('.to-top-modern');
    
    if (toTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                toTopBtn.classList.add('visible');
            } else {
                toTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        toTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('#lead');
    const successAlert = document.querySelector('#formSuccess');
    const errorAlert = document.querySelector('#formError');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      // Basic validation
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      const consent = form.querySelector('#consent').checked;
  
      if (!name || !email || !message || !consent) {
        e.preventDefault(); // block only if invalid
        showAlert(errorAlert, 'Por favor, preencha todos os campos obrigatórios e concorde com o tratamento de dados.');
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        showAlert(errorAlert, 'Por favor, introduza um endereço de email válido.');
        return;
      }
  
      // IMPORTANT: do NOT reset or show success here.
      // Let the browser POST to Formspree.
    });
  }
  

// Show Alert
function showAlert(alert, message) {
    // Hide all alerts
    document.querySelectorAll('.alert').forEach(a => a.classList.add('d-none'));
    
    // Show specific alert
    alert.textContent = message;
    alert.classList.remove('d-none');
    
    // Hide alert after 5 seconds
    setTimeout(() => {
        alert.classList.add('d-none');
    }, 5000);
}

// WhatsApp Integration
function initWhatsApp() {
    const whatsappBtns = document.querySelectorAll('#whatsappBtn, #whatsappBtnMobile, .btn-whatsapp');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
}

// Open WhatsApp
function openWhatsApp() {
    const phoneNumber = '351935610516'; // Portuguese number format
    let message = 'Olá! Tenho interesse nos serviços de revestimentos em zinco e cobre.';
    
    if (currentLanguage === 'en') {
        message = 'Hello! I am interested in zinc and copper cladding services.';
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Update Footer Year
function updateFooterYear() {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    
    if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Image Size Generator Utility
function makeSrcSet(basePath, widths = [480, 768, 1024, 1440, 1920], ext = 'jpg') {
    const src = `${basePath}-${Math.min(...widths)}.${ext}`;
    const srcset = widths.map(w => `${basePath}-${w}.${ext} ${w}w`).join(', ');
    return { src, srcset };
}

function applyResponsiveImage(imgEl, basePath, widths, ext = 'jpg') {
    const { src, srcset } = makeSrcSet(basePath, widths, ext);
    imgEl.src = src;
    imgEl.srcset = srcset;
    imgEl.sizes = '(min-width:1200px) 33vw, (min-width:768px) 50vw, 100vw';
}

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance Optimization
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Service Worker Registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
