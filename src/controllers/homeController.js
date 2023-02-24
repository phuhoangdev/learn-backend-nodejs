const connection = require("../config/database"); // Database
const {} = require("../services/CRUDService");

const User = require("../models/User");

const getHomePage = async (req, res) => {
   let results = await User.find({}).exec();

   return res.render("home.ejs", { listUsers: results });
};

const getCreatePage = (req, res) => {
   res.render("create.ejs");
};

const postCreateUser = async (req, res) => {
   let { email, name, city } = req.body;

   await User.create({
      email: email,
      name: name,
      city: city,
   });

   res.redirect("/");
};

const getUpdatePage = async (req, res) => {
   const userId = req.params.id;
   let user = await User.findById(userId).exec();
   res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
   let { userId, email, name, city } = req.body;

   await User.updateOne(
      { _id: userId },
      { email: email, name: name, city: city },
   ).exec();

   res.redirect("/");
};

const postDeleteUser = async (req, res) => {
   const userId = req.params.id;
   let user = await User.findById(userId).exec();

   res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
   const id = req.body.userId;
   await User.deleteOne({ _id: id }).exec();
   res.redirect("/");
};

module.exports = {
   getHomePage,
   getCreatePage,
   postCreateUser,
   getUpdatePage,
   postUpdateUser,
   postDeleteUser,
   postHandleRemoveUser,
};
