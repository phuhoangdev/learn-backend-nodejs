const Project = require("../models/Project");
const aqp = require("api-query-params");

// {
//     "type": "EMPTY-PROJECT",
//     "name": "project 1",
//     "startDate": "26/02/2023",
//     "endDate": "30/03/2023",
//     "description": "description project 1",
//     "customerInfo": {
//         "name": "Phu",
//         "phone": "056656589",
//         "email": "abc@gmail.com"
//     },
//     "leader": {
//         "name": "Phu Hoang",
//         "email": "test@gmail.com"
//     }
// }

// {
//     "type": "ADD-USERS",
//     "projectId": "63faf185a7594ce0770f3630",
//     "usersArr": ["63f85960fb8cafdaeffa5acf", "63f85960fb8cafdaeffa5123"]
// }

const getProjectService = async (queryString) => {
   const page = queryString.page;
   const { filter, limit, population } = aqp(queryString);
   delete filter.page;

   let offset = (page - 1) * limit;
   result = await Project.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();

   return result;
};

const createProjectService = async (data) => {
   if (data.type === "EMPTY-PROJECT") {
      let result = await Project.create(data);
      return result;
   }

   if (data.type === "ADD-USERS") {
      let project = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.usersArr.length; i++) {
         project.usersInfo.push(data.usersArr[i]);
      }
      let result = await project.save();

      return result;
   }

   if (data.type === "REMOVE-USERS") {
      let project = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.usersArr.length; i++) {
         project.usersInfo.pull(data.usersArr[i]);
      }
      let result = await project.save();

      return result;
   }

   if (data.type === "ADD-TASKS") {
      let project = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.taskArr.length; i++) {
         project.tasks.push(data.taskArr[i]);
      }
      let result = await project.save();

      return result;
   }
};

const updateProjectService = async (data) => {
   try {
      let result = await Project.updateOne(
         { _id: data.id },
         {
            ...data,
         },
      );
      return result;
   } catch (error) {
      return null;
   }
};

const deleteProjectService = async (id) => {
   try {
      let result = await Project.deleteById(id);
      return result;
   } catch (error) {
      return null;
   }
};

module.exports = {
   getProjectService,
   createProjectService,
   updateProjectService,
   deleteProjectService,
};
