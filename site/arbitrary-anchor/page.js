;(function(){

  var $body         = $('body');
  var $html         = $('html');
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
  });
  
  
  $('a.callout-link').on('click', function(e){
    e.preventDefault();  
    window.location.hash = new Date().getTime();  
    window.location.hash = $(this).attr('href');
  });

  $scrollToTop.on('click', function(){
    $body.add( $html ).animate({ scrollTop: 0 }, 100);
    $(this).removeClass('shown')
  })

})(window, jQuery)