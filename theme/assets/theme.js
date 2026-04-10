  /* ── CURSOR ── */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  // Optimized mousemove: only update coordinates to minimize main thread work
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  // Consolidated animation loop using translate3d for GPU acceleration
  function animateCursor() {
    // Smooth trailing effect for the ring
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    // Use translate3d to trigger hardware acceleration and prevent layout thrashing
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Efficient event delegation for hover states - improves memory and supports dynamic content
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, [onclick], .product-card')) {
      ring.classList.add('hovered');
    } else {
      ring.classList.remove('hovered');
    }
  });

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

  /* ── REVEAL ON SCROLL ── */
  const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── CART STATE ── */
  let cart = JSON.parse(localStorage.getItem('vibecheck_cart') || '[]');
  function saveCart() { localStorage.setItem('vibecheck_cart', JSON.stringify(cart)); }
  function updateCartUI() {
  // Prices are stored in cents, divide by 100 for display
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
    // render items
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
      itemsEl.insertBefore(el, emptyEl);
    });
  }
  function addToCart(product) {
    if (typeof window.shopifyAddToCart === 'function') {
      window.shopifyAddToCart(product.variantId || product.id, 1).then(() => syncCartFromShopify());
    }
  // Ensure price is treated as a number
  const productToAdd = { ...product, price: Number(product.price), qty: 1 };
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
  else cart.push(productToAdd);
    saveCart(); updateCartUI();
    showToast(`✓ ${product.name} added`);
  }
  function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart(); updateCartUI();
  }
  function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
  }
  function goToCheckout() {
    if (typeof window.shopifyCheckoutUrl === 'string' && window.shopifyCheckoutUrl) {
      window.location.href = window.shopifyCheckoutUrl;
    } else {
      showToast('Redirecting to checkout...');
    }
  }
  function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
  updateCartUI();

  /* ── NEWSLETTER ── */
  function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email || !email.includes('@')) { showToast('Enter a valid email 👀'); return; }
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(r => r.ok ? showToast('🎉 You\'re in the rebellion!') : showToast('Error — try again'))
      .catch(() => showToast('🎉 You\'re in the rebellion!'));
    document.getElementById('newsletterEmail').value = '';
  }

  /* ── LOAD SHOPIFY PRODUCTS ── */
  if (typeof window.shopifyLoadProducts === 'function') {
    window.shopifyLoadProducts().then(products => {
      if (!products || !products.length) return;
      const grid = document.getElementById('productsGrid');
      grid.innerHTML = '';
      products.forEach((p, i) => {
        const img = p.images?.[0]?.src || '';
        // Mock prices from API are likely in dollars, convert to cents for consistency
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
        grid.appendChild(card);
        observer.observe(card);
      });
    });
  }
