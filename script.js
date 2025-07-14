document.addEventListener('DOMContentLoaded', function() {
  var backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.onclick = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
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
