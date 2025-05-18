const report__card = document.querySelectorAll('.report');

report__card.forEach(card => {
    card.addEventListener('click', function () {
        const href = this.getAttribute('data-href');
        if (href) {
            window.location.href = href;
        }
    });
});