  /* ── CURSOR ── */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0; // mouse and ring positions
  let dmx = 0, dmy = 0; // dot positions
  let lastMx = -1, lastMy = -1, lastRx = -1, lastRy = -1;

  // Track mouse position with passive listener
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function animateCursor() {
    // Smooth ring follow
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    // Dot follows mouse instantly
    dmx = mx;
    dmy = my;

    // Performance Optimization: Only update DOM if position changed significantly (> 0.1px)
    const movedRing = Math.abs(rx - lastRx) > 0.1 || Math.abs(ry - lastRy) > 0.1;
    const movedDot = Math.abs(dmx - lastMx) > 0.1 || Math.abs(dmy - lastMy) > 0.1;

    if (movedRing) {
      ring.style.transform = `translate3d(calc(${rx}px - 50%), calc(${ry}px - 50%), 0)`;
      lastRx = rx; lastRy = ry;
    }
    if (movedDot) {
      dot.style.transform = `translate3d(calc(${dmx}px - 50%), calc(${dmy}px - 50%), 0)`;
      lastMx = dmx; lastMy = dmy;
    }

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Performance Optimization: Use Event Delegation for better performance and support for dynamic elements
  document.addEventListener('mouseover', e => {
    const target = e.target.closest('a, button, .product-add-btn, [onclick]');
    if (target) ring.classList.add('hovered');
  }, { passive: true });

  document.addEventListener('mouseout', e => {
    const target = e.target.closest('a, button, .product-add-btn, [onclick]');
    if (target) {
        // Only remove if we're actually leaving the interactive element (not moving to a child)
        if (!target.contains(e.relatedTarget)) {
            ring.classList.remove('hovered');
        }
    }
  }, { passive: true });

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

  /* ── REVEAL ON SCROLL ── */
  const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── CART STATE ── */
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('vibecheck_cart') || '[]');
  } catch (e) {
    console.error('Cart initialization failed', e);
  }

  function saveCart() { localStorage.setItem('vibecheck_cart', JSON.stringify(cart)); }
  function updateCartUI() {
    const totalInCents = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const total = totalInCents / 100;
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('cartBadge');
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.textContent = count;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    const emptyEl = document.getElementById('cartEmpty');
    const footerEl = document.getElementById('cartFooter');
    const itemsEl = document.getElementById('cartItems');
    if (cart.length === 0) { emptyEl.style.display = 'flex'; footerEl.style.display = 'none'; return; }
    emptyEl.style.display = 'none'; footerEl.style.display = 'block';

    // Performance: Use DocumentFragment for batching DOM updates
    const fragment = document.createDocumentFragment();
    const existing = itemsEl.querySelectorAll('.cart-item');
    existing.forEach(el => el.remove());

    cart.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-img">${item.emoji || '📦'}</div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${((item.price * item.qty) / 100).toFixed(2)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
          </div>
        </div>`;
      fragment.appendChild(el);
    });
    itemsEl.insertBefore(fragment, emptyEl);
  }
  window.changeQty = function(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart(); updateCartUI();
  };
  window.addToCart = function(product) {
    if (typeof window.shopifyAddToCart === 'function') {
      window.shopifyAddToCart(product.variantId || product.id, 1).then(() => syncCartFromShopify());
    }
    const productToAdd = { ...product, price: Number(product.price), qty: 1 };
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else cart.push(productToAdd);
    saveCart(); updateCartUI();
    showToast(`✓ ${product.name} added`);
  };
  window.toggleCart = function() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
  };
  window.goToCheckout = function() {
    if (typeof window.shopifyCheckoutUrl === 'string' && window.shopifyCheckoutUrl) {
      window.location.href = window.shopifyCheckoutUrl;
    } else {
      showToast('Redirecting to checkout...');
    }
  };
  function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
  updateCartUI();

  /* ── NEWSLETTER ── */
  window.subscribeNewsletter = function() {
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email || !email.includes('@')) { showToast('Enter a valid email 👀'); return; }
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(r => r.ok ? showToast('🎉 You\'re in the rebellion!') : showToast('Error — try again'))
      .catch(() => showToast('🎉 You\'re in the rebellion!'));
    document.getElementById('newsletterEmail').value = '';
  };

  /* ── LOAD SHOPIFY PRODUCTS ── */
  if (typeof window.shopifyLoadProducts === 'function') {
    window.shopifyLoadProducts().then(products => {
      if (!products || !products.length) return;
      const grid = document.getElementById('productsGrid');
      grid.innerHTML = '';
      const fragment = document.createDocumentFragment();
      products.forEach((p, i) => {
        const img = p.images?.[0]?.src || '';
        const priceInCents = Math.round(parseFloat(p.variants?.[0]?.price || 0) * 100);
        const comparePriceInCents = Math.round(parseFloat(p.variants?.[0]?.compare_at_price || 0) * 100);
        const variantId = p.variants?.[0]?.id;
        const card = document.createElement('div');
        card.className = `product-card reveal${i > 0 ? ` reveal-delay-${Math.min(i,4)}` : ''}`;
        card.innerHTML = `
          <div class="product-img-wrap">
            ${img ? `<img src="${img}" alt="${p.title}" loading="lazy" />` : `<div class="product-img-placeholder">🛍️</div>`}
          </div>
          <div class="product-info">
            <p class="product-name">${p.title}</p>
            <p class="product-price">${comparePriceInCents > priceInCents ? `<span class="original">$${(comparePriceInCents / 100).toFixed(2)}</span>` : ''}$${(priceInCents / 100).toFixed(2)}</p>
          </div>
          <button class="product-add-btn" onclick="addToCart({id:'${variantId}',variantId:'${variantId}',name:'${p.title.replace(/'/g,"\\'")}',price:${priceInCents},emoji:'🛍️'})" aria-label="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#0e0e0e" stroke-width="2" stroke-linecap="round"/></svg>
          </button>`;
        fragment.appendChild(card);
        observer.observe(card);
      });
      grid.appendChild(fragment);
    });
  }
