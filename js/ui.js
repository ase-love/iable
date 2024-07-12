
let root = '/assets/'
if(location.href.includes('seoeunan')) root = '/iable2/'
if(location.href.includes('127.') && location.href.includes('html')) root = '/'
if(location.href.includes(':55') && location.href.includes('html')) root = '/'


function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function isIPhone() {
	return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function appendCss(src){
  let s = document.createElement("link");
  s.type = "text/css";
  s.href = root+src;
  s.rel = 'stylesheet';
  $("head").prepend(s);
}
 
function appendJs(src){
  let s = document.createElement("script");
  //s.type = "text/javascript";
  s.src = root+src;
  $("head title").after(s);
}
appendJs('js/icon.js');

$.fn.scrollStopped = function(callback) {
  var that = this, $this = $(that);
  $this.scroll(function(ev) {
    clearTimeout($this.data('scrollTimeout'));
    $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
  });
};

const autoSpace = (target) => {
  target.value = target.value
  .replace(/[^0-9]/g, '')
  .replace(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1\u00a0$2\u00a0$3\u00a0$4").replace(/(\-{1,4})$/g, ""); //\u00a0
  target.value = target.value.trim();
  if(target.value.length>=14){
    $(target).next('button').removeAttr('disabled');
  }else{
    $(target).next('button').attr('disabled', 'disabled');
  }
}


function icon(){
  document.querySelectorAll('i[class*=ico-]').forEach((el)=>{
    let cls = el.className;
    svg[cls] ? el.innerHTML = svg[cls] : null;
  });
}

function pcCheck(){
  //체크
    if(isMobile()){
      // mobile
      if(isIPhone()) $('.tooltip-home').addClass('on');
    }else{
      // pc
      $('body').addClass('pc');
    }
}

function pcWrap(){
  function f(){
    // if(isMobile()) return;
    if($(window).width() > 900){
      if($('.outer-wrap').length <= 0) {
        $('.wrap').wrap('<div class="outer-wrap"></div>');
        $('.outer-wrap').prepend('<a href="#" class="outer-link"></a>');
      }
    }else{
      if($('.outer-wrap').length > 0) {
        $('.wrap').unwrap();
        $('.outer-link').remove();
      }
    }
  }

  f();

  $(window).on('resize', function(){
    f();
  });

}


function iphoneNotch(){
  
  if($('.event-detail-img-wrap').length > 0) return; //이벤트일경우제외

  if($('.fixed-footer-wrap').length > 0) $('body').addClass('notch')
  if($('.wrap .footer').length > 0) $('.footer').addClass('notch')
  if($('.wrap .content').length > 0 && $('.wrap .footer').length <= 0) {
    if($('.wrap .content .bg-gray:last-child').length > 0) $('.wrap .content .bg-gray').addClass('notch')
    else $('.content').addClass('notch')
  }
}


function pageScrolling(){
  let stickyPos = $('.top-sticky').length > 0 ? $('.top-sticky').offset().top : 0;
  let titlePos = 0;

  if($('[data-id="header-tit"] .tit-type1').length > 0){
    titlePos = $('[data-id="header-tit"] .tit-type1').offset().top - ($('.header').height() - $('[data-id="header-tit"] .tit-type1').height());
    $('.header .tit-txt.hide').text($('[data-id="header-tit"] .tit-type1').text())
  }

  function f(){
    let top = $(this).scrollTop();

      if(top > 0 ){
        $('body').addClass('scrolling');
        if($('header').length > 0) $('header').addClass('scrolling');
      }else{
        $('body').removeClass('scrolling');
        if($('header').length > 0) $('header').removeClass('scrolling');
      }

      if(stickyPos != 0){
        if(top > stickyPos - 50) $('header').addClass('attach-sticky')
        else $('header').removeClass('attach-sticky')
      }

      if(top > titlePos){
        $('.header .tit-txt.hide').fadeIn();
      }else{
        $('.header .tit-txt.hide').fadeOut();
      }
  }

  f();
  $(document).on('scroll', f);
}


function fitH(){
  if($('.fit-wrap').length > 0){
    let minus = $('.header').length > 0 ? 70 : 40;
    $('.fit-wrap').css('min-height', window.innerHeight - minus);
  }
}

// input 포커스
function inputFocus(input){
  if($(input).length <=0 ) return;
  $(input).each(function(input){
    let $inpwrap= $(this),
      $inp= $inpwrap.find('input, textarea');

      if($inp.val() != '') $inpwrap.addClass('has-value');

      $inp.on('keyup change', function(){
        if($inp.val() != '') {
          $inpwrap.addClass('active');
        }else {
          $inpwrap.removeClass('active');
        }
      });
      $inp.on('focus', function(){
        $inpwrap.addClass('focus');
      });
      $inp.on('focusout', function(){
        $inpwrap.removeClass('focus');
        if($inp.val() != '') $inpwrap.addClass('has-value');
        else $inpwrap.removeClass('has-value');
      });
      $inpwrap.find('.label').on('click', function(){
        $inp.focus();
      });

  });
}

// toggle-list
function toggleList(){
  let obj = '[data-evt="toggle-list"]';
  let $obj = $(obj);
  
  if($obj.length <=0 ) return;
  // let h = $($obj).find('.tit span').height();

  $obj.on('click', 'a.desc, button.desc', function(e){
    let $obj = $(this).parents(obj);

    if($(this).parents().hasClass('pos-move'))  $("html, body").animate({ scrollTop: $(this).offset().top }, "slow");
    
    if(e.target.closest('.stop-event')) return;

    let $parents =  $(this).parents('li').length > 0 ? $(this).parents('li') : $(this).parents('dl').length > 0 ? $(this).parents('dl') : ''
    let $view =  $parents.find('.detail');
    // $obj.find('li').not($view.parents('li')).find('.tit').animate({'height':h}, 150);
    // $obj.find('.detail').not($view).slideUp(function(){
    $obj.find('.detail').not($view).slideUp(function(){
      if($obj.find('li').length > 0){
        $obj.find('li').not($view.parents('li')).removeClass('on');
        $obj.find('li').not($view.parents('li')).find('.tit').removeAttr('style');
      }
    }); 

    if($view.is(':hidden')){
      $parents.addClass('on'); 
      // $view.parents('li').find('.tit').removeAttr('style');
      // let h2 = $view.parents('li').find('.tit span').height();

      // $view.parents('li').find('.tit').height(h);
      // $view.parents('li').find('.tit').animate({'height':h2}, 150);
      $view.slideDown();
    }else{
      // $view.parents('li').find('.tit').animate({'height':h}, 150);
      $view.slideUp(function(){
        $parents.removeClass('on');
        // $view.parents('li').find('.tit').removeAttr('style');
      });
    }

    if($obj.hasClass('list-type1') || $obj.hasClass('list-type2')) {
      setTimeout(function(){
        let h1 =  $('.header.attach-sticky').length > 0 ? $('.header').height() : 0;
        let h2 =  $('.top-sticky.attached').length > 0 ? $('.top-sticky.attached').height() : 0;
        if(h1 > 0 || h2 > 0) $('html, body').animate({scrollTop: $(e.currentTarget).offset().top - (h1+h2)}, 200);
      }, 400);
    }
  });
}

function toggleClassList(btn){
  $(btn).on('click', function(){
    $(btn).removeClass('on');
    $(this).parents('li').siblings().removeClass('on');    
    $(this).addClass('on');
    $(this).parents('li').addClass('on');
  });
}


function toggleClass(btn, cls){
  let $input = function(){
    if($(btn).find('.inp-check').length > 0) {  
      return $(btn).find('.inp-check input');
    }
  }();

  if($(btn).hasClass('on')) {
    $(btn).removeClass('on');
    if($input) $input.prop('checked', false);
  }else{
    $(btn).addClass('on');
    if($input) $input.prop('checked', true);
  }
}

function favorite(){
  $('.btn-favorite').on('click', function(e){
    e.preventDefault();
    // if($('.toast-pop').length > 0) return;
    if(!$(this).hasClass('on')){
      $(this).addClass('on');
      toastOpen('<i class=\'ico-heart2-on\'></i>마이페이지> 위시리스트에  보관되었습니다.');
    }else{
      $(this).removeClass('on');
      toastOpen('<i class=\'ico-heart2-off\'></i>마이 위시리스트에서 해제되었습니다.');
    }
  });
}

function prdCheckOn(obj, option, callback, callstop){

  let init = (exp)=>{
    $(obj).not(exp).removeClass('on');  
    $(obj).not(exp).find('.inp-check input').prop('checked', false);
    $(obj).not(exp).find('.num').val(0);
    $(obj).not(exp).find('.down').attr('disabled', 'disabled');
    $(obj).not(exp).find('.up').removeAttr('disabled');
  }

  $(obj).each(function(){
    let $obj = $(this);
    let $checked = $obj.find('.inp-check input');
    let $inpNum = $obj.find('.inp-num-type1');
    let $inpNumInp = $inpNum.find('.num');
    let $inpNumBtn = $inpNum.find('button');
      // inpNum = inpNum ?  inpNum : true;

    let checkInput = ()=>{
      if($inpNumInp.val() > 0) {
        $obj.addClass('on');  
        $checked.prop('checked', true);
      }else{
        $obj.removeClass('on');  
        $checked.prop('checked', false);
      }
      
      if(callback) callback($obj);
    }

    $obj.off();
    $obj.on('click', function(){

      if(callstop) {
        let stop  = callstop($obj);
        if(stop) return;
     }

      if(option && option.type == 'radio') {
        init($(this));
      }
    
      if($obj.hasClass('on')){
        $obj.removeClass('on');  
        $checked.prop('checked', false);
        $inpNumInp.val(0)
        $inpNumInp.prev('.down').attr('disabled', 'disabled')
      }else{
        $obj.addClass('on');  
        $checked.prop('checked', true);
        if($inpNumInp.val() == 0){
          $inpNumInp.val(1)
          $inpNumInp.prev('.down').removeAttr('disabled')
        }
      }

      if(callback) callback($obj);
    });

    $inpNumBtn.on('click', function(){
      if(option && option.type == 'radio') init($(this).parents(obj));
      setTimeout(checkInput, 50);
    });

    // $inpNumInp.on('change', function(){
    //   if(option && option.type == 'radio') init($(this).parents(obj));
    //   setTimeout(checkInput, 50);
    // });
  });
}


function productDetailMenu(){
  if($('.btn-prd-menu .off').length <= 0) return;
  let $tartet;
  $('.btn-prd-menu .off').on('click', function(e){
    e.stopPropagation();
    $tartet = $(this);
    $('.btn-prd-menu .off').show();
    $('.btn-prd-menu .on').hide();
    $(this).siblings().slideDown();
    $(this).hide();
  });
  $('.btn-prd-menu .on').on('click', function(e){
    e.stopPropagation();
  });
  $('body, body *').on('click', function(e){
    if(!e.target.closest('.btn-prd-menu')) {
      $('.btn-prd-menu .off').show();
      $('.btn-prd-menu .on').hide();
    }
  });
}

function slider(obj, option, callback){
  let swiper;  
  if($(obj + ' .swiper-slide').length > 1){
    swiper = new Swiper(obj + " .swiper-container", Object.assign({
      //loop: true,
      slidesPerView: 'auto',
      //centeredSlides: true,
      // spaceBetween: 10,
      freeMode: true,
      // autoplay: {
      //     delay: 3500,
      //     disableOnInteraction: false,
      // },
      //loopedSlides: 3,
      // slidesPerGroup: 3,
      pagination: false,
      // pagination: {
      //   el: ".swiper-pagination",
      //   type: "fraction",
      // },      
      onSlideChangeEnd: function (swiper) {
        $(obj + ' .swiper-slide-prev').css('opacity', 1);
      }
    }, option));
    $(obj + ' .swiper-slide-prev').css('opacity', 0);


    $(obj).find('.play-stop').on('click', function(){
      swiper.autoplay.stop();
      if( $(obj).find('.play-start').is(':hidden')){
        $(obj).find('.play-stop').hide();
        $(obj).find('.play-start').show();
      }
    });

    $(obj).find('.play-start').on('click', function(){
      swiper.autoplay.start();
      if( $(obj).find('.play-stop').is(':hidden')){
        $(obj).find('.play-start').hide();
        $(obj).find('.play-stop').show();
      }
    });

    // callback
    if(callback) callback();

  }else{
    $(obj).find('.swiper-pagination').remove();
  }

  return swiper;
}


//first focus
function firsfocus(){
  if($('.first-focus').length <= 0) return;
  setTimeout(function(){
    $('.first-focus').focus();
  },500);
}


function footer(){
  let $footer = $('.fixed-footer-wrap');
  if($footer.length > 0){
    $footer.parents('.wrap').css({'padding-bottom':$footer.outerHeight() + 15})  
  }
}

function topSticky(){
  $('.content > .top-sticky:first-child').addClass('fixed');
  $('.content > .member-wrap > .top-sticky:first-child').addClass('fixed');

  $('.top-sticky').each(function(){
    let $obj = $(this);
    let basePos = $obj.offset().top;
    let stickyPos = $obj.data('top') ? parseInt($obj.data('top')) : 50;
    let objMargin = $obj.css('margin-top');
    let objH = $obj.outerHeight()
    let objClass = $obj.attr('class').replace('top-sticky', '');  

    let f = ()=>{
      let sct = $('html, body').scrollTop();
      if(sct > basePos - stickyPos){
        $obj.css('position', 'fixed');
        $obj.css('top', stickyPos);
        $obj.addClass('attached');
        if($obj.next('.clone').length <= 0) $obj.after("<div class='"+objClass+" clone' style='height:"+objH+"px;margin-top:"+objMargin+"'></div>");
      }else{
        $obj.attr('style', '');
        $obj.removeClass('attached');
        $obj.next('.clone').remove();
      }
    }
  
    if($(this).hasClass('fixed')){
      $(this).css('position', 'fixed');
      if($(this).next('.clone').length <= 0) $(this).after("<div class='"+objClass+" clone' style='height:"+objH+"px;margin-top:0 !important'></div>");
    }

    if($obj.hasClass('fixed')) return;

    f();
    $(window).on('scroll', function(){
      f();
    });    
  });

}

function headerTransparent(obj){
  let $obj = $(obj);
  let basePos = $obj.offset().top - 50;
  
  $(window).on('scroll', function(){
    if($(window).scrollTop() >= basePos){
      $('.header').removeClass('transparent');
      $obj.addClass('attach');
    }else{
      $('.header').addClass('transparent')
      $obj.removeClass('attach');
    }
  });

}

function formPlaceholder(){
  $('[class*=form-type] .placeholder').on('click', function(){
    $(this).prev().focus();
  });
  $('[class*=form-type] *').on('keyup', function(){
    if($(this).next('.placeholder').length <= 0) return;
    if($(this).val().length > 0){
      $(this).next().hide();
    }else{
      $(this).next().show();
    }
  });
}

//얼럿창
function alertClose(id){
  $(id).fadeOut(300, ()=>{
    $(id).remove();
   });      
  $('body').css('overflow','');
} 

function alertOpen(text, type, callback){
  if($('#alert').length > 0) return;
  const $alert = $('<div class="popup-wrap alert-pop" id="alert">' +
        '<div class="dim"></div>' +
        '<div class="pop-wrap">' +
            '<div class="popup">' +
                '<div class="pop-body">' +
                    '<div class="alert-txt">'+ text +'</div>' +
                '</div>' +
                '<div class="pop-footer">' +
                    '<div class="btn-wrap">' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>');

    $('body').append($alert);
    if(type === null){
      $alert.find('.btn-wrap').append('<a href="javascript:void(0);" class="btn btn-confirm">확인</a><a href="javascript:void(0);" class="btn btn-cancel">취소</a>')
    }

    for(let i=0;i<type.length;i++){
      $alert.find('.btn-wrap').append('<a href="javascript:void(0);" class="btn">'+type[i]+'</a>')
    }

    $alert.show()
    $alert.find('.btn').on('click', function(){
       if(callback) callback(type[$(this).index()]);
       alertClose('#alert');
    });
}

//로딩
function loading(target, callback, text1, text2){
  if($('.loading').length > 0) return;
  
  let mainTxt = text1 ? text1 : '잠시만 기다려 주십시요.';
  let subTxt = text2 ? text2 : '열심히 검색 중입니다.';

  const $loading = $('<div class="loading">' +
    '<div class="img tooltip-wrap">' +
      '<div class="tooltip"><span>예매혜택<i class="ico-down"></i></span></div>' +
        '<img src="'+root+'images/common/loading.gif" alt="">' +
      '</div>' +
    '<div class="text">' +
      '<strong>'+mainTxt+'</strong>' +
      '<p>'+subTxt+'</p>' +
    '</div>' +
  '</div>');

  if(target){
    let top = $(target).offset().top;
    $('.loading').css('top', top);
  }
  $('.wrap').append($loading);  
  icon();

  $loading.fadeIn();
  $('body, html').css('overflow', 'hidden');

  if(callback) callback();
}
function loading2(target, callback){
  if($('.loading2').length > 0) return;
  const $loading = $('<div class="loading2"><div class="four-dots"></div></div>' );

  if(target) {
    $(target).addClass('temp-relative');
    $(target).append($loading);  
  }else{
    $('.wrap').append($loading);  
  }

  $loading.fadeIn();
  $('body, html').css('overflow', 'hidden');

  if(callback) callback();
}

function loadingHide(){
  if($('.loading').length > 0){
    $('.loading').fadeOut(function(){
      $('.loading').remove();
      $('body, html').css('overflow', '');
    });
  }else{
    if($('body').css('oveflow') == 'hidden') $('body, html').css('overflow', '');
  }
}
function loadingHide2(){
  if($('.loading2').length > 0){
    $('.loading2').fadeOut(function(){
      $('.loading2').remove();
      $('body, html').css('overflow', '');
      $('.temp-relative').removeClass('.temp-relative');
    });
  }else{
    if($('body').css('oveflow') == 'hidden') $('body, html').css('overflow', '');
  }
}


//셀렉트창
function selectOpen(id, data, callback, update){
  
  $('.btn-select-wrap .select-option').hide();

  let selected = window.event.currentTarget.querySelector('span');
  let cls = $(event.currentTarget).data('option-class')

  function makeOption(){
    let list = function(){
      let html = ''
      for(let i=0;i<Object.keys(data).length;i++){
        html += '<li><button type="button" class="'+ (data[i].selected ? 'on' : '') +'" data-val='+data[i].value+' '+ (data[i].disabled ? 'disabled' : '')+' ><i class="ico-val-check"><span></span></i><span>'+data[i].option+'</span></button></li>'
      }
      return html;
    }

    $select = $('<div class="popup-wrap select-pop '+cls+'" id="'+id+'">' +
          '<div class="dim"></div>' +
          '<ul class="select-option">' + list() +'</ul>' +
      '</div>');
    $select2 = $('<ul class="select-option" id="'+id+'">' + list() +'</ul>');

      if($(event.target).parents('.btn-select-wrap').length > 0){
        $(event.target).parents('.btn-select-wrap').append($select2);
        $('body, body *').on('click', function(e){
          if(!e.target.closest('.btn-select-wrap')) {
            $select2.fadeOut(100);
          }
        });
      }else{
        $('body').append($select);
      }

      icon();
  }

  function setEvt(){
      //dim
      $('#'+id+' .dim').on('click', function(){
        $select.fadeOut(100);
      });

      //callback
      $('#'+id+' button').on('click', function(){
        const val = $(this).data('val');
        const text = $(this).find('span').html();

        $('#'+id+' button').removeClass('on');
        $(this).addClass('on');

        if(callback) callback(val, text);

        selected.innerHTML = text;
        $select.fadeOut(100);
        $select2.fadeOut(100);
    });
  }
    if(update){ //data update case
      $('#'+id).remove();
      makeOption();
      setEvt();
    }else{
      if($('#'+id).length <= 0){
        makeOption();
        setEvt();
      }else{
        
      }
    }
    
   $('#'+id).fadeIn(100)
    
}

function countInput(obj, callback, callstop){  
  if($(obj).length <= 0) return;




  $(obj).each(function(){
    let $obj = $(this);
    let $up = $(this).find('.up');
    let $down = $(this).find('.down');
    let $input =  $obj.find('.num');    
    let minCnt = $obj.data('min') != undefined ? $obj.data('min') : 0;
    let maxCnt = $obj.data('max') != undefined ? $obj.data('max') : 1000;
    let cntInputNum =  $obj.find('.num').val();
    let inpval = parseInt($obj.find('input').val());

    if($obj.closest('.inp-num-type3-wrap')){
      let $upBtn = $obj.find('.btn.up');
      let $plusBtn = $obj.siblings('.btn.plus');
      let $minusBtn = $obj.find('.btn.minus');
      $up.on('click', function(e){return false;});
      $down.on('click', function(e){return false;});
      $plusBtn.on('click', function(e){
        e.stopPropagation();
        $obj.addClass('on');
        setTimeout(function(){
          $plusBtn.hide();
          $upBtn.show();
        }, 400);
        countChange(1); // $plusBtn 클릭 시 1로 설정
        return false;
      });
      $minusBtn.on('click', function(e){
        e.stopPropagation();
        $obj.removeClass('on');
        $plusBtn.show();
        $upBtn.hide();
        countChange(0); // $minusBtn 클릭 시 1로 설정
        return false;
      });
    }    
    
    let countChange = function(v){
      let val = parseInt(v);

      if(val >= maxCnt ){
        $up.attr('disabled', 'disabled');
        $down.removeAttr('disabled');
      }else if (val <= minCnt) {
        $down.attr('disabled', 'disabled');
        $up.removeAttr('disabled');
      }else{
        $down.removeAttr('disabled');
        $up.removeAttr('disabled');
      }

      if(val > maxCnt) val = maxCnt
      else if(val < minCnt) val = minCnt
      else if(!val) val = 0

      inpval = val;
      $($input).val(val);

      if(val == 1) $obj.addClass('one');
      else $obj.removeClass('one');

      if(callback) callback($obj, val);
    }


    //초기화
    $obj.find('button').each(function(){
      if($(this).hasClass('down') && cntInputNum <= minCnt) $(this).attr('disabled', 'disabled');
      else if($(this).hasClass('up') && cntInputNum >= maxCnt)  $(this).attr('disabled', 'disabled');
    });
    $obj.find('button').off('click.count');
    $obj.find('button').on('click.count', function(e){
      e.stopPropagation();      
      if(callstop) {
        let stop  = callstop($obj);
        if(stop) return false;
     }
      inpval = parseInt($obj.find('input').val());
       if($(this).hasClass('up')) countChange(inpval + 1);
       if($(this).hasClass('down')) countChange(inpval - 1);

      //  return false;
    });
    $obj.find('input').on('focus click', function(e){
      e.stopPropagation();
      $(this).blur()
    });    
    $obj.find('input').on('change', function(){
      countChange($(this).val())
    });
  });
}

function tabMenu(gap, scrolling){
	let tab = '[data-evt*="tab-block"]';
  let aniing = false;

  if($(tab).length <= 0) return;
  $(document).on('click',  tab+' a, ' + tab+' button', function(e){
    e.preventDefault();
    let $this = $(this);
    let id = $this.attr('data-tab');
    let $target =  $('[data-id='+id+']');
    let $siblings = $this.parents('li').siblings('').find('a, button');

    if($(tab).parents('.pop-body').length > 0){
      $(tab).parents('.pop-body').scrollTop(0);
    }

		$siblings.each(function(){
		   let id = $(this).attr('data-tab');
		   $(this).parents('li').removeClass('on');
		   $('[data-id='+id+']').hide();
	   });
	   $this.parents('li').addClass('on');
	   $target.show();

    if(scrolling){
      aniing = true;
      $('html, body').animate({
      scrollTop: $target.offset().top - (gap ? gap : 0)
      }, function(){
        $(window).scrollStopped(function(){
          aniing = false
        });
      });
    }

	   return false;
   });
}

function tabMenuScroll(tab, gap){
	let $tab = $(tab);
  let aniing = false;

  if($tab.length <= 0) return;
   $(document).on('click',  tab+' a, ' + tab+' button', function(e){
    e.preventDefault();
    let $this = $(this);
    let id = $this.attr('data-tab');
    let $target =  $('[data-id='+id+']');
    let $siblings = $this.parents('li').siblings('').find('a, button');
    let pos =  $target.offset().top;

		$siblings.each(function(){
      $(this).parents('li').removeClass('on');
    });    
	  $this.parents('li').addClass('on');

    aniing = true;
    $('html, body').animate({
     scrollTop: pos - gap+1
    }, function(){
      $(window).scrollStopped(function(){
        aniing = false
      });
    });

	  return false;
   });

   //scroll
   $(window).on('scroll', function(){
      if(aniing) return;
      let sct = $('html, body').scrollTop();
      $('[data-tab]').each(function(){
        let $this = $(this);
        let id = $this.attr('data-tab');
        let pos = $('[data-id='+id+']').offset().top;
        if(sct > pos - gap) {
          $('[data-tab]').parent().removeClass('on');
          $('[data-tab='+id+']').parent().addClass('on');
        }else{
          $('[data-tab='+id+']').parent().removeClass('on');
        }
      })
  });
}

//토스트
function toastOpen(text, callback, callstop){
  const $toast = $('<div class="toast-pop">' +
        '<div class="dim"></div>' +
          '<div class="toast-text">' + text +'<button type="button" class="close"></button></div>' +
    '</div>');

    if(callstop){
      if($('.toast-pop').length > 0) return;
    }

    $('.wrap').append($toast);
    icon();

    setTimeout(function(){
      $toast.addClass('on');
    }, 200);
    setTimeout(function(){
      $toast.removeClass('on');
    }, 900);
    setTimeout(function(){
      $toast.remove()
    }, 1320);
    setTimeout(function(){
      if(callback) callback();
    }, 1500);
}

//팝업
function popClose(popup){
  let $popup = $(popup);
  $popup.fadeOut()
}

function popOpen(popup, callback){
  let $popup = $(popup);
  $popup.fadeIn()
  
  $popup.find('.btn-close').on('click', function(){
    $popup.hide();
  });

  if(callback) callback();
}

  function streamBanner(obj, time){
    let bannerLeft, first, last, imgCnt, $wrap, wrapW, $img, imgW, $first, $last, imgNumber;
  
    //init 
    init();
    function init(){
      bannerLeft=0;
      first=1;
      last;
      imgCnt=0;
      $wrap = $(obj);
      wrapW = $wrap.outerWidth();
      $img = $wrap.find('img');
      imgW = $img.outerWidth();
      $first;
      $last;
      imgNumber = wrapW / imgW;
  
      $img.not(':first-child').remove();
      $img.attr('style', '');
      $img = $wrap.find('img');
    }
  
    //init set
    initset();
    function initset(){
      if(imgW <= 0) return;
      $wrap.append($img.clone());
      
      for(let i = 0;i<=(imgNumber+1);i++){
        $wrap.append($img.clone())
      }
      
      $img = $wrap.find('img');
  
      $img.each(function(){
        $(this).css("left",bannerLeft);
        bannerLeft += imgW;
        $(this).attr("data-id", "banner"+(++imgCnt));  // img에 id 속성 추가
      });
  
      last = imgCnt;
    }
  
    function move() {
      if(imgW <= 0) return;
      $img.each(function(){
        $(this).css("left", $(this).position().left-1); // px씩 왼쪽으로 이동
      });
      $first = $wrap.find('[data-id=banner'+first+']');
      $last = $wrap.find('[data-id=banner'+last+']');
      if($first.position().left < -200) { // 맨앞에 배너 맨뒤로 옮김
        $first.css("left", $last.position().left + $last.width() );
        first++;
        last++;
        if(last > imgCnt) { last=1; }   
        if(first > imgCnt) { first=1; }
      }
    }
    let interval = setInterval(move, time);
  
    let width = $(window).width();
    $(window).resize(function(e){
      if($(window).width() != width){
        init();
        initset();
        clearInterval(interval);
        interval = setInterval(move, time);
       }
       width = $(window).width();
    }); 
  }
  

// 하단 팝업
function btmPopOpen(id, callback, closeCallback){
  let $sideMenuWrap = $(id);
  let $sideMenu = $sideMenuWrap.find('.pop-wrap');
  let $close = $sideMenuWrap.find('.btn-close');
  
  $(window).scrollTop(0);
  $sideMenuWrap.show();
  // $sideMenu.height('auto');
  $sideMenu.slideDown(300, function(){
    icon();
    tabMenu();
    $('body, html').addClass('hidden');
    $sideMenuWrap.addClass('on');
    // if($sideMenuWrap.hasClass('half')) $sideMenu.css('min-height', '65%');
    $sideMenu.height($sideMenu.height())
    if(callback) callback();
  });
  $close.on('click', function(){
    btmPopClose(id, closeCallback);
  });
  
}

function getPos(obj){
  orgPos = $(window).scrollTop();
}
function setPos(){
  $(window).scrollTop(orgPos);
  orgPos = null
}


function btmPopClose(id, callback){
  let $sideMenuWrap = $(id);
  let $sideMenu = $sideMenuWrap.find('.pop-wrap');

    $sideMenu.css('min-height', 0);
    $sideMenu.slideUp(function(){
      $sideMenuWrap.removeClass('on');
      $sideMenu.css('bottom', 0);
      $sideMenu.attr('style', '');
      $sideMenuWrap.fadeOut();
      if(callback) callback();
    })

    $('body, html').removeClass('hidden');
}

// 열차시간리스트
function timeTable(){
  $('.data-time-table:not(.type2) .info').on('click', function(){
    if($(this).siblings('.desc').length <=0) return;
    let $wrap = $(this).parents('li');
    let $desc = $(this).siblings('.desc');

    $('.data-time-table li .desc').stop().slideUp();
    $('.data-time-table li').removeClass('on');

    $wrap.addClass('on');
    $desc.stop().slideDown();
    
  });
  //예약버튼
  $('.data-time-table .btn:not(div)').on('click', function(){
    if($(this).hasClass('disabled')) return;
    let $wrap = $(this).parents('.data-time-table');

    $wrap.find('.btn').removeClass('on');    
    $(this).addClass('on');
  });  

  //일반예약버튼
  $('.data-time-table .btn-normal').on('click', function(){
    if($(this).hasClass('disabled')) return;
    let $wrap = $(this).parents('li');

    $wrap.removeClass('sale');

    $('[data-id=sale-ticket]').hide();
    $('[data-id=normal-ticket]').show();

  });
  //할인예약버튼
  $('.data-time-table .btn-sale').on('click', function(){
    if($(this).hasClass('disabled')) return;
    let $wrap = $(this).parents('li');

    $wrap.addClass('sale');

    $('[data-id=normal-ticket]').hide();
    $('[data-id=sale-ticket]').show();
  });

}

// 좌석셋팅
function resetSeat(){
  $('.seat-wrap.etc').remove();
  $('.seat-list').html('');
  $('[data-id=selected-seat]').html(9);
  $('[data-id=select-seat]').html(0);  
}
function seatHtml(data, type, windowsCallback){
  resetSeat();

  let windows = [];
  for(let i =0;i<=15;i++){
    windows.push('2-1')
    windows.push('2-2')
  }  
  if(windowsCallback) windowsCallback(windows);

  let html = '<div>';
      for(let i in data){
          let empty = data[i].empty ? 'empty' : '';
          let win = windows[Math.ceil(i/4)] == 1 ? 'only' : windows[Math.ceil(i/4)] == '2-1' ? 'set-first': 'set-last';
          let disabled = data[i].disabled ? 'disabled' : '';

          if(i==0) html = '<div class="seat-wrap '+win+'">';
          if(i!=0 && i%4 == 0) html += '</div><div class="seat-wrap '+win+'">';
          html += '<div class="seat '+ empty +'">';
          
          if(empty === 'empty') html += ' <div class="seat-st"'+disabled+'>'+data[i].num+'</div>';
          else if(data[i].num === '전동') html += ' <button class="seat-st electric"'+disabled+'><i class="ico-electric"></i><div>'+data[i].num+'</div></button>';
          else if(data[i].num === '장애인') html += ' <button class="seat-st bathchair"'+disabled+'><i class="ico-bathchair-sm"></i></button>';
          else html += ' <button class="seat-st"'+disabled+'>'+data[i].num+'</button>';

          html += '</div>';
          if(i%4 == 1) html += '<div class="seat-center"><i></i></div>';
          if(i==data.length) html += '</div>';
      }
  html += '</div>';

  let html2 = '<div class="seat-wrap etc">';
      html2 +='  <div class="seat st1">';
      html2 +='    <i class="ico-toilet"></i>';
      html2 +='  </div>';
      html2 +='  <div class="seat st1 right">';
      html2 +='    <i class="ico-toilet"></i>';
      html2 +='  </div>';
      html2 +='</div>';

  let html3 = '<div class="seat-wrap etc">';
      html3 +='    <div class="seat st2">';
      html3 +='      <i class="ico-toilet"></i>';
      html3 +='      <i class="ico-bathchair"></i>';
      html3 +='    </div>';
      html3 +='</div>';

  //시설물 타입
  // if(type === 2){
  //   $('.seat-list-wrap').append(html2);
  // }else if(type === 3){
  //   $('.seat-list-wrap').prepend(html2);
  // }else if(type === 4){
  //   $('.seat-list-wrap').prepend(html3);
  // }

  $('.seat-list').append(html);
  icon();
  selectSeat();
}

function selectSeat(max){
  let currentSeat = 0;
  let maxSeat = max ? max : 9;
  // $('[data-id=max-seat]').html(maxSeat);
  $('[data-id=select-seat]').html(currentSeat);

  $('.seat-list .seat button').on('click', function(){
      if($(this).hasClass('on')){
          $(this).removeClass('on');
          currentSeat -= 1;
      }else{
          if(currentSeat >= maxSeat) return;
          $(this).addClass('on');
          currentSeat += 1;
      }
      let selectedSeat = function(){
          let seat = [];
          $('.seat-list button.on').each(function(){
              seat.push($(this).text());
          });
          return seat.join(',');
      }

      if(currentSeat >= maxSeat){
          $('[data-id=btn-complete]').removeAttr('disabled');
      }else{
          $('[data-id=btn-complete]').attr('disabled', 'disabled');
      }

      $('[data-id=selected-seat]').html(selectedSeat());
      $('[data-id=select-seat]').html(currentSeat);
  });
}

function targetInclude(btn, target, page, callback){
  $(window).scrollTop(0);
  if(btn){
    $(btn).siblings().removeClass('on');
    $(btn).addClass('on');
  }

  $(target).html('');
  $(target).load(page, function(){
    icon();
    if(callback != undefined) callback();
  });
}

function loadInclude(page, option, callback){
  if($('[data-id='+page+']').length > 0) return;
  if(option && option.pos){
    $(option.pos).append('<div data-id="'+page+'"></div>');
  }else{
    $('.content').after('<div data-id="'+page+'"></div>');
  }
  $('[data-id='+page+']').load( root+"html/"+page+".html" , function(){
    $('[data-id='+page+']').children().attr('data-wrap-id', page).unwrap();
  });

  setTimeout(function(){
    if(callback) callback();
  }, 50);
}


function clip(url, txt){
  let textarea = document.createElement("textarea");

  event.preventDefault();
  document.body.appendChild(textarea);
  textarea.value = url;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert(txt)
  return;
}

function flyPaper(){
  appendCss('css/fly-paper.css');
  let html =''
  let ani = ['_2thOBf94jWhgBwzSFXYHLp', '_2WkOIesXH5Cw3zTS5y-JT8', 'GMBaxb-zLDZONuWdi8gyk', '_-0i-SxE3bV1nIpTK0HUiP', 'rrl-oGSE4k_av_IMDjmRp', '_2EK-ZIS9dxYvKh-sQw_Lak', '_3Z-jR8Ug70hpscq8Yq6LWE', '_1Z63nFdcOGMOPqfSur8rIU', 'a3v_sZY389HcLCFEj2GK_', '_2X-SnVmbBAIbiIHus94yj9', '_2oUNgWo9Ti1PKVKJ4EB56r', '_2tnJGvJtuh66xiFYi39T43', '_11cmivqzq-wvNYWi3G0ax6']
  
  for(let i=0;i<20;i++){
    html += '<div style="animation-name: '+ani[i > 12 ? i-12 : i]+';"></div>'
  }

  $('.fly-paper').append(html);
}

function checkRadio(){
  $('.check-radio input').on('change', function(){
    let name = $(this).attr('name');
    let chcked = $(this).prop('checked');

    $('[name='+name+']').prop('checked', false);
    if(chcked) $(this).prop('checked', true);
  });
}

function maxLengthChk(object){
  $(object).on('input', function(){
    if(this.value.length > this.maxLength){
      this.value = this.value.slice(0, this.maxLength);
    }
  })
}

function jumpInput(){
  $('[data-id=jump-input] input').on('keyup', function () {
      if (this.value.length == this.maxLength) {
        $(this).next('input').focus();
      }
  });  
}

function scrollLeft(obj){
  const slider = document.querySelector(obj);
  if($(obj).length <= 0) return;
  let isDown = false;
  let startX;
  let scrollLeft;
  
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });  
}


function pipayGuide(){
  if($('.guide-pinpay .guide-pinpay-detail').is(':hidden')){
    $('.guide-pinpay').addClass('on');
    $('.guide-pinpay .guide-pinpay-detail').slideDown(350, function(){
      $('html, body').animate({scrollTop:$('.guide-pinpay').offset().top + $('.guide-pinpay').outerHeight()}, 500);
    });
  }else{
    $('.guide-pinpay').removeClass('on');
    $('.guide-pinpay .guide-pinpay-detail').slideUp(350);
  }
}

function flipCard(){
  $(document).on('click', '.btn-flip', function() {
    $(this).prev('.gift-card').toggleClass('flipped');
    $(this).addClass('btn-flip-click');
    $(this).find('.arrow').toggleClass('arrow_rotate');

    $(this).on('transitionend', function() {
      $(this).removeClass('btn-flip-click');
      $(this).addClass('btn-flip_back');
    });
  });
}

// load  
$(function(){
  pcCheck();
  pcWrap();
  iphoneNotch();
  icon();
  inputFocus('.form-type1');
  inputFocus('.form-type2');
  fitH();
  pageScrolling();
  toggleList(); 
  toggleClassList(); 
  // topSticky();
  formPlaceholder();
  countInput('[data-evt*="inp-number"]', false);
  footer();
  timeTable();
  // favorite();
  tabMenu();  
  productDetailMenu();
  checkRadio();
  scrollLeft('.tab-type1 ul');
  scrollLeft('.tab-type2 ul');
  scrollLeft('.sale-seat-wrap .seat-list');
  flipCard();
});

//resize
$(window).on('resize', function(){
  fitH();
});
//load
$(window).on('load', function(){
  topSticky();
});

document.addEventListener("visibilitychange", () => {
  pageScrolling();
});

setTimeout(function(){
  pageScrolling();
},1000000) //10분

/*
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  alert("dark");
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  alert("light");
  }
*/
