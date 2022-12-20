var prWidget = {
    options: {
        containerSelector: '.module-press-release',
        template: (
            '{{#.}}' +
                '{{#filteredItems}}' +
                '<div class="module-press-release_item">' +
                    '<h2 class="module-press-release_headline">{{headline}}</h2>' +
                    '<p class="module-press-release_date">{{date}}</p>' +
                    '<p class="module-press-release_short-body">{{shortBody}}</p>' +
                    '<a class="button" href="{{relatedDoc}}">Download PDF</a>' +
                    '<a class="button" href="{{url}}">Read more</a>' +
                '</div>' +
                '{{/filteredItems}}' +
            '{{/.}}'                    
        )
    },

    init: function() {
        var templateItems = this.beforeRenderItems(prContent)
        this.renderPRs(templateItems || []);
        this.complete();
    },

    beforeRenderItems: function(content){
        console.log('this is content',content)
        content.filteredItems = [];
        console.log('this is content.filteredItems',content.filteredItems)

        content.items.forEach(function (el, ind, arr) {
            if(el.tags.includes('earnings')){
                console.log('There is an item with')
            } else{
                content.filteredItems.push(el)
            }
        });
        content.items = content.filteredItems
        return content;
    },

    renderPRs: function(prItems) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, prItems));
    },

    complete: function() {
        // Add Slick Slider here (https://kenwheeler.github.io/slick/)
        $('.module-press-release').slick({
            arrows: true,
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
            ]
        });
    }
};

prWidget.init();