// Chemistry Professor Hub JavaScript

// Product data
const products = [
  {
    "id": "online-chemistry-courses",
    "name": "Online Chemistry Courses",
    "description": "Self-paced or live sessions for school, college, and competitive exams",
    "format": "Video/Live Class",
    "audience": "",
    "price": "₹2,999",
    "category": "Educational"
  },
  {
    "id": "crash-courses",
    "name": "Crash Courses & Bootcamps",
    "description": "Focused topics: Organic/Physical/Inorganic, Spectroscopy, Drug Design etc.",
    "format": "Zoom/Google Meet",
    "audience": "",
    "price": "₹1,499",
    "category": "Educational"
  },
  {
    "id": "lab-practicals",
    "name": "Lab Practicals Video Demos",
    "description": "Visual tutorials for UG/PG chemistry experiments",
    "format": "Pre-recorded",
    "audience": "",
    "price": "₹499",
    "category": "Educational"
  },
  {
    "id": "question-bank",
    "name": "Question Bank & Study Material",
    "description": "Topic-wise question sets with solutions and notes",
    "format": "PDF/eBook",
    "audience": "",
    "price": "₹299",
    "category": "Educational"
  },
  {
    "id": "mentorship",
    "name": "One-on-One Mentorship",
    "description": "Guidance for GATE, CSIR-NET, research, or thesis work",
    "format": "Personalized",
    "audience": "",
    "price": "₹999/hour",
    "category": "Educational"
  },
  {
    "id": "lab-kits",
    "name": "DIY Chemistry Lab Kits",
    "description": "Small lab kits for school/college experiments",
    "format": "",
    "audience": "Students, Hobbyists",
    "price": "₹1,299",
    "category": "Physical"
  },
  {
    "id": "reagents",
    "name": "Reagents & Solutions Packs",
    "description": "Pre-mixed solutions for common titrations, colorimetric tests",
    "format": "",
    "audience": "Schools & Colleges",
    "price": "₹999",
    "category": "Physical"
  },
  {
    "id": "paper-editing",
    "name": "Research Paper Editing",
    "description": "Proofreading, formatting, and suggestions for thesis/paper writing",
    "format": "",
    "audience": "M.Sc./PhD Scholars",
    "price": "₹799",
    "category": "Service"
  },
  {
    "id": "periodic-poster",
    "name": "Periodic Table Posters",
    "description": "Creative, high-quality printable charts/posters",
    "format": "Digital/Physical",
    "audience": "",
    "price": "₹199",
    "category": "Physical"
  },
  {
    "id": "mechanism-app",
    "name": "Organic Mechanism App",
    "description": "Interactive app to visualize reaction mechanisms",
    "format": "",
    "audience": "Students & Teachers",
    "price": "₹599",
    "category": "Service"
  }
];

// Contact information
const contact = {
  email: "ashokk.taduri@gmail.com",
  phone: "+91-9030726907"
};

// Global variables
let filteredProducts = [...products];
let currentFilter = 'all';
let currentSearch = '';

// DOM elements
let productsGrid, productsCount, noResults, searchInput, filterButtons, modal, modalBackdrop, modalClose;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeElements();
  setupEventListeners();
  renderProducts();
  updateStaticContactLinks();
});

// Initialize DOM elements
function initializeElements() {
  productsGrid = document.getElementById('products-grid');
  productsCount = document.getElementById('products-count');
  noResults = document.getElementById('no-results');
  searchInput = document.getElementById('search-input');
  filterButtons = document.querySelectorAll('.filter-btn');
  modal = document.getElementById('product-modal');
  modalBackdrop = document.getElementById('modal-backdrop');
  modalClose = document.getElementById('modal-close');
  
  console.log('Elements initialized:', {
    productsGrid: !!productsGrid,
    searchInput: !!searchInput,
    filterButtons: filterButtons.length,
    modal: !!modal
  });
}

// Set up event listeners
function setupEventListeners() {
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      console.log('Search input:', e.target.value);
      handleSearch(e);
    });
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(e);
      }
    });
  }
  
  // Filter buttons
  filterButtons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
      console.log('Filter button clicked:', e.target.dataset.category);
      handleFilterClick(e);
    });
  });
  
  // Modal event listeners
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
  
  console.log('Event listeners setup complete');
}

// Handle search input
function handleSearch(e) {
  currentSearch = e.target.value.toLowerCase().trim();
  console.log('Searching for:', currentSearch);
  filterProducts();
}

// Handle filter button clicks
function handleFilterClick(e) {
  e.preventDefault();
  const category = e.target.dataset.category;
  currentFilter = category;
  
  console.log('Filter changed to:', category);
  
  // Update active button
  filterButtons.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  
  filterProducts();
}

// Filter products based on current search and category filter
function filterProducts() {
  filteredProducts = products.filter(product => {
    const matchesSearch = currentSearch === '' || 
      product.name.toLowerCase().includes(currentSearch) ||
      product.description.toLowerCase().includes(currentSearch) ||
      product.category.toLowerCase().includes(currentSearch);
    
    const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  console.log(`Filtered products: ${filteredProducts.length} of ${products.length}`);
  renderProducts();
}

// Render products to the grid
function renderProducts() {
  if (!productsGrid || !productsCount || !noResults) {
    console.error('Required elements not found');
    return;
  }
  
  // Update products count
  productsCount.textContent = filteredProducts.length;
  
  // Show/hide no results message
  if (filteredProducts.length === 0) {
    productsGrid.style.display = 'none';
    noResults.classList.remove('hidden');
  } else {
    productsGrid.style.display = 'grid';
    noResults.classList.add('hidden');
  }
  
  // Clear existing products
  productsGrid.innerHTML = '';
  
  // Render filtered products
  filteredProducts.forEach((product, index) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
  
  console.log(`Rendered ${filteredProducts.length} products`);
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.productId = product.id;
  
  // Get category class for styling
  const categoryClass = product.category.toLowerCase();
  
  card.innerHTML = `
    <div class="product-header">
      <h3 class="product-name">${product.name}</h3>
      <span class="category-badge ${categoryClass}">${product.category}</span>
    </div>
    
    <p class="product-description">${product.description}</p>
    
    <div class="product-meta">
      ${product.format ? `<div class="meta-item"><strong>Format:</strong> ${product.format}</div>` : ''}
      ${product.audience ? `<div class="meta-item"><strong>Target Audience:</strong> ${product.audience}</div>` : ''}
    </div>
    
    <div class="product-footer">
      <div class="product-price">${product.price}</div>
      <span class="view-details">View Details →</span>
    </div>
  `;
  
  // Add click event listener to the entire card
  card.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Product card clicked:', product.name);
    openModal(product);
  });
  
  return card;
}

// Open product details modal
function openModal(product) {
  if (!modal) {
    console.error('Modal element not found');
    return;
  }
  
  console.log('Opening modal for:', product.name);
  
  // Populate modal content
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const modalCategory = document.getElementById('modal-category');
  const modalFormat = document.getElementById('modal-format');
  const modalAudience = document.getElementById('modal-audience');
  const formatContainer = document.getElementById('modal-format-container');
  const audienceContainer = document.getElementById('modal-audience-container');
  
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalDescription) modalDescription.textContent = product.description;
  if (modalPrice) modalPrice.textContent = product.price;
  if (modalCategory) {
    modalCategory.textContent = product.category;
    modalCategory.className = `category-badge ${product.category.toLowerCase()}`;
  }
  
  // Show/hide optional fields
  if (formatContainer && modalFormat) {
    if (product.format && product.format.trim()) {
      modalFormat.textContent = product.format;
      formatContainer.style.display = 'flex';
    } else {
      formatContainer.style.display = 'none';
    }
  }
  
  if (audienceContainer && modalAudience) {
    if (product.audience && product.audience.trim()) {
      modalAudience.textContent = product.audience;
      audienceContainer.style.display = 'flex';
    } else {
      audienceContainer.style.display = 'none';
    }
  }
  
  // Update contact button URLs with current contact information
  updateModalContactButtons();
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Focus on close button for accessibility
  setTimeout(() => {
    if (modalClose) {
      modalClose.focus();
    }
  }, 100);
}

// Update contact buttons in modal with current contact information
function updateModalContactButtons() {
  const emailBtn = modal.querySelector('a[href^="mailto:"]');
  const phoneBtn = modal.querySelector('a[href^="tel:"]');
  const whatsappBtn = modal.querySelector('a[href^="https://wa.me/"]');
  
  if (emailBtn) {
    emailBtn.href = `mailto:${contact.email}`;
    console.log('Updated email button:', emailBtn.href);
  }
  
  if (phoneBtn) {
    phoneBtn.href = `tel:${contact.phone}`;
    console.log('Updated phone button:', phoneBtn.href);
  }
  
  if (whatsappBtn) {
    // Remove the + and - from phone number for WhatsApp URL
    const whatsappNumber = contact.phone.replace(/[\+\-]/g, '');
    whatsappBtn.href = `https://wa.me/${whatsappNumber}`;
    console.log('Updated WhatsApp button:', whatsappBtn.href);
  }
}

// Update static contact links in the footer
function updateStaticContactLinks() {
  // Update contact section links (not in modal)
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]:not(.contact-btn)');
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]:not(.contact-btn)');
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]:not(.contact-btn)');
  
  emailLinks.forEach(link => {
    link.href = `mailto:${contact.email}`;
    console.log('Updated static email link:', link.href);
  });
  
  phoneLinks.forEach(link => {
    link.href = `tel:${contact.phone}`;
    console.log('Updated static phone link:', link.href);
  });
  
  whatsappLinks.forEach(link => {
    const whatsappNumber = contact.phone.replace(/[\+\-]/g, '');
    link.href = `https://wa.me/${whatsappNumber}`;
    console.log('Updated static WhatsApp link:', link.href);
  });
}

// Close modal
function closeModal() {
  if (!modal) return;
  
  console.log('Closing modal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  if (!modal || modal.classList.contains('hidden')) return;
  
  if (e.key === 'Tab') {
    // Keep focus within modal
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// Error handling
function handleError(error) {
  console.error('Chemistry Professor Hub Error:', error);
  if (productsGrid) {
    productsGrid.innerHTML = `
      <div class="error-state">
        <h3>Oops! Something went wrong</h3>
        <p>Unable to load products. Please try refreshing the page.</p>
      </div>
    `;
  }
}

// Contact button analytics tracking (placeholder for future implementation)
function trackContactClick(method, product = null) {
  console.log(`Contact initiated via ${method}`, product ? `for product: ${product.name}` : '');
  // Future: Add analytics tracking here
}

// Debug function to check application state
function debugApp() {
  console.log('Application Debug Info:', {
    totalProducts: products.length,
    filteredProducts: filteredProducts.length,
    currentFilter: currentFilter,
    currentSearch: currentSearch,
    contactInfo: contact
  });
}