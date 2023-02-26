const {
   getCustomerService,
   createCustomerService,
   createMultipleCustomerService,
   putUpdateCustomerServiceAPI,
   deleteCustomerServiceAPI,
   deleteMultipleCustomerServiceAPI,
} = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileService");
const Joi = require("joi");

module.exports = {
   getCustomerAPI: async (req, res) => {
      let limit = req.query.limit;
      let page = req.query.page;
      let name = req.query.name;
      let result = null;

      if (limit && page) {
         result = await getCustomerService(limit, page, name, req.query);
      } else {
         result = await getCustomerService();
      }

      return res.status(200).json({
         EC: 0,
         data: result,
      });
   },

   postCreateCustomerAPI: async (req, res) => {
      let { name, address, email, phone, description } = req.body;

      const schema = Joi.object({
         name: Joi.string().alphanum().min(3).max(30).required(),
         address: Joi.string(),
         phone: Joi.string().pattern(new RegExp("^[0-9]{9,12}$")),
         email: Joi.string().email(),
         description: Joi.string(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
         return res.status(200).json({
            EC: 1,
            data: error,
         });
      } else {
         let imageUrl = "";

         if (!req.files || Object.keys(req.files).length === 0) {
            imageUrl = "";
         } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
         }

         let customerData = {
            name,
            address,
            email,
            phone,
            description,
            image: imageUrl,
         };

         let customer = await createCustomerService(customerData);

         return res.status(200).json({
            EC: 0,
            data: customer,
         });
      }
   },

   postCreateMultipleCustomerAPI: async (req, res) => {
      let customers = await createMultipleCustomerService(req.body.customers);
      if (customers) {
         return res.status(200).json({
            EC: 0,
            data: customers,
         });
      } else {
         return res.status(200).json({
            EC: 1,
            data: customers,
         });
      }
   },

   putUpdateCustomerAPI: async (req, res) => {
      let { id, name, address, email, phone, description } = req.body;

      let customerData = {
         id,
         name,
         address,
         email,
         phone,
         description,
      };

      let customer = await putUpdateCustomerServiceAPI(customerData);

      return res.status(200).json({
         EC: 0,
         data: customer,
      });
   },

   deleteCustomerAPI: async (req, res) => {
      let id = req.body.id;
      let results = await deleteCustomerServiceAPI(id);

      return res.status(200).json({
         EC: 0,
         data: results,
      });
   },

   deleteMultipleCustomerAPI: async (req, res) => {
      let ids = req.body.customersId;
      let results = await deleteMultipleCustomerServiceAPI(ids);

      return res.status(200).json({
         EC: 0,
         data: results,
      });
   },
};
