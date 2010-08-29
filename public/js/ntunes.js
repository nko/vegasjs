/* Main Site Scripts Go Here */

$(document).ready(function(){
  setupWindowResizing();
  setupLibraryCollapse();
  setListRandomizer();
  $( "#library" ).resizable({ handles: 'e' });
});

function setupWindowResizing() {
  var wrap = $('#wrap');
  wrap.height($(window).height() - $('#header').height());
  $('body').height($(window).height());
  
  $(window).resize(function(){
    wrap.height($(window).height() - $('#header').height());
    $('body').height($(window).height());
  });
}

function setupLibraryCollapse() {
  $('#library').click(function(e){
    var target = e.target;
    if(target.tagName == 'H2') {
      if(!$(target).hasClass('closed')) {
        $(target)
            .next('UL')
            .slideUp('fast')
          .end()
            .addClass('closed');
      } else {
        $(target)
            .next('UL')
            .slideDown('fast')
          .end()
            .removeClass('closed');
      }
      
    }
  });
}

function setListRandomizer() {
  
}
