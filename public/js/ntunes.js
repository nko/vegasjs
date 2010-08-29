/* Main Site Scripts Go Here */

$(document).ready(function(){
  setupWindowResizing();
  setupLibraryCollapse();
  songClickandPlay();
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

function songClickandPlay() {
  var sCan = $('#songCanvas');
  sCan.click(function(e){
    e.preventDefault();
    var target = $(e.target);
    sCan
      .find('.focus')
      .removeClass('focus');
    if (target.attr('href')) {
      target.addClass('focus');
    }
  });
  
  sCan.dblclick(function(e){
    var target = $(e.target);
    if (target.attr('href')) {
      var title = target.text();
      var artist = target.attr('title');
      var song = target.attr('href');
      $('#scrubber').html('<h3>' + title + '</h3><h4>' + artist + '</h4>');
    }
  });
}

