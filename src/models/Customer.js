const mongoose = require("mongoose"); //MYSQL

const customerSchema = new mongoose.Schema(
   {
      name: { type: String, require: true },
      address: String,
      email: String,
      phone: String,
      image: String,
      description: String,
   },
   { timestamps: true },
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
