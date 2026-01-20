// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}





// Navbar Transition on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search Button functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            // In a real app, you would redirect to search page:
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            searchInput.value = ''; // Clear input for demo
        } else {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Section Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(el => {
    observer.observe(el);
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Testimonials Slider: Duplicate info for infinite loop
const sliderTrack = document.getElementById('slider-track');
if (sliderTrack) {
    const cards = sliderTrack.innerHTML;
    sliderTrack.innerHTML += cards; // Duplicate content once to create the loop
}



// SIP Calculator Functionality
const calculateBtn = document.getElementById('calculate-sip');
const resultsContainer = document.getElementById('calculator-results');

if (calculateBtn && resultsContainer) {
    calculateBtn.addEventListener('click', function () {
        // Get input values
        const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
        const tenureYears = parseFloat(document.getElementById('investment-tenure').value);
        const annualReturnRate = parseFloat(document.getElementById('return-rate').value);

        // Validate inputs
        if (!monthlyInvestment || !tenureYears || !annualReturnRate) {
            alert('Please fill in all fields with valid numbers.');
            return;
        }

        if (monthlyInvestment <= 0 || tenureYears <= 0 || annualReturnRate < 0) {
            alert('Please enter positive values for all fields.');
            return;
        }

        // Calculate SIP
        const monthlyRate = annualReturnRate / 12 / 100; // Convert annual rate to monthly decimal
        const totalMonths = tenureYears * 12;

        // SIP Future Value Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
        let futureValue;
        if (monthlyRate === 0) {
            // If rate is 0, simple multiplication
            futureValue = monthlyInvestment * totalMonths;
        } else {
            futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        const totalInvested = monthlyInvestment * totalMonths;
        const estimatedReturns = futureValue - totalInvested;

        // Format numbers with US Dollar currency style
        const formatCurrency = (num) => {
            return '$' + num.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
            });
        };

        // Update result displays
        document.getElementById('total-invested').textContent = formatCurrency(totalInvested);
        document.getElementById('estimated-returns').textContent = formatCurrency(estimatedReturns);
        document.getElementById('maturity-amount').textContent = formatCurrency(futureValue);

        // Show results with animation
        resultsContainer.style.display = 'grid';

        // Trigger fade-in animation for result cards
        setTimeout(() => {
            const resultCards = resultsContainer.querySelectorAll('.result-card');
            resultCards.forEach(card => {
                card.classList.add('visible');
            });
        }, 100);

        // Smooth scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Allow Enter key to trigger calculation
    const calculatorInputs = document.querySelectorAll('.calculator-input-group input');
    calculatorInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });
}


// Language Toggle Functionality
const translations = {
    en: {
        // Navigation
        nav_home: "Home",
        nav_services: "Services",
        nav_why_us: "Why Us?",
        nav_gallery: "Our Gallery",
        nav_contact: "Contact Us",

        // Hero Section
        hero_title: "Your Trusted Local <span class=\"red-text\">Digital and Financial Service Provider </span>",
        hero_desc: "Welcome to Binisha Enterprises, your reliable local service shop in Pathalaiya, Bara, Nepal. We support our community by providing essential daily financial and digital services.",
        btn_explore: "Explore Services",
        btn_contact: "Get In Touch",
        float_experience: "20+ Years Experience",
        float_customers: "Trusted by 1000+ Customers",
        scroll_down: "Scroll Down",

        // Services Section
        services_subtitle: "What We Offer",
        services_title: "Our <span class=\"red-text\">Services</span>",
        svc_insurance_title: "Insurance Services",
        svc_insurance_desc: "We are agents for life, health, and vehicle insurance and also provide premium payment services.",
        svc_remittance_title: "Remittance / Money Transfer",
        svc_remittance_desc: "Quick and reliable money transfer to both local and international locations.",
        svc_ticket_title: "Air Ticket Booking",
        svc_ticket_desc: "Domestic and international flight ticket booking with confirmation assistance.",
        svc_recharge_title: "Mobile and DTH Recharge",
        svc_recharge_desc: "Recharge your mobile phone balance and DTH subscriptions easily.",
        svc_bill_title: "Bill Payment Service",
        svc_bill_desc: "Pay all local utility bills including electricity, internet, and water bills in one place.",

        // About Section
        about_subtitle: "Why Choose Us?",
        about_title: "Your Trusted <span class=\"red-text\">Digital Partner</span>",
        about_text_1: "With over 20 years of dedicated service in Pathlaiya, Binisha Enterprises has become the go-to destination for all digital and financial needs. We pride ourselves on delivering reliable, efficient, and customer-focused solutions that bridge the gap between traditional services and modern technology.",
        about_text_2: "Our team of experienced professionals is committed to providing personalized service, ensuring that every customer receives the attention and support they deserve. From internet connectivity to financial transactions, we make digital services accessible to everyone in our community.",
        about_signature: "Serving Katari with Pride,",
        about_agent: "Binisha Enterprises",
        cred_years_num: "20+",
        cred_years_label: "Years of Service",
        cred_customers_num: "100000+",
        cred_customers_label: "Happy Customers",
        cred_rank_num: "#1",
        cred_rank_label: "In Pathlaiya",

        // Gallery Section
        gallery_subtitle: "Make Memories",
        gallery_title: "Our <span class=\"red-text\">Gallery</span>",

        // Contact Section
        contact_subtitle: "Get in Touch",
        contact_title: "Contact <span class=\"red-text\">Us</span>",
        contact_info_title: "Binisha Enterprises",
        contact_info_desc: "Your trusted partner for digital and financial services in Pathlaiya. Visit us or get in touch for any assistance.",
        contact_phone_title: "Phone",
        contact_address_title: "Address",
        contact_address_val: "Pathalaiya Bazar, Bara, Nepal"
    },
    ne: {
        // Navigation
        nav_home: "गृहपृष्ठ",
        nav_services: "सेवाहरू",
        nav_why_us: "हामीलाई किन?",
        nav_gallery: "हाम्रो ग्यालरी",
        nav_contact: "सम्पर्क गर्नुहोस्",

        // Hero Section
        hero_title: "तपाईंको विश्वसनीय स्थानीय <span class=\"red-text\">डिजिटल र वित्तीय सेवा प्रदायक</span>",
        hero_desc: "बिनिशा इन्टरप्राइजेजमा स्वागत छ, पथलैया, बारा, नेपालमा तपाईंको भरपर्दो स्थानीय सेवा पसल। हामी आवश्यक दैनिक वित्तीय र डिजिटल सेवाहरू प्रदान गरेर हाम्रो समुदायलाई सहयोग गर्छौं।",
        btn_explore: "सेवाहरू अन्वेषण गर्नुहोस्",
        btn_contact: "सम्पर्कमा रहनुहोस्",
        float_experience: "२०+ वर्षको अनुभव",
        float_customers: "१०००+ ग्राहकहरूद्वारा विश्वसनीय",
        scroll_down: "तल स्क्रोल गर्नुहोस्",

        // Services Section
        services_subtitle: "हामी के प्रदान गर्छौं",
        services_title: "हाम्रा <span class=\"red-text\">सेवाहरू</span>",
        svc_insurance_title: "बीमा सेवाहरू",
        svc_insurance_desc: "हामी जीवन, स्वास्थ्य र सवारी साधन बीमाका एजेन्ट हौं र प्रीमियम भुक्तानी सेवाहरू पनि प्रदान गर्छौं।",
        svc_remittance_title: "रेमिट्यान्स / पैसा स्थानान्तरण",
        svc_remittance_desc: "स्थानीय र अन्तर्राष्ट्रिय दुवै स्थानहरूमा छिटो र भरपर्दो पैसा स्थानान्तरण।",
        svc_ticket_title: "हवाई टिकट बुकिङ",
        svc_ticket_desc: "पुष्टिकरण सहायताको साथ आन्तरिक र अन्तर्राष्ट्रिय उडान टिकट बुकिङ।",
        svc_recharge_title: "मोबाइल र DTH रिचार्ज",
        svc_recharge_desc: "आफ्नो मोबाइल फोन ब्यालेन्स र DTH सदस्यता सजिलै रिचार्ज गर्नुहोस्।",
        svc_bill_title: "बिल भुक्तानी सेवा",
        svc_bill_desc: "एकै ठाउँमा बिजुली, इन्टरनेट र पानीको बिल सहित सबै स्थानीय उपयोगिता बिलहरू तिर्नुहोस्।",

        // About Section
        about_subtitle: "हामीलाई किन छान्ने?",
        about_title: "तपाईंको विश्वसनीय <span class=\"red-text\">डिजिटल साझेदार</span>",
        about_text_1: "पथलैयामा २० वर्षभन्दा बढी समर्पित सेवाको साथ, बिनिशा इन्टरप्राइजेज सबै डिजिटल र वित्तीय आवश्यकताहरूको लागि मुख्य गन्तव्य भएको छ। हामी परम्परागत सेवा र आधुनिक प्रविधि बीचको खाडल पूर्ति गर्ने भरपर्दो, कुशल र ग्राहक-केन्द्रित समाधानहरू प्रदान गर्नमा गर्व गर्छौं।",
        about_text_2: "हाम्रो अनुभवी पेशेवरहरूको टोली व्यक्तिगत सेवा प्रदान गर्न प्रतिबद्ध छ, यो सुनिश्चित गर्दै कि प्रत्येक ग्राहकले उनीहरूले योग्य ध्यान र समर्थन प्राप्त गर्दछ। इन्टरनेट जडान देखि वित्तीय लेनदेन सम्म, हामी हाम्रो समुदायका सबैलाई डिजिटल सेवाहरू पहुँचयोग्य बनाउँछौं।",
        about_signature: "गर्वका साथ कटारी सेवा गर्दै,",
        about_agent: "बिनिशा इन्टरप्राइजेज",
        cred_years_num: "२०+",
        cred_years_label: "सेवाका वर्षहरू",
        cred_customers_num: "१०००००+",
        cred_customers_label: "खुसी ग्राहकहरू",
        cred_rank_num: "#१",
        cred_rank_label: "पथलैयामा",

        // Gallery Section
        gallery_subtitle: "सम्झनाहरू बनाउनुहोस्",
        gallery_title: "हाम्रो <span class=\"red-text\">ग्यालरी</span>",

        // Contact Section
        contact_subtitle: "सम्पर्कमा रहनुहोस्",
        contact_title: "सम्पर्क <span class=\"red-text\">गर्नुहोस्</span>",
        contact_info_title: "बिनिशा इन्टरप्राइजेज",
        contact_info_desc: "पथलैयामा डिजिटल र वित्तीय सेवाहरूको लागि तपाईंको विश्वस्त साझेदार। कुनै पनि सहायताको लागि हामीलाई भेट्नुहोस् वा सम्पर्क गर्नुहोस्।",
        contact_phone_title: "फोन",
        contact_address_title: "ठेगाना",
        contact_address_val: "पथलैया बजार, बारा, नेपाल"
    }
};

// Initialize language
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Function to switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update button text
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = lang === 'en' ? 'EN' : 'ने';
    }
}

// Apply saved language on page load
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLanguage);

    // Language toggle button event listener
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'ne' : 'en';
            switchLanguage(newLang);
        });
    }
});
