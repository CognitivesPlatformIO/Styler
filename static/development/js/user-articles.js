var UserArticlesController = (function ($) {
    return {
        load: function () {
            UserArticlesController.Load.init();
        }
    };
}(jQuery));

UserArticlesController.Load = (function ($) {

    var attachEvents = function () {
      
        /*
         * Load More Articles on My Post Page
         */
        $('.loadMoreMyArticles').on('click', function (e) {
            e.preventDefault();
            var btnObj = $(this);

            $.fn.Ajax_LoadMoreMyArticles({
                onSuccess: function (data, textStatus, jqXHR) {
                    if (data.success == 1) {
                        if (data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }
                        for (var i in data.articles) {
                            data.articles[i]['containerClass'] = 'col-third';
                           
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
                            var articleId = parseInt(data.articles[i].articleId);
                            var articleTemplate;
                            if (isNaN(articleId) || articleId <= 0) {
                                data.articles[i]['hasSocialMediaClass'] = (data.articles[i].social.hasMedia == 1)? 'withImage__content' : 'without__image';
                                articleTemplate = Handlebars.compile(socialCardTemplate); 
                            } else {
                                articleTemplate = Handlebars.compile(systemCardTemplate);
                            }
                           
                            var article = articleTemplate(data.articles[i]);
                            $('.LoadMyArticles').append(article);
                        }
                        
                        bindSocialShareButton();
                        
                        $(".card p, .card h1").dotdotdot();
                        
                        $("div.lazyload").lazyload({
                            effect: "fadeIn"
                        });
                    }
                },
                beforeSend: function (jqXHR, settings) {
                    $(btnObj).html("Please wait...");
                },
                onComplete: function (jqXHR, textStatus) {
                    $(btnObj).html("<i class='fa fa-arrow-down'></i> Load more");
                }
            });
        });
        
        var bindSocialShareButton = function () {
            $(".socialShare").on("click", function (e) {
                e.preventDefault();
                var elem = $(this);
                if (elem.hasClass('selected')) {
                    elem.removeClass('selected');
                } else {
                    elem.addClass('selected');
                }
            });
        };
        
        /**
         *  See User Post Articles
         */

        var totalPosts = parseInt($('div#userArticleContainer').data('total-count'));
        
        if (totalPosts > _appJsConfig.articleOffset) {
            var waypoint = new Waypoint({
                element: $('#LoadMoreArticles'),
                offset: '80%',
                handler: function (direction) {
                    if (direction == 'down') {
                        $.fn.Ajax_LoadMoreUserArticles({
                            onSuccess: function (data, textStatus, jqXHR) {
                                if (data.userArticles.length > 0) {

                                    for (var i in data.userArticles) {
                                        data.userArticles[i]['containerClass'] = 'col-third';
                                        
                                        data.userArticles[i]['hasArticleMediaClass'] = (data.userArticles[i].hasMedia == 1)? 'withImage__content' : 'without__image';
                                        data.articles[i]['blogClass'] = '';
                                        if (data.userArticles[i].blog['id'] !== null) {
                                            data.userArticles[i]['blogClass'] = 'card--blog_' + data.userArticles[i].blog['id'];
                                        } 
                                        
                                        var ImageUrl = $.image({media:data.userArticles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
                                        data.userArticles[i]['imageUrl'] = ImageUrl;
                                        
                                        data.userArticles[i]['userImageUrl'] = '';
                                        if (data.userArticles[i]['createdBy']['media']['id'] !== '') {
                                            var userImageUrl = $.image({media: data.userArticles[i]['createdBy']['media'], mediaOptions: {width: 100, height: 100, crop: 'thumb', gravity: 'face', radius: 'max'}});
                                            data.userArticles[i]['userImageUrl'] = userImageUrl;
                                        }
                                        
                                        Handlebars.registerHelper('encode', function (options) {
                                            return encodeURIComponent(options.fn(this));
                                        });
                                        var articleId = parseInt(data.userArticles[i].articleId);
                                        var articleTemplate;
                                        if (isNaN(articleId) || articleId <= 0) {
                                            data.userArticles[i]['hasSocialMediaClass'] = (data.userArticles[i].social.hasMedia == 1) ? 'withImage__content' : 'without__image';
                                            articleTemplate = Handlebars.compile(socialCardTemplate);
                                        } else {
                                            articleTemplate = Handlebars.compile(systemCardTemplate);
                                        }
                                        var article = articleTemplate(data.userArticles[i]);
                                        $('#userArticleContainer').append(article);
                                    }
                                    
                                    bindSocialShareButton();
                                    
                                    $(".card p, .card h1").dotdotdot();
                                    
                                    $("div.lazyload").lazyload({
                                        effect: "fadeIn"
                                    });
                                    
                                    if (data.userArticles.length < _appJsConfig.articleOffset) {
                                        waypoint.destroy();
                                    } else {
                                        Waypoint.refreshAll();
                                    }
                                    
                                }
                            },
                            beforeSend: function (jqXHR, settings) {
                                $('div.loader').removeClass('hide');
                            },
                            onComplete: function (jqXHR, textStatus) {
                                $('div.loader').addClass('hide');
                            }
                        });
                    }
                }
            });
        }
    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));


