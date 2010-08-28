var sys = require('sys')
    ,request = require('request')
    ,h = {accept:'application/json', 'content-type':'application/json'};
 
// request({uri:'http://vegasjs.couchone.com:5984/_all_dbs', headers:h}, function (err, response, body) {
//   console.log(sys.inspect(JSON.parse(body)));
// });
 
// request({uri:'http://vegasjs:dylan@dylan.couchone.com:5984/testdb', method:'PUT', headers:h}, function (err, response, body) {
//   if (err) throw err;
//   if (response.statusCode !== 201) throw new Error("Could not create database. "+body);
// });

var dburi = 'http://vegasjs:dylan@dylan.couchone.com:5984/test'
request({uri:dburi, method:'POST', body:JSON.stringify({data:'somedata'})}, function (err, resp, b) {
  if (err) throw err;
  if (resp.statusCode !== 201) throw new Error("Could not create document. "+b);
  console.log(b);
})