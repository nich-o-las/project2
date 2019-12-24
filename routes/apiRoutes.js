// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.post("/api/users", function(req,res){
    var newUser = {
      email : req.body.email,
      password : req.body.password
    }
    // only create a new user if there is not already a user with this email address
    function isEmailUnique (email) {
      return db.user.count({ where: { email: email } })
        .then(count => {
          if (count != 0) {
            return false;
          }
          return true;
      });
    }
    
    isEmailUnique(newUser.email).then(isUnique => {
        if (isUnique) {
          db.user.create(newUser).then(() => {
            res.sendStatus(200);
          });
        }
    });
  });
  // POST route for creating a new unit
  app.post("/api/unit", function(req, res){
    db.unit.create(req.body).then(() => {
      res.sendStatus(200);
    })
  })
  // POST route for getting all of the units
  app.get("/api/units/:user_id", function(req, res) {
    var query = {};
    if (req.params.user_id) {
      query.userId = req.params.user_id;
    }
    db.unit.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbunit) {
      res.json(dbunit);
    });
  });
  app.post("/api/unit/city", function(req, res) {
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
  // post route for postting all of the users
  app.post("/api/users", function(req, res) {
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
  app.put("/api/unit/status", function(req, res) {
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