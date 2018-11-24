

//requiring the express package via node
var express = require("express");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//this is the area wherein the html and api routing would go if directly on the server.js file, instead they get referenced because they reside in a different repository
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})