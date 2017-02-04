// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Star Wars Characters (DATA)
// =============================================================
// var tables = [{
//   name: "Antonio",
//   phone: "Yoda",
//   email: "Jedi Master",
//   uniqueID: 900
// }, {
//   name: "Chris",
//   phone: "Yoda",
//   email: "Jedi Master",
//   uniqueID: 900
// }, {
//   name: "Cameron",
//   phone: "Yoda",
//   email: "Jedi Master",
//   uniqueID: 900
// }];

// var waitList = [{
//   name: "waitingbro",
//   phone: "Yoda",
//   email: "Jedi Master",
//   uniqueID: 900
// }, {
//   name: "waitbro2",
//   phone: "Yoda",
//   email: "Jedi Master",
//   uniqueID: 900
// }, {
//   name: "waitbro3",
//   phone: "Yoda",
//   email: "Jedi Master",
//   uniqueID: 900
// }];

var tables = [];
var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/waitlist", function (req, res) {
  console.log("found waitlist");
  res.json(waitList);
});

app.post("/api/clear", function (req, res) {
  console.log("clearing lists");

  tables = [];
  waitList = [];
  // res.json();
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:tables?", function (req, res) {
  console.log("Returning Tables");

  res.json(tables);

});

// Create New Characters - takes in JSON input
app.post("/reserve", function (req, res) {
  console.log("Post request received");
  var newReservation = req.body;
  // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  // console.log(newReservation);
  if (tables.length < 5) {
    console.log("Pushing new reservation to Tables array");
    tables.push(newReservation);
  } else {
    console.log("Pushing new reservation to waitlist array");
    waitList.push(newReservation);
  }
  // console.log(tables);
  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});