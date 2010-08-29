/* Main Site Scripts Go Here */

$(document).ready(function(){
  setupWindowResizing();
  setupLibraryCollapse();  
  loadSongs();
});

// Namespace our ish a little...
ntunes = {
  songs: [],
  populateSongs: function() {
    
    var html = '';
    
    for (var i=0; i < this.songs.length; i++) {
      html += '<a href="' + this.songs[i].path + '" title="' + this.songs[i].artist + '">' + this.songs[i].title + '</a>'
    };
    
    $('#songCanvas').html(html);
    
    songClickandPlay();
    
  }
};

function loadSongs() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/catalog',
    success: function(data) {
      ntunes.songs = data.songs;
      ntunes.populateSongs();
    }
  });
};

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
      target.attr('id', 'playing');
      var title = target.text();
      var artist = target.attr('title');
      var song = target.attr('href');
      $('#scrubber').html('<h3>' + 
                          title + 
                          '</h3><h4>' + 
                          artist + 
                          '</h4><audio id="playa" autoplay autobuffer><source src="/music/ogg/' + 
                          song + 
                          '.ogg" /><source src="/music/mp3/' + 
                          song + 
                          '.mp3" /></audio>');
    }
    document.getElementById('playa').addEventListener('onended', function(){
      $('#playing').next('A').dblclick().end().attr('id', '');
    }, false);
  });
  
  $('#playPause').click(function(){
    var playa = document.getElementById('playa');
    if (!$(playa).hasClass('paused')) {
      playa.pause();
      $(playa).addClass('paused');
      $(this).addClass('paused');
    } else {
      playa.play();
      $(playa).removeClass('paused');
    }
  });
  
  $('#nextSong').click(function(e){
    e.preventDefault();
    $('#playing').next('A').dblclick().end().attr('id', '');
  });
  
  $('#prevSong').click(function(e){
    e.preventDefault();
    $('#playing').prev('A').dblclick().end().attr('id', '');
  });
  
  $('body').keypress(function(e){
    if (e.keyCode == '32') {
      $('#playPause').click();
    }
  });
}

