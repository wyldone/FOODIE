var express = require("express");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();
var bodyParser = require("body-parser");



 app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
 app.use(bodyParser.json());

// // Static directory
 app.use(express.static("public"));

// // Routes
// // =============================================================
 require("./controllers/api-routes.js")(app);


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
