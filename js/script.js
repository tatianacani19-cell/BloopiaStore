// ========== CART STATE ==========
let cart = JSON.parse(localStorage.getItem('bloopiaCart')) || [];

function saveCart() {
  localStorage.setItem('bloopiaCart', JSON.stringify(cart));
}

const categoryNames = {
  apparel: 'Ropa',
  accessories: 'Accesorios',
  home: 'Hogar',
  beauty: 'Belleza',
};

// ========== RENDER PRODUCTS ==========
function renderProducts(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" class="product-img-default" />
        ${p.hoverImage ? `<img src="${p.hoverImage}" alt="${p.name}" loading="lazy" class="product-img-hover" />` : ''}
        ${p.badge ? `<span class="product-badge ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <span class="product-category-tag">${categoryNames[p.category] || p.category}</span>
        <span class="product-price">$${p.price.toFixed(2)}</span>
        <button class="add-to-cart" data-id="${p.id}">
          <i class="fas fa-plus"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
  });
}

// ========== INIT PRODUCTS ==========
function initProducts() {
  const featured = getFeaturedProducts();
  renderProducts('featuredGrid', featured);
}

// ========== CART FUNCTIONS ==========
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ========== UPDATE CART UI ==========
function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  if (countEl) countEl.textContent = getCartCount();

  if (cart.length === 0) {
    if (itemsEl) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Tu carrito está vacío</p>
          <span>Agrega algunos productos para empezar</span>
        </div>
      `;
    }
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">$${item.price.toFixed(2)}</span>
          <div class="cart-item-qty">
            <button onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

// ========== NOTIFICATION ==========
function showNotification(message) {
  let notif = document.querySelector('.notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  notif.classList.add('show');
  clearTimeout(notif._timeout);
  notif._timeout = setTimeout(() => notif.classList.remove('show'), 2400);
}

// ========== WHATSAPP CHECKOUT ==========
function checkoutWhatsApp() {
  if (cart.length === 0) {
    showNotification('¡Tu carrito está vacío!');
    return;
  }

  const phone = '15551234567';
  let message = '¡Hola! Me gustaría pedir lo siguiente de BLOOPIA:\n\n';

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += `\nTotal: $${getCartTotal().toFixed(2)}`;
  message += '\n\nPor favor confirma disponibilidad y envío. ¡Gracias!';

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ========== NAVBAR SCROLL ==========
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backBtn = document.getElementById('backToTop');
  const current = window.scrollY;

  if (current > 100) {
    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  if (backBtn) {
    backBtn.classList.toggle('visible', current > 400);
  }

  lastScroll = current;
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ========== SEARCH TOGGLE ==========
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchOverlay) {
  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
      setTimeout(() => searchInput?.focus(), 100);
    }
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });
}

// ========== CART SIDEBAR ==========
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

function openCart() {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (cartToggle) cartToggle.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartSidebar?.classList.contains('active')) closeCart();
});

// ========== CHECKOUT BUTTON ==========
document.getElementById('checkoutBtn')?.addEventListener('click', checkoutWhatsApp);

// ========== HERO SLIDER ==========
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  if (!slides.length) return;

  let current = 0;
  let interval = null;
  const DELAY = 5000;

  function goTo(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    current = index;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, DELAY);
  }

  function stopAuto() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) {
        goTo(idx);
        restartAuto();
      }
    });
  });

  startAuto();
}

// ========== PROMO SLIDER ==========
function initPromoSlider() {
  const slides = document.querySelectorAll('.promo-slide');
  const dots = document.querySelectorAll('.promo-dot');
  const prevBtn = document.getElementById('promoPrev');
  const nextBtn = document.getElementById('promoNext');
  if (!slides.length) return;

  let current = 0;
  let interval = null;
  const DELAY = 6000;

  function goTo(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    current = index;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, DELAY);
  }

  function stopAuto() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) {
        goTo(idx);
        restartAuto();
      }
    });
  });

  startAuto();
}

// ========== BACK TO TOP ==========
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initPromoSlider();
  initProducts();
  updateCartUI();
});
