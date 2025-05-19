const report__card = document.querySelectorAll('.new-chat');

report__card.forEach(card => {
    card.addEventListener('click', function () {
        const href = this.getAttribute('data-href');
        if (href) {
            window.location.href = href;
        }
    });
});