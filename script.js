document.addEventListener('DOMContentLoaded', function() {
  var backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.onclick = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
});
// Mobile nav toggle: show/hide email and main menu in a small popup
document.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.getElementById('navToggleBtn');
  var mobileMenu = document.getElementById('mobileNavMenu');
  if (!navToggle || !mobileMenu) return;

  // Build menu content by copying email-block and main-menu
  function buildMobileMenu() {
    var emailBlock = document.querySelector('.email-block');
    var mainMenu = document.querySelector('.nav-block.main-menu');
    // Build a structured full-screen menu similar to the reference image
    var html = '';
    html += '<button class="mobile-close" aria-label="fechar menu">×</button>';
    if (mainMenu) {
      // map existing nav links into a vertical list
      var links = mainMenu.querySelectorAll('.nav-link');
      html += '<nav class="mobile-main-menu" aria-label="menu principal">';
      links.forEach(function(a) {
        html += '<a href="' + (a.getAttribute('href') || '#') + '">' + a.textContent.trim() + '</a>';
      });
      html += '</nav>';
      html += '<div class="mobile-separator"></div>';
    }
    if (emailBlock) {
      html += '<div class="mobile-email">' + emailBlock.innerHTML + '</div>';
    }
    mobileMenu.innerHTML = html;
    // attach close handler
    var closeBtn = mobileMenu.querySelector('.mobile-close');
    if (closeBtn) closeBtn.addEventListener('click', function() {
      mobileMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  }

  buildMobileMenu();

  navToggle.addEventListener('click', function(e) {
    var isOpen = mobileMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // Close with Esc key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
      mobileMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close the mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenu.classList.contains('show')) return;
    if (mobileMenu.contains(e.target) || navToggle.contains(e.target)) return;
    mobileMenu.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});
const filterButtons = document.querySelectorAll('.filter-toggle');
const galleryItems = document.querySelectorAll('#gallery .item');
const activeFilters = new Set();

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    if (activeFilters.has(category)) {
      activeFilters.delete(category);
      button.classList.remove('active');
    } else {
      activeFilters.add(category);
      button.classList.add('active');
    }
    filterGallery();
  });
});

function filterGallery() {
  if (activeFilters.size === 0) {
    galleryItems.forEach(item => item.classList.remove('hidden'));
  } else {
    galleryItems.forEach(item => {
      const categories = item.dataset.categories.split(',');
      const isMatch = [...activeFilters].some(f => categories.includes(f));
      item.classList.toggle('hidden', !isMatch);
    });
  }
}

const mobileFilterBtn = document.getElementById('mobileFilterToggle');
const categoryFilter = document.getElementById('categoryFilter');

if (mobileFilterBtn && categoryFilter) {
  mobileFilterBtn.addEventListener('click', () => {
    categoryFilter.classList.toggle('show');
    mobileFilterBtn.textContent = categoryFilter.classList.contains('show') ? 'fechar filtros' : 'mostrar filtros';
  });
}

function filterGallery() {
  galleryItems.forEach(item => {
    const categories = item.dataset.categories.split(',');
    const isMatch = activeFilters.size === 0 || [...activeFilters].some(f => categories.includes(f));

    if (isMatch) {
      item.classList.remove('hidden');
      setTimeout(() => item.classList.remove('fading-out'), 10);
    } else {
      item.classList.add('fading-out');
      setTimeout(() => item.classList.add('hidden'), 400); // espera o fade-out antes de esconder
    }
  });
}

// Mark collapse panels as opening/closing so CSS can treat them differently
document.addEventListener('DOMContentLoaded', function() {
  var collapses = document.querySelectorAll('.accordion-collapse');
  collapses.forEach(function(col) {
    col.addEventListener('show.bs.collapse', function() {
      col.classList.add('opening');
      col.classList.remove('closing');
    });
    col.addEventListener('shown.bs.collapse', function() {
      col.classList.remove('opening');
    });
    col.addEventListener('hide.bs.collapse', function() {
      col.classList.add('closing');
      col.classList.remove('opening');
    });
    col.addEventListener('hidden.bs.collapse', function() {
      col.classList.remove('closing');
    });
  });
});
