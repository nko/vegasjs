var http = require('http'),
    cp = require('child_process'),
    port = parseInt(process.env.PORT) || 8001 

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  cp.exec("node -v", function(error, stdout, stderr) {
    res.end(stdout);
  });
  
}).listen(port)