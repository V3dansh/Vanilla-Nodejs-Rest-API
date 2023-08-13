const requestBodyParser = require("./../util/body-parser");
const writeToFile = require("./../util/write-to-file");

module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseUrl);
  let id = req.url.split("/")[3];
  console.log(id);
  const regxV4 = new RegExp(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  );
  if (!regxV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regxV4.test(id)) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });
      if (index == -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not found", message: "Movie not found" })
        );
        res.end();
      }
      else {
        req.movies[index] = { id, ...body };
        writeToFile(req.movies);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  }else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};
