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
    // Expand postnominals for mouse, keyboard and touch users.
    var credentialTip = document.createElement('div');
    credentialTip.id = 'credential-tooltip';
    credentialTip.className = 'credential-tooltip';
    credentialTip.setAttribute('role', 'tooltip');
    credentialTip.hidden = true;
    document.body.appendChild(credentialTip);
    var activeCredential = null;
    var credentialTimer;
    function hideCredential() {
        clearTimeout(credentialTimer);
        credentialTip.hidden = true;
        if (activeCredential) activeCredential.removeAttribute('aria-describedby');
        activeCredential = null;
    }
    function showCredential(abbr) {
        hideCredential();
        activeCredential = abbr;
        credentialTip.textContent = abbr.dataset.expansion;
        credentialTip.hidden = false;
        abbr.setAttribute('aria-describedby', credentialTip.id);
        var rect = abbr.getBoundingClientRect();
        var tipRect = credentialTip.getBoundingClientRect();
        credentialTip.style.left = Math.max(12, Math.min(rect.left, window.innerWidth - tipRect.width - 12)) + 'px';
        credentialTip.style.top = (rect.bottom + tipRect.height + 12 < window.innerHeight ? rect.bottom + 8 : Math.max(12, rect.top - tipRect.height - 8)) + 'px';
    }
    function scheduleCredentialHide() {
        credentialTimer = setTimeout(hideCredential, 180);
    }
    document.querySelectorAll('.credential-abbr').forEach(function (abbr) {
        abbr.dataset.expansion = abbr.getAttribute('title');
        abbr.setAttribute('aria-label', abbr.textContent + ': ' + abbr.dataset.expansion);
        abbr.removeAttribute('title'); // Avoid a second native tooltip when enhanced.
        abbr.addEventListener('mouseenter', function () { showCredential(abbr); });
        abbr.addEventListener('mouseleave', scheduleCredentialHide);
        abbr.addEventListener('focus', function () { showCredential(abbr); });
        abbr.addEventListener('blur', hideCredential);
        abbr.addEventListener('click', function (event) {
            event.preventDefault(); // Tapping a suffix explains it without following the wordmark link.
            showCredential(abbr);
        });
        abbr.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showCredential(abbr);
            }
        });
    });
    credentialTip.addEventListener('mouseenter', function () { clearTimeout(credentialTimer); });
    credentialTip.addEventListener('mouseleave', scheduleCredentialHide);
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') hideCredential(); });
    document.addEventListener('pointerdown', function (event) {
        if (!event.target.closest('.credential-abbr, .credential-tooltip')) hideCredential();
    });
    window.addEventListener('resize', hideCredential);
    window.addEventListener('scroll', hideCredential, { passive: true });
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
