/* Main Site Scripts Go Here */

$(document).ready(function(){
  var wrap = $('#wrap');
  wrap.height($(window).height() - 144);
  $('body').height($(window).height() - 62);
  
  $(window).resize(function(){
    wrap.height($(window).height() - 144);
    $('body').height($(window).height() - 62);
  });
});