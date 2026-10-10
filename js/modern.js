(function () {
    'use strict';
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('site-menu');
    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
    }
    toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('is-open', open);
    });
    menu.addEventListener('click', function (event) {
        if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navigation')) closeMenu();
    });
    window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    // Keep each section's photographs in its own full-size gallery.
    if (window.jQuery && window.jQuery.fn.magnificPopup) {
        window.jQuery('.restoration-photo-link').magnificPopup({
            type: 'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) { return item.el.find('img').attr('alt'); } }
        });
        window.jQuery('.service-photo-link').magnificPopup({
            type: 'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) { return item.el.find('img').attr('alt'); } }
        });
        window.jQuery('.gerfalcon-photo-link').magnificPopup({
            type: 'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) { return item.el.find('img').attr('alt'); } }
        });
        window.jQuery('.publication-photo-link').magnificPopup({
            type: 'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) { return item.el.find('img').attr('alt'); } }
        });
        window.jQuery('.kayaking-photo-link').magnificPopup({
            type: 'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) { return item.el.find('img').attr('alt'); } }
        });
    }
    // Keep the gallery controls accessible as the existing Isotope filter changes.
    document.querySelectorAll('.portfolio-menu button').forEach(function (button) {
        button.setAttribute('type', 'button');
        button.setAttribute('aria-pressed', String(button.classList.contains('active')));
        button.addEventListener('click', function () {
            document.querySelectorAll('.portfolio-menu button').forEach(function (other) {
                other.setAttribute('aria-pressed', String(other === button));
            });
        });
    });
}());
