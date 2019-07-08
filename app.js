const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const type = require('./mine').types;
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  var realPath = path.join("assets", pathname);

  var ext= path.extname(pathname); // 获取扩展名
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, (err) => {
    if (!err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write("This request URL " + pathname + " was not found on this server.");
      res.end();
    } else {
      fs.readFile(realPath, (err, file) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.write("This request URL " + pathname + " was not found on this server.");
          res.end();
        } else {
          var contentType = type[ext] || "text/plain";
          res.writeHead(200, {
              'Content-Type': contentType
          });
          res.write(file, "binary"); // binary 是 encoding
          res.end();
        }
      })
    }
  })
}); 

server.listen(port, hostname, () => {
  // console.log(`Server is running...  http://${hostname}:${port}/index.html`);
  console.log("Server running at port: " + port + ".");
});
