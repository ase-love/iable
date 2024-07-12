(function ($) {
    $.fn.onscroll = function (options) {
        var settings = $.extend({
            backgroundColor: "#7030a0",
            height: '3px',
            // position: 'fixed'
        }, options);
        var mySelector = this;
        this.each(function () {
            $(window).scroll(function () {
                var offsettop = parseInt($(this).scrollTop());
                var parentHeight = parseInt($('.container').height() - $(window).height());
                var vscrollwidth = Math.floor(offsettop / parentHeight * 100);
                if(vscrollwidth > 100) vscrollwidth  = 100
                $(mySelector).css({width: vscrollwidth + '%'});
            });
            $(mySelector).css({
                backgroundColor: settings.backgroundColor,
                height: settings.height,
                position: settings.position
            });
        });
        return this;
    };
}(jQuery));

var swiper

$(function(){
    $(window).scroll();
    $("#progress-bar").onscroll({backgroundColor: '#000000', height: '2px', position: 'fixed'});

    flyPaper();
});

var motion=[];
let dir = true
let scrollPos = 0
$(window).scroll(function(){
    let scTop = $(window).scrollTop();

	let end = parseInt(document.body.offsetHeight + scTop) >= document.body.scrollHeight - 100
	let total = $('[data-ani]').length

   $('[data-ani]').each(function(){
        let $this = $(this);       
        let top = $(this).get(0).getBoundingClientRect();
        let delay =$this.data('delay')? $this.data('delay') : 0;
        dir = scrollPos - scTop > 0

        if(!dir){
            let pos =  $(window).height() - $(window).height() / 6;    

            if(top.top < $(window).height() *2){
                if($this.hasClass('srtplay-app-slider')){
                    $('.swiper-pagination .swiper-pagination-bullet').eq(0).click();
                }                
            }

            if(top.top < - $this.height()){
                $this.removeClass('on');
            }else if(top.top < pos) {
                motion[$this.index()] = setTimeout(function(){
                    $this.addClass('on');
                }, delay);
            }

            if(end) {
                $('[data-ani]').eq(total-1).addClass('on')
            }
        }else{
            let pos =  $(window).height() / 6;
            if(top.top > $(window).height() - ($(window).height() /6 )){
                $this.removeClass('on');
            }else if(top.top > pos) {
                motion = setTimeout(function(){
                    $this.addClass('on');
                }, delay);            
            }
        }
   })
   scrollPos = scTop      
});

$(window).scrollStopped(function(){
    $('[data-ani]').each(function(){
        let $this = $(this);       
        let top = $(this).get(0).getBoundingClientRect();
        if($this == $('.srtplay-app-slider')) return;
        if(top.top < - $this.height()){
            $this.removeClass('on');
        }
   })
});