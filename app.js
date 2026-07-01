document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initHeroSlider();
  initCounters();
  initProjectTabs();
  initPropertySearch();
  initContactForm();
});

/* 1. STICKY HEADER */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 2. MOBILE MENU DRAWER */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle menu button icon (hamburger to X)
    const icon = menuBtn.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('active')) {
        icon.className = 'ion-close';
      } else {
        icon.className = 'ion-navicon';
      }
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'ion-navicon';
    }
  });
}

/* 3. SCROLL REVEAL ANIMATIONS */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(reveal => observer.observe(reveal));
}

/* 4. HERO SLIDESHOW CAROUSEL */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const slideInterval = 6000; // 6 seconds
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  // Rotate slides automatically
  setInterval(nextSlide, slideInterval);
}

/* 5. COUNT-UP COUNTERS (About Us page) */
function initCounters() {
  const counters = document.querySelectorAll('.counter-box .number');
  if (counters.length === 0) return;
  
  const counterSection = document.querySelector('.counters-container');
  if (!counterSection) return;
  
  let started = false;
  
  const startCounting = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50; // Speed adjustment
      
      const updateCount = () => {
        if (count < target) {
          count = Math.min(target, Math.ceil(count + speed));
          counter.innerText = count + suffix;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + suffix;
        }
      };
      updateCount();
    });
  };
  
  // Trigger counters on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        startCounting();
        started = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(counterSection);
}

/* 6. INTERACTIVE PROJECT TABS */
function initProjectTabs() {
  const tabContainers = document.querySelectorAll('.project-tabs-container');
  if (tabContainers.length === 0) return;
  
  tabContainers.forEach(container => {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Deactivate all buttons in this container
        tabBtns.forEach(b => b.classList.remove('active'));
        // Hide all panels in this container
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Activate current button and panel
        btn.classList.add('active');
        const activePanel = container.querySelector(`.tab-panel[data-panel="${tabId}"]`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  });
}

/* 7. PROPERTY REAL-TIME SEARCH FILTER SYSTEM */
// Mock property database based on Sector B-17 and Istanbul
const mockProperties = [
  { id: 1, name: 'Alain Smart Home Villa', category: 'villa', type: 'sale', price: 380000, location: 'Block F, B-17 MPCHS, Islamabad', beds: 4, baths: 4, size: 2250, image: 'images/smart_homes.jpg' },
  { id: 2, name: 'Sapphire Mall Retail Shop', category: 'apartment', type: 'sale', price: 120000, location: 'GT Road, Phase-I, Wah Model Town', beds: 0, baths: 1, size: 450, image: 'images/sapphire_mall.jpg' },
  { id: 3, name: 'Arfat Istanbul Penthouse', category: 'apartment', type: 'sale', price: 420000, location: 'West Istanbul Marina, Istanbul, Turkey', beds: 3, baths: 2, size: 1800, image: 'images/arfat_insaat.jpg' },
  { id: 4, name: 'Sapphire Arcade Executive Office', category: 'townhouse', type: 'rent', price: 1500, location: 'Commercial Area GT Road, B-17 Islamabad', beds: 0, baths: 2, size: 1200, image: 'images/sapphire_arcade.jpg' },
  { id: 5, name: 'Alain Luxury Multi Villa', category: 'villa', type: 'sale', price: 480000, location: 'Sector B-17 Multi Gardens, Block-C-1, Islamabad', beds: 5, baths: 5, size: 3600, image: 'images/multivillas.jpg' },
  { id: 6, name: 'Istanbul Cozy Residence', category: 'apartment', type: 'sale', price: 270000, location: 'Beylikduzu, Istanbul, Turkey', beds: 2, baths: 2, size: 1100, image: 'images/arfat_insaat.jpg' },
  { id: 7, name: 'B-17 Standard Townhouse', category: 'townhouse', type: 'rent', price: 950, location: 'Block B, B-17 MPCHS, Islamabad', beds: 3, baths: 3, size: 1600, image: 'images/slide1.jpg' },
  { id: 8, name: 'Paragon Arcade Corner Shop', category: 'townhouse', type: 'sale', price: 190000, location: 'Commercial Markaz Block B, B-17 Islamabad', beds: 0, baths: 1, size: 600, image: 'images/paragon_arcade.jpg' }
];

function initPropertySearch() {
  const propertyGrid = document.getElementById('property-grid');
  if (!propertyGrid) return;
  
  // UI filter controls
  const keywordInput = document.getElementById('filter-keyword');
  const typeSelect = document.getElementById('filter-type');
  const catSelect = document.getElementById('filter-category');
  const budgetInput = document.getElementById('filter-budget');
  const budgetVal = document.getElementById('budget-val');
  
  // Format currency helper
  function formatCurrency(price, type) {
    if (type === 'rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  }
  
  // Render function
  function renderProperties(properties) {
    propertyGrid.innerHTML = '';
    
    if (properties.length === 0) {
      propertyGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px 0; color: var(--text-muted);">
        <h3>No Properties Found</h3>
        <p>Try adjusting your search criteria or price range.</p>
      </div>`;
      return;
    }
    
    properties.forEach(prop => {
      const card = document.createElement('div');
      card.className = 'property-card reveal active';
      card.innerHTML = `
        <div class="property-image">
          <img src="${prop.image}" alt="${prop.name}">
          <div class="property-price">${formatCurrency(prop.price, prop.type)}</div>
          <div class="property-status-tag ${prop.type}">${prop.type === 'sale' ? 'For Sale' : 'For Rent'}</div>
        </div>
        <div class="property-info">
          <h3 class="property-name">${prop.name}</h3>
          <div class="property-location">
            <i class="ion-ios-location"></i> ${prop.location}
          </div>
          <div class="property-specs">
            <span><i class="ion-ios-home"></i> ${prop.category.charAt(0).toUpperCase() + prop.category.slice(1)}</span>
            <span><i class="ion-ios-people"></i> ${prop.beds > 0 ? prop.beds + ' Beds' : 'Commercial'}</span>
            <span><i class="ion-arrow-resize"></i> ${prop.size} SqFt</span>
          </div>
        </div>
      `;
      propertyGrid.appendChild(card);
    });
  }
  
  // Filter logic
  function applyFilters() {
    const keyword = keywordInput.value.toLowerCase();
    const type = typeSelect.value;
    const category = catSelect.value;
    const budget = parseInt(budgetInput.value);
    
    // Update label
    budgetVal.innerText = `$${budget.toLocaleString()}`;
    
    const filtered = mockProperties.filter(prop => {
      // Keyword match
      const matchesKeyword = prop.name.toLowerCase().includes(keyword) || 
                             prop.location.toLowerCase().includes(keyword);
                             
      // Type match
      const matchesType = type === 'all' || prop.type === type;
      
      // Category match
      const matchesCategory = category === 'all' || prop.category === category;
      
      // Budget match
      const matchesBudget = prop.price <= budget;
      
      return matchesKeyword && matchesType && matchesCategory && matchesBudget;
    });
    
    renderProperties(filtered);
  }
  
  // Attach event listeners
  if (keywordInput) keywordInput.addEventListener('input', applyFilters);
  if (typeSelect) typeSelect.addEventListener('change', applyFilters);
  if (catSelect) catSelect.addEventListener('change', applyFilters);
  if (budgetInput) {
    budgetInput.addEventListener('input', applyFilters);
  }
  
  // Initial render
  applyFilters();
}

/* 8. CONTACT FORM SIMULATION & VALIDATION */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate successful form submit with a beautiful feedback modal or text replacement
    const formWrapper = form.parentElement;
    formWrapper.innerHTML = `
      <div class="glass-card" style="text-align: center; padding: 60px 40px; border-color: var(--color-accent); animation: fadeIn 0.8s ease;">
        <i class="ion-ios-checkmark-outline" style="font-size: 5rem; color: var(--color-accent); display: block; margin-bottom: 20px;"></i>
        <h2 style="margin-bottom: 10px;">Message Sent Successfully!</h2>
        <p style="margin-bottom: 25px;">Thank you for contacting Alain Enterprises, ${name}. Our investment consultant will get in touch with you shortly at ${email} or ${phone || 'your phone number'}.</p>
        <button class="btn btn-primary" onclick="window.location.reload();">Send Another Message</button>
      </div>
    `;
  });
}
