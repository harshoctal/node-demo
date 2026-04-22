const http = require("http");
http.createServer((req,res)=>{
  res.end("Hello from Kubernetes!");
}).listen(3000);