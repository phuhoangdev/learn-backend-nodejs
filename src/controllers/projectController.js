const {
   getProjectService,
   createProjectService,
   updateProjectService,
   deleteProjectService,
} = require("../services/projectService");

module.exports = {
   getProjectAPI: async (req, res) => {
      let result = await getProjectService(req.query);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   postCreateProjectAPI: async (req, res) => {
      let result = await createProjectService(req.body);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   putUpdateProjectAPI: async (req, res) => {
      let result = await updateProjectService(req.body);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   deleteProjectAPI: async (req, res) => {
      let id = req.body.id;
      let result = await deleteProjectService(id);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },
};
