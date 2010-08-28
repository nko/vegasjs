var app = require('express').createServer();

app.set('views', __dirname + '/../public/views');
app.get('/', function(req, res){
  res.render('index.ejs');
});

app.listen(3000);
// var
//   sys = require('sys'),
//   couchdb = require('node-couchdb/lib/couchdb'),
//   client = couchdb.createClient(5984, 'vegasjs.couchone.com'),
//   db = client.db('test');
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
// db
//   .getDoc('my-doc', function(er, doc) {
//     if (er) throw new Error(JSON.stringify(er));
//     sys.puts('Fetched my new doc from couch:');
//     sys.p(doc);
//   });