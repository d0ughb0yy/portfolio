(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var categoryBtns = document.querySelectorAll('.category-btn');
    var tagBtns = document.querySelectorAll('.tag-btn');
    var platformBtns = document.querySelectorAll('.platform-btn');
    var difficultyBtns = document.querySelectorAll('.difficulty-btn');
    var postCards = document.querySelectorAll('.post-card');

    var activeCategory = 'all';
    var activeTag = 'all';
    var activePlatform = 'all';
    var activeDifficulty = 'all';

    function filterPosts() {
      postCards.forEach(function(card) {
        var cardCategory = card.getAttribute('data-category');
        var cardTagsAttr = card.getAttribute('data-tags');
        var cardTags = cardTagsAttr ? cardTagsAttr.split(',') : [];
        var cardPlatform = card.getAttribute('data-platform');
        var cardDifficulty = card.getAttribute('data-difficulty');

        var categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
        var tagMatch = activeTag === 'all' || cardTags.indexOf(activeTag) !== -1;
        var platformMatch = activePlatform === 'all' || cardPlatform === activePlatform;
        var difficultyMatch = activeDifficulty === 'all' || cardDifficulty === activeDifficulty;

        if (categoryMatch && tagMatch && platformMatch && difficultyMatch) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });

      updateActiveButtons();
    }

    function resetButtonStyles(btns) {
      btns.forEach(function(btn) {
        btn.classList.remove('bg-[rgba(34,197,94,0.1)]', 'text-accent', 'border-[rgba(34,197,94,0.3)]');
        btn.classList.add('bg-surface', 'text-text-secondary', 'border-border');
      });
    }

    function setActiveButton(btn) {
      btn.classList.remove('bg-surface', 'text-text-secondary', 'border-border');
      btn.classList.add('bg-[rgba(34,197,94,0.1)]', 'text-accent', 'border-[rgba(34,197,94,0.3)]');
    }

    function updateActiveButtons() {
      categoryBtns.forEach(function(btn) {
        if (btn.getAttribute('data-category') === activeCategory) {
          setActiveButton(btn);
        } else {
          resetButtonStyles([btn]);
        }
      });

      tagBtns.forEach(function(btn) {
        if (btn.getAttribute('data-tag') === activeTag) {
          setActiveButton(btn);
        } else {
          resetButtonStyles([btn]);
        }
      });

      platformBtns.forEach(function(btn) {
        if (btn.getAttribute('data-platform') === activePlatform) {
          setActiveButton(btn);
        } else {
          resetButtonStyles([btn]);
        }
      });

      difficultyBtns.forEach(function(btn) {
        if (btn.getAttribute('data-difficulty') === activeDifficulty) {
          setActiveButton(btn);
        } else {
          resetButtonStyles([btn]);
        }
      });
    }

    categoryBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        activeCategory = btn.getAttribute('data-category') || 'all';
        filterPosts();
      });
    });

    tagBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        activeTag = btn.getAttribute('data-tag') || 'all';
        filterPosts();
      });
    });

    platformBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        activePlatform = btn.getAttribute('data-platform') || 'all';
        filterPosts();
      });
    });

    difficultyBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        activeDifficulty = btn.getAttribute('data-difficulty') || 'all';
        filterPosts();
      });
    });
  });
})();
