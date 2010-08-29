/**
 * Module dependencies.
 */

var couchdb = require('couchdb'),
    client = couchdb.createClient(5984, 'vegasjs.couchone.com'),
    db = client.db('ntunes');

var doc = {
  'title': 'There is a place',
  'artist': 'Drunksouls',
  'album': 'On verra plus tard ...',
  'date': 2006,
  'track': 4,
  'genre': 'Blues',
  'copyright': '2006 Drunksouls. Licensed to the public under http://creativecommons.org/licenses/by-nc-nd/2.5/ verify at http://www.jamendo.com/album/1052/',
  'description': 'http://www.jamendo.com/',
  'path': 'There is a place'  
}

db.saveDoc(doc, function(er, ok) {
  if (er) throw new Error(JSON.stringify(er));
  console.log('Doc Written');
});