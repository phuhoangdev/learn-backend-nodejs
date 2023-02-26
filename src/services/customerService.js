const Customer = require("../models/Customer");
const aqp = require("api-query-params");

const getCustomerService = async (limit, page, name, queryString) => {
   try {
      let result = null;
      if (limit && page) {
         let offset = (page - 1) * limit;

         const { filter } = aqp(queryString);
         delete filter.page;

         result = await Customer.find(filter).skip(offset).limit(limit).exec();
      } else {
         result = await Customer.find({});
      }
      return result;
   } catch (error) {
      return null;
   }
};

const createCustomerService = async (customerData) => {
   try {
      let result = await Customer.create({
         name: customerData.name,
         address: customerData.address,
         email: customerData.email,
         phone: customerData.phone,
         description: customerData.description,
         image: customerData.image,
      });
      return result;
   } catch (error) {
      return null;
   }
};

const createMultipleCustomerService = async (customers) => {
   try {
      let result = await Customer.insertMany(customers);
      return result;
   } catch (error) {
      return null;
   }
};

const putUpdateCustomerServiceAPI = async (customerData) => {
   try {
      let result = await Customer.updateOne(
         { _id: customerData.id },
         {
            name: customerData.name,
            address: customerData.address,
            email: customerData.email,
            phone: customerData.phone,
            description: customerData.description,
         },
      );
      return result;
   } catch (error) {
      return null;
   }
};

const deleteCustomerServiceAPI = async (id) => {
   try {
      let result = await Customer.deleteById({ _id: id });
      return result;
   } catch (error) {
      return null;
   }
};

const deleteMultipleCustomerServiceAPI = async (ids) => {
   try {
      let result = await Customer.delete({ _id: { $in: ids } });
      return result;
   } catch (error) {
      return null;
   }
};

module.exports = {
   getCustomerService,
   createCustomerService,
   createMultipleCustomerService,
   putUpdateCustomerServiceAPI,
   deleteCustomerServiceAPI,
   deleteMultipleCustomerServiceAPI,
};
