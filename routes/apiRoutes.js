// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the units
  app.get("/api/units", function(req, res) {
    var query = {};
    if (req.query.unit_id) {
      query.id = req.query.unit_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.unit.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbunit) {
      res.json(dbunit);
    });
  });
  // GET route for getting all of the users
  app.get("/api/users", function(req, res) {
    var query = {};
    if (req.body.user_id) {
      query.id = req.body.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    console.log(query)
    db.user.findAll({
      where: query,
      include: [db.unit]
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });
  //
};