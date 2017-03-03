var SearchController = (function ($) {
    return {
        listing: function () {
            SearchController.Listing.init();
        }
    };
}(jQuery));

SearchController.Listing = (function ($) {

    var attachEvents = function () {
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadSearchArticles({
                'search': $('input.header__search-text').val(),
                onSuccess: function(data, textStatus, jqXHR){
                     if (data.success == 1) {
                         
                         if(data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                         }
                         
                         for (var i in data.articles) {
                             
                            data.articles[i]['containerClass'] = 'col-quarter';
                            data.articles[i]['cardClass'] = '';
                            data.articles[i]['promotedClass'] = (data.articles[i].isPromoted == 1)? 'ad_icon' : '';
                            data.articles[i]['hasArticleMediaClass'] = (data.articles[i].hasMedia == 1)? 'withImage__content' : 'without__image';
                            
                            data.articles[i]['blogClass'] = '';
                            if (data.articles[i].blog['id'] !== null) {
                                data.articles[i]['blogClass'] = 'card--blog_' + data.articles[i].blog['id'];
                            } 
                            
                            var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
                            data.articles[i]['imageUrl'] = ImageUrl;

                            Handlebars.registerHelper('encode', function(options) {
                                return encodeURIComponent(options.fn(this));
                            });
                          
                            var articleTemplate = Handlebars.compile(systemCardTemplate);
                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }
                        $(".card p, .card h1").dotdotdot();
                        
                        $("div.lazyload").lazyload({
                            effect: "fadeIn"
                        });
                     }
                    
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html("Please wait...");
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html("Load More");
                }
            });
        });

    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));