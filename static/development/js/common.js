(function ($) {
    $('.is-arrow-down a').click(function (e) {
        if ($(this).parents(".is-section").nextAll('div:not(.is-hidden)').html()) { /* .hidden class can be used as an exception */
            $('html,body').animate({
                scrollTop: $(this).parents(".is-section").nextAll('div:not(.is-hidden)').offset().top - parseInt($('.is-wrapper').css('padding-top')) /* + 1 Adjustment due to topbar height*/
            }, 800);
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });
        
    
    $('.video-player').videoPlayer();
    
    $("div.lazyload").lazyload({
        effect : "fadeIn"
    });
    
      $(window).resize(function(){
        if ($('.responsive-navigation').is(':visible')) { 
            var currentWidth = $('.responsive-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.responsive-navigation').css('width', newWidth + 'px');
            }
        }
    });
    
    $('.forceLoginModal').loginModal({
        onLoad: function () {
            $("#loginForm").validateLoginForm();
            $("#signupForm").validateSignupForm();
        }
    });
    

   //Follow Profile User
    $('.FollowProfileUser').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            $(obj).get(0).lastChild.nodeValue = " " + status.substr(0,1).toUpperCase()+status.substr(1);
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " user successfully."});   
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    //Follow Blogs
    $('.FollowBlog').followBlog({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            if($(obj).hasClass('hasStar')) {
                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
            }
            else {
                if(status == 'unfollow') {
                    $(obj).parents('li').remove();
                }
            }
            
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    /*
     * Follow Blog on article page
     */ 
    $('.followArticleBtn').followBlog({
        onSuccess: function (data, obj) {
           ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " blog successfully."});                 
        },
        beforeSend: function (obj) {
            $(obj).html('please wait...');
        }
    });
    
    
  
    
    
    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });   
    
    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required email",
            message: "required"
        },
        // errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: {
                required: "Email cannot be blank",
                email: "Please enter a valid email address"
            },
            message: "Message cannot be blank."
        }
    });
    
     /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/
    
    $('.uploadFileBtn').uploadFile({
           onSuccess: function(data, obj){
                var resultJsonStr = JSON.stringify(data);
                
                var imgClass = $(obj).data('imgcls');
                $('.' + imgClass).css('background-image', 'url(' + data.url + ')');
                
                var fieldId = $(obj).data('id');
                $('#' + fieldId).val(resultJsonStr);
                
                $().General_ShowNotification({message: 'Image added successfully' });
            } 
    });
    
        /**
     * Update Social Post From Listing
     */
    $('.editSocialPost').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        var url = elem.data('url');
        var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
        popup.focus();

        var intervalId = setInterval(function () {
            if (popup.closed) {
                clearInterval(intervalId);
                var socialId = elem.parents('a').data('id');
                if($('#updateSocial'+socialId).data('update') == '1') {
                    $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                }  
            }
        }, 50);

        return;
    });
    
    $("body").on("click", '.socialShare', function (e) {
        e.preventDefault();
        var elem = $(this);
        if (elem.hasClass('selected')) {
            elem.removeClass('selected');
        } else {
            elem.addClass('selected');
        }
    });
    
    /* User profile page*/
    $('.FollowUnfollowUser ').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " user successfully."});   
            if($(obj).hasClass('hasStar')) {
                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
            }
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    $('.FollowWriter ').followUser({
        onSuccess: function (data, obj) {
            var status = $(obj).data('status');
            var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
            $.fn.General_ShowNotification({message: message + " user successfully."});   
            if($(obj).hasClass('hasStar')) {
                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
            }
        },
        beforeSend: function (obj) {
            $(obj).find('.fa').addClass('fa-spin fa-spinner');
        },
        onComplete: function (obj) {
            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
        }
    });
    
    
}(jQuery));


    


