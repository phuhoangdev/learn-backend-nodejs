const path = require("path"); //Commonjs
const express = require("express"); //Commonjs

const configViewEngine = (app) => {
   app.set("views", path.join("./src", "views"));
   app.set("view engine", "ejs");
   //Config Static Files
   app.use(express.static(path.join("_./src", "public")));
};

module.exports = configViewEngine;
