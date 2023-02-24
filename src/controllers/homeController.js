const connection = require("../config/database"); // Database
const {
   getAllUsers,
   getUsersById,
   updateUserById,
   deleteUserById,
} = require("../services/CRUDService");

const getHomePage = async (req, res) => {
   let results = await getAllUsers();

   return res.render("home.ejs", { listUsers: results });
};

const getCreatePage = (req, res) => {
   res.render("create.ejs");
};

const postCreateUser = async (req, res) => {
   let { email, name, city } = req.body;

   let [results, fields] = await connection.query(
      `INSERT INTO Users (email, name, city) 
         VALUES (?, ?, ?)`,
      [email, name, city],
   );

   res.redirect("/");
};

const getUpdatePage = async (req, res) => {
   const userId = req.params.id;
   let user = await getUsersById(userId);
   res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
   let { userId, email, name, city } = req.body;

   await updateUserById(email, name, city, userId);
   res.redirect("/");
};

const postDeleteUser = async (req, res) => {
   const userId = req.params.id;
   let user = await getUsersById(userId);

   res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
   const id = req.body.userId;
   await deleteUserById(id);
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
