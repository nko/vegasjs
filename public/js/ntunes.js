/* Main Site Scripts Go Here */

var wHeight = document.documentElement.clientHeight;
var body = document.getElementsByTagName('body')[0];
var library = document.getElementById('library');
var songCanvas = document.getElementById('songCanvas');

var appHeight = wHeight - 62;
var libHeight = appHeight - 82;

body.style.height = appHeight + 'px';
library.style.height = libHeight + 'px';
songCanvas.style.height = libHeight + 'px';