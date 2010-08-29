var app = require('express').createServer(),
    express = require('express'),
    sys = require('sys'),
    couchdb = require('node-couchdb/lib/couchdb'),
    client = couchdb.createClient(5984, 'vegasjs.couchone.com'),
    db = client.db('ntunes');
var self = this;
this.local = [];

app.use(express.staticProvider(__dirname + '/public'));

db.getDoc('ca988e74ba39dd1c6431d61f01001624', function(er, doc) {
  if (er) throw new Error(JSON.stringify(er));
  sys.puts('Fetched my new doc from couch:');
  sys.puts(sys.inspect(doc));
  self.local.push(doc);
});

app.set('views', __dirname + '/views');
app.get('/', function(req, res){
  res.render('index.ejs', {
    locals: {
      songs: self.local
    }
  });
});

app.listen(80);
// 
// db
//   .allDocs(function(er, doc){
//     if (er) throw new Error(JSON.stringify(er));
//       console.log('Fetched my new doc from couch:');
//       console.log(doc);
//   });
// db
//   .saveDoc('my-doc', {awesome: 'couch fun'}, function(er, ok) {
//     if (er) throw new Error(JSON.stringify(er));
//     sys.puts('Saved my first doc to the couch!');
//   });
// 
