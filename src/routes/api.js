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

const {
   getProjectAPI,
   postCreateProjectAPI,
   putUpdateProjectAPI,
   deleteProjectAPI,
} = require("../controllers/projectController");

const {
   getTaskAPI,
   postCreateTaskAPI,
   putUpdateTaskAPI,
   deleteTaskAPI,
} = require("../controllers/taskController");

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

routerAPI.get("/projects", getProjectAPI);
routerAPI.post("/projects", postCreateProjectAPI);
routerAPI.put("/projects", putUpdateProjectAPI);
routerAPI.delete("/projects", deleteProjectAPI);

routerAPI.get("/tasks", getTaskAPI);
routerAPI.post("/tasks", postCreateTaskAPI);
routerAPI.put("/tasks", putUpdateTaskAPI);
routerAPI.delete("/tasks", deleteTaskAPI);

module.exports = routerAPI;
