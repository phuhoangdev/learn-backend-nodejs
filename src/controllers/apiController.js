const User = require("../models/User");

const getUsersAPI = async (req, res) => {
   let results = await User.find({}).exec();

   return res.status(200).json({
      EC: 0,
      data: results,
   });
};

const postCreateUserAPI = async (req, res) => {
   let { email, name, city } = req.body;

   let user = await User.create({
      email: email,
      name: name,
      city: city,
   });

   return res.status(200).json({
      EC: 0,
      data: user,
   });
};

const putUpdateUserAPI = async (req, res) => {
   let { userId, email, name, city } = req.body;

   let user = await User.updateOne(
      { _id: userId },
      { email: email, name: name, city: city },
   ).exec();

   return res.status(200).json({
      EC: 0,
      data: user,
   });
};

const deleteUserAPI = async (req, res) => {
   const id = req.body.userId;
   let results = await User.deleteOne({ _id: id }).exec();

   return res.status(200).json({
      EC: 0,
      data: results,
   });
};

module.exports = {
   getUsersAPI,
   postCreateUserAPI,
   putUpdateUserAPI,
   deleteUserAPI,
};
