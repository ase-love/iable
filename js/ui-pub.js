
function gnbMenu(){
  function evt(){
    let wrapstyle = $('.wrap').attr('style');
    $('body, html').scrollTop(0);
    $('html, body, .wrap').css('overflow', 'hidden');
    $('.wrap').css('position', 'relative');
    $('.gnb-menu-wrap').show();
    $('.gnb-menu-wrap .menu-body').scrollTop(0);
    $('.gnb-menu-wrap').stop().animate({
      left: "0",
    }, 250);
    // close
    $('.gnb-menu-wrap .btn-close').on('click', function(){
      $('.gnb-menu-wrap').stop().animate({
        left: "-100%",
      }, 250, function() {
        setTimeout(function(){
          $('.gnb-menu-wrap').hide();
          $('html, body, .wrap').css('overflow', '');
          $('.wrap').attr('style', wrapstyle);
        }, 100)
      });
  
    });  
  }
  
  if($('.gnb-menu-wrap').length > 0) {
    evt();
    return;
  }
  loadInclude('gnbmenu', null, function(){
    icon();
    evt();
  }); 
  
}

// load  
$(function(){
  favorite();
});
