(function() {
    "use strict";

    // custom scrollbar
    // $("html").niceScroll({styler:"fb",cursorcolor:"#65cea7", cursorwidth: '6', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});

    // $(".left-side").niceScroll({styler:"fb",cursorcolor:"#65cea7", cursorwidth: '3', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0'});


    // $(".left-side").getNiceScroll();
    // if ($('body').hasClass('left-side-collapsed')) {
    //     $(".left-side").getNiceScroll().hide();
    // }

    // Toggle Left Menu
    // jQuery('.menu-list > a').click(function() {
    //     var parent = jQuery(this).parent();
    //     var sub = parent.find('> ul');
    //
    //     if(!jQuery('body').hasClass('left-side-collapsed')) {
    //         if(sub.is(':visible')) {
    //             sub.slideUp(200, function(){
    //                 parent.removeClass('nav-active');
    //                 jQuery('.main-content').css({height: ''});
    //                 mainContentHeightAdjust();
    //             });
    //         } else {
    //             visibleSubMenuClose();
    //             parent.addClass('nav-active');
    //             sub.slideDown(200, function(){
    //                 mainContentHeightAdjust();
    //             });
    //         }
    //     }
    //     return false;
    // });

    // function visibleSubMenuClose() {
    //     jQuery('.menu-list').each(function() {
    //         var t = jQuery(this);
    //         if(t.hasClass('nav-active')) {
    //             t.find('> ul').slideUp(200, function(){
    //                 t.removeClass('nav-active');
    //             });
    //         }
    //     });
    // }
    //
    // function mainContentHeightAdjust() {
    //     // Adjust main content height
    //     var docHeight = jQuery(document).height();
    //     if(docHeight > jQuery('.main-content').height())
    //         jQuery('.main-content').height(docHeight);
    // }

})(jQuery);