const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers to overcome CORS restrictions 
app.use(function(req, res, next) {
  // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
    next();
});


//customer.routes
require("./app/routes/customer.routes.js")(app);
//tutorial.routes
require("./app/routes/tutorial.routes.js")(app);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to myapp." });
});

//const PORT = 8080;
const PORT = process.env.NODE_WEBSERVICE_PORT_BEZCODER_CRUD1 || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
