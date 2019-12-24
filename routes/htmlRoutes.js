const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render('signup', null);
  });

  //render a profile page for the user
  app.get("/profile/:email", (req,res)=>{
    
    function authenticateUser (email) {
      return db.user.findOne({ where: { email: email } })
        .then(user => {
          if (user) {
            return user.get({plain:true});
          }
          return false;
      });
    }
    
    // authenticate that they exist in the database before allowing the page to render
    authenticateUser(req.params.email).then(user => {
        if (user) {
          res.render('profile', {email: user.email, id: user.id })
        }
    });
  })
};

