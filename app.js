// Chemistry Professor Hub JavaScript

// Product data with expanded services
const products = [
  {
    "id": "online-chemistry-courses",
    "name": "Online Chemistry Courses",
    "description": "Self-paced or live sessions for school, college, and competitive exams",
    "format": "Video/Live Class",
    "audience": "",
    "price": "Starts from ₹2,999",
    "category": "Educational"
  },
  {
    "id": "crash-courses",
    "name": "Crash Courses & Bootcamps",
    "description": "Focused topics: Organic/Physical/Inorganic, Spectroscopy, Drug Design etc.",
    "format": "Zoom/Google Meet",
    "audience": "",
    "price": "Starts from ₹1,499",
    "category": "Educational"
  },
  {
    "id": "lab-practicals",
    "name": "Lab Practicals Video Demos",
    "description": "Visual tutorials for UG/PG chemistry experiments",
    "format": "Pre-recorded",
    "audience": "",
    "price": "Starts from ₹499",
    "category": "Educational"
  },
  {
    "id": "question-bank",
    "name": "Question Bank & Study Material",
    "description": "Topic-wise question sets with solutions and notes",
    "format": "PDF/eBook",
    "audience": "",
    "price": "Starts from ₹299",
    "category": "Educational"
  },
  {
    "id": "mentorship",
    "name": "One-on-One Mentorship",
    "description": "Guidance for GATE, CSIR-NET, research, or thesis work",
    "format": "Personalized",
    "audience": "",
    "price": "Starts from ₹999/hour",
    "category": "Educational"
  },
  {
    "id": "lab-kits",
    "name": "DIY Chemistry Lab Kits",
    "description": "Small lab kits for school/college experiments",
    "format": "",
    "audience": "Students, Hobbyists",
    "price": "Starts from ₹1,299",
    "category": "Physical"
  },
  {
    "id": "reagents",
    "name": "Reagents & Solutions Packs",
    "description": "Pre-mixed solutions for common titrations, colorimetric tests",
    "format": "",
    "audience": "Schools & Colleges",
    "price": "Starts from ₹999",
    "category": "Physical"
  },
  {
    "id": "Designing-posters/Brochures/Logos",
    "name": "Periodic Table Posters",
    "description": "Creative, high-quality printable charts/posters",
    "format": "Digital/Physical",
    "audience": "",
    "price": "Starts from ₹199",
    "category": "Physical"
  },
  {
    "id": "paper-editing",
    "name": "Research Paper Editing",
    "description": "Proofreading, formatting, and suggestions for thesis/paper writing",
    "format": "",
    "audience": "M.Sc./PhD Scholars",
    "price": "Starts from ₹799",
    "category": "Service"
  },
  {
    "id": "mechanism-app",
    "name": "Organic Mechanism App",
    "description": "Interactive app to visualize reaction mechanisms",
    "format": "",
    "audience": "Students & Teachers",
    "price": "Starts from ₹599",
    "category": "Service"
  },
  {
    "id": "ppt-designer",
    "name": "PPT Designer",
    "description": "Professional presentation design for chemistry topics, lectures, and research presentations",
    "format": "Custom Design",
    "audience": "Students, Teachers, Researchers",
    "price": "₹1,000",
    "category": "Service"
  },
  {
    "id": "app-creation",
    "name": "App Creation",
    "description": "Custom mobile and web application development for chemistry education and research tools",
    "format": "Mobile/Web App",
    "audience": "Institutions, Educators",
    "price": "Starts from ₹5,000",
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

// DOM elements - will be initialized after DOM loads
let productsGrid, productsCount, noResults, searchInput, filterButtons, modal, modalBackdrop, modalClose;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupEventListeners();
  renderProducts();
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
}

// Set up event listeners
function setupEventListeners() {
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', handleSearch);
  }
  
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
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
}

// Handle search input
function handleSearch(e) {
  currentSearch = e.target.value.toLowerCase().trim();
  filterProducts();
}

// Handle filter button clicks
function handleFilterClick(e) {
  e.preventDefault();
  const button = e.target;
  const category = button.dataset.category;
  
  // Update current filter
  currentFilter = category;
  
  // Update active button
  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  
  // Filter and render products
  filterProducts();
}

// Filter products based on current search and category filter
function filterProducts() {
  filteredProducts = products.filter(product => {
    // Check search match
    const searchMatch = currentSearch === '' || 
      product.name.toLowerCase().includes(currentSearch) ||
      product.description.toLowerCase().includes(currentSearch) ||
      product.category.toLowerCase().includes(currentSearch) ||
      (product.format && product.format.toLowerCase().includes(currentSearch)) ||
      (product.audience && product.audience.toLowerCase().includes(currentSearch));
    
    // Check category filter match
    const categoryMatch = currentFilter === 'all' || product.category === currentFilter;
    
    return searchMatch && categoryMatch;
  });
  
  renderProducts();
}

// Render products to the grid
function renderProducts() {
  if (!productsGrid || !productsCount || !noResults) return;
  
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
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.productId = product.id;
  card.dataset.category = product.category;
  
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
    openModal(product);
  });
  
  return card;
}

// Open product details modal
function openModal(product) {
  if (!modal) return;
  
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
  
  // Update contact button links with current product context
  updateContactButtons(product);
  
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

// Update contact buttons with product context
function updateContactButtons(product) {
  const emailBtn = modal.querySelector('a[href*="mailto:"]');
  const callBtn = modal.querySelector('a[href*="tel:"]');
  const whatsappBtn = modal.querySelector('a[href*="wa.me"]');
  
  if (emailBtn) {
    const subject = encodeURIComponent(`Inquiry about ${product.name}`);
    const body = encodeURIComponent(`Hello,\n\nI am interested in learning more about "${product.name}".\n\nPrice: ${product.price}\nCategory: ${product.category}\n\nPlease provide more details.\n\nThank you!`);
    emailBtn.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }
  
  if (callBtn) {
    callBtn.href = `tel:${contact.phone}`;
  }
  
  if (whatsappBtn) {
    const message = encodeURIComponent(`Hello! I'm interested in "${product.name}" (${product.price}). Can you provide more details?`);
    whatsappBtn.href = `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=${message}`;
  }
}

// Close modal
function closeModal() {
  if (!modal) return;
  
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  if (!modal) return;
  
  if (e.key === 'Tab' && !modal.classList.contains('hidden')) {
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

// Smooth scrolling utility
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Smooth scrolling to contact section
function scrollToContact() {
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Analytics and tracking functions (placeholder for future implementation)
function trackProductView(productId) {
  console.log(`Product viewed: ${productId}`);
  // Add analytics tracking here
}

function trackContactAction(action, productId = null) {
  console.log(`Contact action: ${action}${productId ? ` for product: ${productId}` : ''}`);
  // Add analytics tracking here
}

// Error handling
function handleError(error) {
  console.error('Chemistry Professor Hub Error:', error);
  if (productsGrid) {
    productsGrid.innerHTML = `
      <div class="error-state">
        <h3>Oops! Something went wrong</h3>
        <p>Unable to load products. Please try refreshing the page.</p>
        <button onclick="location.reload()" class="btn btn--primary">Refresh Page</button>
      </div>
    `;
  }
}

// Initialize error handling
window.addEventListener('error', function(e) {
  handleError(e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  handleError(e.reason);
});
