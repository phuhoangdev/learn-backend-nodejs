const express = require("express"); //Commonjs
require("dotenv").config(); //.ENV
const configViewEngine = require("./config/viewEngine"); //viewEngine
const webRoutes = require("./routes/web"); // Routes Web
const apiRoutes = require("./routes/api"); // Routes Web
const fileUpload = require("express-fileupload");
const connection = require("./config/database"); // Database
const User = require("./models/User");

const app = express(); //App Express
//Config General
const port = process.env.PORT || 8088;
const hostname = process.env.HOST_NAME;

//Config File Upload
app.use(fileUpload());

//Config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//Config Template Engine
configViewEngine(app);

//Config Route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

(async () => {
   try {
      await connection();
      app.listen(port, hostname, () => {
         console.log(`Server running at http://${hostname}:${port}/`);
      });
   } catch (error) {
      console.log(">>> Error connect to DB: ", error);
   }
})();
