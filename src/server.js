const express = require("express"); //Commonjs
require("dotenv").config(); //.ENV
const configViewEngine = require("./config/viewEngine"); //viewEngine
const webRoutes = require("./routes/web"); // Routes Web
const app = express(); //App Express

//Config General
const port = process.env.PORT || 8088;
const hostname = process.env.HOST_NAME;

//Config Template Engine
configViewEngine(app);

//Config Route
app.use("/", webRoutes);

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});
