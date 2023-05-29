function renderHello() {
    const template = document.getElementById('template').innerHTML;
    const rendered = Mustache.render(template, { carousel: '<div class="owl-carousel owl-theme"></div>' });
    document.getElementById('target').innerHTML = rendered;
};