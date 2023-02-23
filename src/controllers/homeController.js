const connection = require("../config/database"); // Database

const getHomepage = (req, res) => {
   //Process Data

   //Call Model
   connection.query("SELECT * FROM Users u", function (err, results, fields) {
      res.render("homepage.ejs");
   });
};

module.exports = {
   getHomepage,
};
