var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
        this.events[eventName] = this.events[eventName]
            ? this.events[eventName]
            : [];
        this.events[eventName].push(callbackfn);
    },
    emit: function (eventName) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (callBackfn) {
                callBackfn();
            });
        }
    },
};

var model = {
    currentCountry: null,
    countryList: [
        {
            id: 0,
            name: 'US',
            imgSrc: './img/us.png',
            url: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=7ca38df473584a86bd184480a35dfac0'
        },
        {
            id: 1,
            name: 'CA',
            imgSrc: './img/ca.png',
            url: 'https://newsapi.org/v2/top-headlines?country=ca&apiKey=7ca38df473584a86bd184480a35dfac0'
        },
        {
            id: 2,
            name: 'MX',
            imgSrc: './img/mx.png',
            url: 'https://newsapi.org/v2/top-headlines?country=mx&apiKey=7ca38df473584a86bd184480a35dfac0'
        }
    ],
    articles: [],

    setCurrentCountry(country) {
        if (country)
            this.currentCountry = country;
        else
            this.currentCountry = this.countryList[0];
    },
    getCurrentCountry() {
        return this.currentCountry;
    }
}
var controller = {
    setCurrentCountry() {
        model.setCurrentCountry();
    },
    getCurrentCountry() {
        return model.getCurrentCountry();
    },
    getCountryList() {
        return model.countryList;
    },
    setArticles(articles) {
        model.articles = articles;

    },
    getArticles() {
        return model.articles;
    },
    isReady() {
        return model.articles.length;
    }

}
var countryCarouselView = {
    countryList: [],
    init() {
        controller.setCurrentCountry();
        this.countryList = controller.getCountryList();
        this.render();
    },
    render() {
        var carousle = $('.owl-carousel')
        this.countryList.forEach(function (country) {
            var item = $('<div class="item d-flex justify-content-center"></div>')
            var img = $('<img class="img-fluid w-25"/>')
            img.attr('src', country.imgSrc);
            img.on('click', function () {
                $.ajax({
                    method: "GET",
                    url: country.url,
                }).done(function (respone) {
                    var articles = respone.articles;
                    controller.setArticles(articles);
                    eventsMediator.emit('picture-clicked');
                });
            });
            item.append(img);
            carousle.append(item);
        })

    }
}
var infoView = {
    init() {
        this.render();
    },
    render() {
        const template = document.getElementById('template').innerHTML;
        const rendered = Mustache.render(template, { articles: controller.getArticles() });
        document.getElementById('target').innerHTML = rendered;
        eventsMediator.on('picture-clicked', function () {
            infoView.render();
        })
    }
}
infoView.init();
countryCarouselView.init();

$(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});

$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});