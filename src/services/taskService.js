const Task = require("../models/Task");
const aqp = require("api-query-params");

// {
//     "type": "EMPTY-TASK",
//     "name": "task 1",
//     "startDate": "26/02/2023",
//     "endDate": "30/03/2023",
//     "description": "description project 1",
//     "status": "complete",
//     "usersInfo": {
//         "name": "Phu",
//         "phone": "099988866",
//         "email": "phu@gmail.com"
//     },
//     "projectInfo": {
//         "name": "Phu Hoang",
//         "startDate": "30/02/2023",
//         "endDate": "30/03/2023",
//         "description": "project 1"
//     }
// }

module.exports = {
   getTaskService: async (queryString) => {
      const page = queryString.page;
      const { filter, limit, population } = aqp(queryString);
      delete filter.page;

      let offset = (page - 1) * limit;
      result = await Task.find(filter)
         .populate(population)
         .skip(offset)
         .limit(limit)
         .exec();

      return result;
   },

   createTaskService: async (data) => {
      if (data.type === "EMPTY-TASK") {
         let result = await Task.create(data);
         return result;
      }
   },

   updateTaskService: async (data) => {
      try {
         let result = await Task.updateOne(
            { _id: data.id },
            {
               ...data,
            },
         );
         return result;
      } catch (error) {
         return null;
      }
   },

   deleteTaskService: async (id) => {
      try {
         let result = await Task.deleteById(id);
         return result;
      } catch (error) {
         return null;
      }
   },
};
