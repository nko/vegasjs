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
      html += '<li><a href="' + this.songs[i].path + '">' + this.songs[i].title + '</a></li>'
    };
    
    $('#songCanvas ul').html(html);
    
    songClickandPlay();
    
  },
  populateGenres: function() {

    var html = '',
        genres = [];

    for (var i=0; i < this.songs.length; i++) {
      genres.push(this.songs[i].genre);      
    };
    
    genres = _.uniq(genres)
    
    for (var k=0; k < genres.length; k++) {
      html += '<li>' + genres[k] + '</li>'
    };
    
    $('#genres ul').html(html);

  },
  populateArtists: function() {

    var html = '',
        artists = [];

    for (var i=0; i < this.songs.length; i++) {
      artists.push(this.songs[i].artist);      
    };
    
    artists = _.uniq(artists)
    
    for (var k=0; k < artists.length; k++) {
      html += '<li>' + artists[k] + '</li>'
    };
    
    $('#artists ul').html(html);

  },
  populateAlbums: function() {

    var html = '',
        albums = [];

    for (var i=0; i < this.songs.length; i++) {
      albums.push(this.songs[i].album);
    };
    
    albums = _.uniq(albums)
    
    for (var k=0; k < albums.length; k++) {
      html += '<li>' + albums[k] + '</li>'
    };
    
    $('#albums ul').html(html);

  }
  
};

function loadSongs() {
  $('#playPause').addClass('paused');
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/catalog',
    success: function(data) {
      ntunes.songs = data.songs;
      ntunes.populateSongs();
      ntunes.populateGenres();
      ntunes.populateArtists();
      ntunes.populateAlbums();
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
      var title = target.text();
      var artist = target.attr('title');
      var song = target.attr('href');
      $('#playPause').toggleClass('paused');
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
  });
  
  $('#playPause').click(function(){
    var playa = document.getElementById('playa');
    if (!$(playa).hasClass('paused')) {
      playa.pause();
      $(playa).toggleClass('paused');
      $(this).toggleClass('paused');
    } else {
      playa.play();
      $(playa).toggleClass('paused');
      $(this).toggleClass('paused');
    }
  });
  
  $('body').keypress(function(e){
    if (e.keyCode == '32') {
      $('#playPause').click();
    }
  });
}

