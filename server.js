/*!
 * nTunes
 * Copyright(c) 2010 Brian Egan <brian@brianegan.com> and Dylan Bathurst <Dylan Bathurst <dylanbathurst@gmail.com>
 * MIT Licensed
 */
    
    
var // Module Deps
    app = require('express').createServer(),
    express = require('express'),
    couchdb = require('node-couchdb/lib/couchdb'),
    
    // CouchDB Connection
    client = couchdb.createClient(5984, 'vegasjs.couchone.com'),
    db = client.db('ntunes'),
    
    // Save this from itself!
    self = this;
    
this.local = [];

/**
 * Express config
 */
app.use(express.staticProvider(__dirname + '/public')); // Serve static files from /public
app.set('views', __dirname + '/views'); // Use /views as our template directory

/**
 * Routes
 */
 
// Home Page
app.get('/', function(req, res){
  res.render('index.ejs', {
    locals: {
      songs: self.local
    }
  });
});

// Catalog
app.get('/catalog', function(req, res) {
  
  // Create an object to send as our response
  var response = {
    "songs": []
  };
  
  // Grab all our docs from CouchIO
  db.allDocs(function (err, all) {
    
    var records = all.rows, // All the rows in our DB
        addSong = function(doc) { // The function we use to add Songs to the respons untl the response is ready
          response.songs.push(doc); // Add a song to our response
          if (response.songs.length == all.rows.length) { // If we've got all our songs
            res.send(response); // Send the response!
          };
        };
    
    // Runs through all the rows (ie Songs), grabbing their data and stuffing it into the response
    for (var i=0; i < records.length; i++) {
      db.getDoc(records[i].id, function(docErr, doc) {        
        if (docErr) {
          // Homey don't play dat.
          throw new Error(JSON.stringify(docErr));
        } else {
          addSong(doc);
        }         
      });
    };
  }); // end db.allDocs
}); // end app.get 

// Listen on port 80
app.listen(3000); 
