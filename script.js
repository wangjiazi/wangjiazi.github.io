(function () {
    'use strict';
  
    // Smooth scroll for anchor links (respects prefers-reduced-motion)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            target.scrollIntoView({ block: 'start' });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  
    // Optional: highlight current section in quick-links (on scroll)
    var sections = document.querySelectorAll('.section');
    var navLinks = document.querySelectorAll('.quick-links a');
  
    function updateActiveLink() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var innerHeight = window.innerHeight;
      var threshold = innerHeight * 0.4;
  
      sections.forEach(function (section, i) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        if (scrollY >= top - threshold && scrollY < top + height - threshold) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + section.id) link.classList.add('active');
          });
        }
      });
    }
  
    if (navLinks.length && sections.length) {
      window.addEventListener('scroll', function () {
        requestAnimationFrame(updateActiveLink);
      });
      updateActiveLink();
    }
  })();