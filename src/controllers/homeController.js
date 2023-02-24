const getHomepage = (req, res) => {
   //Process Data
   //Call Model
   res.render("homepage.ejs");
};

module.exports = {
   getHomepage,
};
