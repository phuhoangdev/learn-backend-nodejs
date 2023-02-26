const express = require("express");
const routerAPI = express.Router();
const {
   getUsersAPI,
   postCreateUserAPI,
   putUpdateUserAPI,
   deleteUserAPI,
   postUploadSingleFileAPI,
   postUploadMultipleFilesAPI,
} = require("../controllers/apiController");

const {
   getCustomerAPI,
   postCreateCustomerAPI,
   postCreateMultipleCustomerAPI,
   putUpdateCustomerAPI,
   deleteCustomerAPI,
   deleteMultipleCustomerAPI,
} = require("../controllers/customerController");

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultipleFilesAPI);

routerAPI.get("/customers", getCustomerAPI);
routerAPI.post("/customers", postCreateCustomerAPI);
routerAPI.post("/customers-many", postCreateMultipleCustomerAPI);
routerAPI.put("/customers", putUpdateCustomerAPI);
routerAPI.delete("/customers", deleteCustomerAPI);
routerAPI.delete("/customers-many", deleteMultipleCustomerAPI);

module.exports = routerAPI;
