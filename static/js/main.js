(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    var backToTopBtn = document.getElementById('back-to-top');

    // Mobile menu toggle
    function openMenu() {
      if (!nav || !hamburger || !mobileMenu) return;
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      nav.classList.add('no-border');
      mobileMenu.classList.remove('max-h-0', 'opacity-0', '-translate-y-1');
      mobileMenu.classList.add('max-h-[600px]', 'opacity-100', 'translate-y-0');
    }

    function closeMenu() {
      if (!nav || !hamburger || !mobileMenu) return;
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('no-border');
      mobileMenu.classList.remove('max-h-[600px]', 'opacity-100', 'translate-y-0');
      mobileMenu.classList.add('max-h-0', 'opacity-0', '-translate-y-1');
    }

    if (hamburger) {
      hamburger.addEventListener('click', function() {
        if (hamburger.classList.contains('active')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    document.querySelectorAll('#mobile-menu a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Nav scroll effect (glassy background)
    function handleNavScroll() {
      if (!nav) return;
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // Back to top button
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
          backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
          backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
          backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
          backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
      });

      backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(function() { backToTopBtn.blur(); }, 100);
      });
    }

    // Year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }

    // Scroll-spy for anchor sections on homepage
    var navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    var sections = [];
    navLinks.forEach(function(link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });

    if (sections.length > 0) {
      var ticking = false;
      function updateActiveSection() {
        var scrollY = window.scrollY;
        var navH = nav ? nav.offsetHeight : 72;
        var offset = navH + 100;
        var windowHeight = window.innerHeight;
        var docHeight = document.body.scrollHeight;

        sections.forEach(function(item, index) {
          var sectionTop = item.el.offsetTop - offset;
          var sectionHeight = item.el.offsetHeight;
          var isLast = index === sections.length - 1;
          var atBottom = scrollY + windowHeight >= docHeight - 50;

          if (isLast && atBottom) {
            item.link.classList.add('active');
          } else if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            item.link.classList.add('active');
          } else {
            item.link.classList.remove('active');
          }
        });
      }

      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            updateActiveSection();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
      updateActiveSection();
    }

    // Typewriter effect on hero
    var typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
      var text = typewriterElement.getAttribute('data-text') || '';
      setTimeout(function() {
        var i = 0;
        typewriterElement.textContent = '';
        function type() {
          if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 60);
          }
        }
        type();
      }, 500);
    }

    // Role rotation
    var roleElement = document.getElementById('role-rotate');
    if (roleElement) {
      var roles = [
        'Web Security Researcher',
        'Cybersecurity Analyst'
      ];
      var roleIndex = 0;
      var charIndex = 0;
      var isDeleting = false;
      var roleText = '';

      function typeRole() {
        var currentRole = roles[roleIndex];

        if (!isDeleting) {
          roleText = currentRole.substring(0, charIndex + 1);
          charIndex++;
          if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, 2000);
            return;
          }
        } else {
          roleText = currentRole.substring(0, charIndex - 1);
          charIndex--;
          if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
            return;
          }
        }

        roleElement.innerHTML = roleText + '<span class="cursor" aria-hidden="true">|</span>';
        var speed = isDeleting ? 30 : 80;
        setTimeout(typeRole, speed);
      }

      setTimeout(typeRole, 1500);
    }

    // Mobile dropdown toggle
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var submenu = this.nextElementSibling;
        if (submenu) {
          submenu.classList.toggle('hidden');
          this.classList.toggle('open');
        }
      });
    });

    // Matrix rain canvas
    var matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
      var ctx = matrixCanvas.getContext('2d');
      var chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      var columns, drops;

      function resizeMatrix() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        columns = Math.floor(matrixCanvas.width / 20);
        drops = Array(columns).fill(1);
      }

      resizeMatrix();
      window.addEventListener('resize', resizeMatrix);

      var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      var matrixInterval;

      function draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        ctx.fillStyle = '#22C55E';
        ctx.font = '14px monospace';

        for (var i = 0; i < drops.length; i++) {
          var char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * 20, drops[i] * 20);
          if (drops[i] * 20 > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      if (!mediaQuery.matches) {
        matrixInterval = setInterval(draw, 50);
      }

      mediaQuery.addEventListener('change', function(e) {
        if (e.matches) {
          clearInterval(matrixInterval);
          if (ctx) ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        } else {
          matrixInterval = setInterval(draw, 50);
        }
      });
    }
  });
})();
