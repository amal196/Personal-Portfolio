// =====================
// DARK / LIGHT MODE
// =====================
const themeToggle = document.getElementById("themeToggle");

// Load saved preference — defaults to light mode if none saved
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark"){
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
}else{
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if(document.body.classList.contains("light-mode")){
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    }else{
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// =====================
// MOBILE MENU
// =====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
// Close menu after click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// =====================
// ROTATING WORD IN HEADLINE
// =====================
const rotatingWordEl = document.getElementById("rotatingWord");
const rotatingWords = ["clean", "fast", "responsive", "accessible", "delightful"];
let wordIndex = 0;
function cycleRotatingWord(){
    if(!rotatingWordEl) return;
    rotatingWordEl.style.opacity = "0.45";
    rotatingWordEl.style.transform = "translateY(4px)";
    setTimeout(() => {
        wordIndex = (wordIndex + 1) % rotatingWords.length;
        rotatingWordEl.textContent = rotatingWords[wordIndex];
        rotatingWordEl.style.opacity = "1";
        rotatingWordEl.style.transform = "translateY(0)";
    }, 180);
}
if(rotatingWordEl){
    setInterval(cycleRotatingWord, 2200);
}

// =====================
// SCROLL PROGRESS BAR
// =====================
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + "%";
});

// =====================
// ACTIVE NAV LINK ON SCROLL
// =====================
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[data-section]");
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            navAnchors.forEach(a => a.classList.remove("active"));
            const activeLink = document.querySelector(
                `.nav-links a[data-section="${entry.target.id}"]`
            );
            if(activeLink){ activeLink.classList.add("active"); }
        }
    });
}, { rootMargin: "-40% 0px -50% 0px" });
sections.forEach(sec => navObserver.observe(sec));

// =====================
// MAGNETIC BUTTON HOVER
// =====================
document.querySelectorAll(".btn-primary, .btn-secondary").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

// =====================
// SCROLL REVEAL
// =====================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// =====================
// SPOTLIGHT / GLOW CURSOR ON CARDS
// =====================
document.querySelectorAll('.card, .project-card, .stat').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});

// =====================
// 3D TILT ON PROJECT / HIGHLIGHT CARDS
// =====================
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;
        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform =
            'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// =====================
// ANIMATED NUMBER COUNTERS
// =====================
function animateCounter(el){
    const target = +el.getAttribute('data-count');
    const suffix = el.hasAttribute('data-suffix') ? el.getAttribute('data-suffix') : '+';
    let count = 0;
    const steps = 1200 / 16;
    const increment = target / steps;
    const counter = setInterval(() => {
        count += increment;
        if(count >= target){
            el.textContent = target + suffix;
            clearInterval(counter);
        }else{
            el.textContent = Math.floor(count) + suffix;
        }
    }, 16);
}
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat h3[data-count]').forEach(el => statObserver.observe(el));

// =====================
// STAT CARDS -> CLICK TO JUMP TO SECTION
// =====================
document.querySelectorAll('.stat[data-target]').forEach(stat => {
    stat.style.cursor = 'pointer';
    stat.addEventListener('click', () => {
        const target = document.querySelector(stat.getAttribute('data-target'));
        if(target){ target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// =====================
// HERO FEATURED WORK PREVIEW ROTATION
// =====================
const previewCard = document.getElementById("projectPreviewCard");
if(previewCard){
    const slides = previewCard.querySelectorAll(".preview-slide");
    const segments = previewCard.querySelectorAll(".segment");
    let previewIndex = 0;
    let previewTimer;

    function showPreviewSlide(i){
        slides.forEach(s => s.classList.remove("active"));
        slides[i].classList.add("active");

        segments.forEach((seg, idx) => {
            seg.classList.remove("active", "done");
            if(idx < i){ seg.classList.add("done"); }
        });
        segments[i].classList.add("active");
        previewIndex = i;
    }
    function nextPreviewSlide(){
        showPreviewSlide((previewIndex + 1) % slides.length);
    }
    function startPreviewRotation(){
        previewTimer = setInterval(nextPreviewSlide, 3500);
    }
    function stopPreviewRotation(){
        clearInterval(previewTimer);
    }
    startPreviewRotation();
    previewCard.addEventListener("mouseenter", stopPreviewRotation);
    previewCard.addEventListener("mouseleave", startPreviewRotation);
    segments.forEach((seg, i) => {
        seg.addEventListener("click", (e) => {
            e.stopPropagation();
            showPreviewSlide(i);
            stopPreviewRotation();
            startPreviewRotation();
        });
    });
    previewCard.addEventListener("click", () => {
        const target = document.querySelector("#projects");
        if(target){ target.scrollIntoView({ behavior: "smooth" }); }
    });
}

// =====================
// TOAST FOR PLACEHOLDER LINKS
// =====================
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message){
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if(link && link.getAttribute('href') === 'javascript:void(0)'){
        e.preventDefault();
        const label = link.textContent.trim() || link.getAttribute('aria-label') || 'This link';
        showToast(`${label} isn't added yet — update the href in the code once your project is live.`);
    }
});

// =====================
// PROJECT DETAILS MODAL
// =====================
const projectsData = {
    clinicq: {
        icon: "fa-solid fa-hospital",
        title: "ClinicQ",
        description: "A live queue management dashboard built for clinics and hospitals. Instead of appointment booking, patients get real, live token tracking — they can see exactly how many people are ahead of them and the estimated wait time, so they don't have to sit around a waiting room the whole time.",
        features: [
            "Live token tracking with position in queue",
            "Estimated wait time calculation per patient",
            "Real-time alerts if the doctor is running late",
            "Sidebar-based dashboard navigation",
            "Real-time stat cards for clinic overview",
            "Patient status donut chart",
            "Queue health monitoring panel for staff"
        ],
        tech: ["React", "JavaScript", "HTML5", "CSS3"],
        live: "https://clinic-q-two.vercel.app/",
        github: "https://github.com/amal196/Clinic-Q"
    },
    novacart: {
        icon: "fa-solid fa-cart-shopping",
        title: "NovaCart",
        description: "A modern e-commerce frontend built with React and Vite, featuring product browsing, category filters, a detailed product page, and a full cart and wishlist system — all backed by a live product API with persistent state.",
        features: [
            "Home page with hero banner and featured products",
            "Category filter pills (Phones, Laptops, Shoes, Watches, Accessories, Beauty)",
            "Product detail pages with full information",
            "Cart and wishlist with add/remove functionality",
            "State persisted with localStorage",
            "Live product data from an external API"
        ],
        tech: ["React", "Context API", "React Router", "Vite"],
        live: "https://novacart-blond.vercel.app/",
        github: "https://github.com/amal196/Novacart"
    },
    spendwise: {
        icon: "fa-solid fa-wallet",
        title: "SpendWise",
        description: "A personal finance tracker for logging income, expenses and budgets at a glance. Built as a single, no-scroll dark-themed screen so everything important is visible at once.",
        features: [
            "Balance and income/expense overview",
            "Transaction log",
            "Budget tracking",
            "Expense breakdown pie chart",
            "Smart spending insights section",
            "Dark-themed, single-screen layout"
        ],
        tech: ["JavaScript", "HTML5", "CSS3"],
        live: "https://amal196.github.io/Spendwise-expense-tracker/",
        github: "https://github.com/amal196/Spendwise-expense-tracker"
    },
    portfolio: {
        icon: "fa-solid fa-laptop-code",
        title: "Portfolio Website",
        description: "This very site — a fully custom-built, responsive personal portfolio with a complete design system built from scratch, rather than a template.",
        features: [
            "Dark / light theme toggle with saved preference",
            "Scroll-reveal animations throughout",
            "3D tilt and spotlight hover effects on cards",
            "Animated stats counters and scroll progress bar",
            "Fully responsive across mobile, tablet and desktop"
        ],
        tech: ["JavaScript", "HTML5", "CSS3"],
        live: "javascript:void(0)",
        github: "javascript:void(0)"
    }
};

const projectModal = document.getElementById("projectModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalFeatures = document.getElementById("modalFeatures");
const modalTech = document.getElementById("modalTech");
const modalLive = document.getElementById("modalLive");
const modalGithub = document.getElementById("modalGithub");
const modalClose = document.getElementById("modalClose");

function openProjectModal(key){
    const data = projectsData[key];
    if(!data) return;
    modalIcon.innerHTML = `<i class="${data.icon}"></i>`;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join("");
    modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join("");
    modalLive.href = data.live;
    modalGithub.href = data.github;
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
}
function closeProjectModal(){
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
}
document.querySelectorAll(".btn-view-details, .btn-view-details-link").forEach(btn => {
    btn.addEventListener("click", () => openProjectModal(btn.getAttribute("data-project")));
});
modalClose.addEventListener("click", closeProjectModal);
projectModal.addEventListener("click", (e) => {
    if(e.target === projectModal) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeProjectModal();
});

// =====================
// BACK TO TOP BUTTON
// =====================
const backToTopBtn = document.getElementById("backToTop");
if(backToTopBtn){
    window.addEventListener("scroll", () => {
        if(window.scrollY > 500){
            backToTopBtn.classList.add("show");
        }else{
            backToTopBtn.classList.remove("show");
        }
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}