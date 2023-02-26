const {
   getTaskService,
   createTaskService,
   updateTaskService,
   deleteTaskService,
} = require("../services/taskService");

module.exports = {
   getTaskAPI: async (req, res) => {
      let result = await getTaskService(req.query);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   postCreateTaskAPI: async (req, res) => {
      let result = await createTaskService(req.body);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   putUpdateTaskAPI: async (req, res) => {
      let result = await updateTaskService(req.body);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   deleteTaskAPI: async (req, res) => {
      let id = req.body.id;
      let result = await deleteTaskService(id);

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },
};
