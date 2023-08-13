const http = require("http");
require("dotenv").config();
const getReq=require("./methods/getReq");
const postReq=require("./methods/postReq");
const putReq=require("./methods/putReq");
const deleteReq=require("./methods/deleteReq");
let movies=require("./data/movies.json"); 
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  req.movies=movies;
  switch (req.method) {
    case "GET":
     getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
     deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ title:"Not found" ,message:"Route not found"}));
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
