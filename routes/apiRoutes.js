// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the units
  app.get("/api/units", function(req, res) {
    var query = {};
    if (req.body.unit_id) {
      query.id = req.body.unit_id;
    }
    db.unit.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbunit) {
      res.json(dbunit);
    });
  });
  app.get("/api/bycity", function(req, res) {
    var query = {
      city : req.body.city,
      state : req.body.state
    }
    db.unit.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbunit) {
      res.json(dbunit);
    });
  });
  // GET route for getting all of the users
  app.get("/api/users", function(req, res) {
    var query = { 
      id: req.body.id
    };
    console.log(query)
    db.user.findAll({
      where: query,
      include: [db.unit]
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });
  // PUT route for updating units
  app.put("/api/status", function(req, res) {
    var query = { 
      user_id: req.body.id
    };
    console.log(query)
    db.unit.update({
      status: req.body.status,
      where: query,
      include: [db.user]
    }).then(function(result) {
      res.send(result);
    });
  });                                                                                                           
};