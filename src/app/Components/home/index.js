$('').owlCarousel({
    loop: true,
    margin: 30,
    dots: true,
    nav: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 2,
            margin: 10,
            stagePadding: 20,
        },
        600: {
            items: 3,
            margin: 20,
            stagePadding: 50,
        },
        1000: {
            items: 4
        }
    }
});