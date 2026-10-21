document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Array of your 21 artwork items (Generated based on your image files)
  const artworkData = Array.from({ length: 21 }, (_, i) => {
    const id = i + 1;
    return {
      id: id,
      file: `${id}.jpg`,
      title: `Artwork Collection #${id}`,
      year: '2026',
      desc: 'Ballpoint pen & pencil study.'
    };
  });

  const galleryGrid = document.getElementById('galleryGrid');
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  
  // Lightbox DOM Elements
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  
  let currentActiveIndex = 0;

  // 2. Mobile Responsive Menu Toggle
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 3. Render Gallery Cards dynamically
  function renderGallery(items) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.innerHTML = `
        <div style="width: 100%; height: 320px; overflow: hidden; background: #eaeaea;">
          <img src="${item.file}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy">
        </div>
        <div style="padding: 1.25rem;">
          <h3 style="font-size: 1.05rem; font-weight:600; margin-bottom: 0.25rem; color:#1a1a1a;">${item.title}</h3>
          <p style="font-size: 0.85rem; color: #777;">${item.year} &middot; ${item.desc}</p>
        </div>
      `;
      
      card.addEventListener('click', () => openLightbox(index, items));
      galleryGrid.appendChild(card);
    });
  }

  // 4. Lightbox Interactive Logic
  function openLightbox(index, items) {
    if (!lightbox) return;
    currentActiveIndex = index;
    updateLightboxContent(items);
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent(items) {
    const activeItem = items[currentActiveIndex];
    if (!activeItem) return;
    lbImg.src = activeItem.file;
    lbImg.alt = activeItem.title;
    lbCaption.innerHTML = `<strong>${activeItem.title}</strong> (${activeItem.year}) <br/> <span style="font-size:0.9rem; opacity:0.8;">${activeItem.desc}</span>`;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  
  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      if (currentActiveIndex > 0) {
        currentActiveIndex--;
        updateLightboxContent(artworkData);
      }
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', () => {
      if (currentActiveIndex < artworkData.length - 1) {
        currentActiveIndex++;
        updateLightboxContent(artworkData);
      }
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && currentActiveIndex < artworkData.length - 1) lbNext.click();
      if (e.key === 'ArrowLeft' && currentActiveIndex > 0) lbPrev.click();
    }
  });

  renderGallery(artworkData);
});
