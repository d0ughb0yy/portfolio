(function() {
  'use strict';

  let scrollPos = 0;
  const modal = document.getElementById('global-image-modal');
  const closeBtn = document.getElementById('global-modal-close');
  const modalImg = document.getElementById('global-modal-image');

  function closeModal() {
    document.documentElement.style.position = '';
    document.documentElement.style.top = '';
    document.documentElement.style.width = '';
    window.scrollTo({ top: scrollPos, behavior: 'instant' });
    modal.close();
  }

  document.querySelectorAll('.prose-image-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var src = trigger.getAttribute('data-src');
      var alt = trigger.getAttribute('data-alt');
      if (src && modal && modalImg) {
        scrollPos = window.scrollY;
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.top = '-' + scrollPos + 'px';
        document.documentElement.style.width = '100%';
        modalImg.src = src;
        modalImg.alt = alt || '';
        modal.showModal();
        trigger.blur();
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.hasAttribute('open')) {
      closeModal();
    }
  });
})();
