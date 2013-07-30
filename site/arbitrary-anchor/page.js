;(function(){

  var $body         = $('body');
  var $scrollToTop  = $('.scroll-to-top');

  var scrollTimeout;
  $(window).on('scroll', function(){

    var $this = $(this);

    if ( scrollTimeout )
        clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(function(){
      if ( $this.scrollTop() > 100 ) {
        $scrollToTop.addClass('shown')
      } else {
        $scrollToTop.removeClass('shown')
      }

    }, 500)
  })


  $scrollToTop.on('click', function(){
    $body.animate({ scrollTop: 0 }, 100);
    $(this).removeClass('shown')
  })

})(window, jQuery)