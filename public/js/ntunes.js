/* Main Site Scripts Go Here */

$(document).ready(function(){
  setupWindowResizing();
  setupLibraryCollapse();
});

function setupWindowResizing() {
  var wrap = $('#wrap');
  wrap.height($(window).height() - 144);
  $('body').height($(window).height() - 62);
  
  $(window).resize(function(){
    wrap.height($(window).height() - 144);
    $('body').height($(window).height() - 62);
  });
}

function setupLibraryCollapse() {
  $('#library').click(function(e){
    var target = e.target;
    if(target.tagName == 'H2') {
      if(!$(target).hasClass('closed')) {
        console.log('foo');
        $(target)
            .next('UL')
            .slideUp('fast')
          .end()
            .addClass('closed');
      } else {
        console.log('bar');
        $(target)
            .next('UL')
            .slideDown('fast')
          .end()
            .removeClass('closed');
      }
      
    }
  });
}