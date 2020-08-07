require("dotenv").config();
require("./../config/mongo");

const products = require("./../json/products-fake-db.json");
const ProductModel = require("./../models/Product");

(async function () {
  try {
    try {
      await ProductModel.collection.drop();
      const res = await ProductModel.create(products);
      console.log(res.length + " products created in database");
    } catch (e) {
      if (e.code === 26) {
        console.log(
          "namespace %s not found, creating collection ",
          ProductModel.collection.name
        );
        const res = await ProductModel.create(products);
        console.log(res.length + " products created in database");
        process.exit()
      } else {
        throw e;
      }
    }
  } catch (err) {
    console.log(err);
  }
})();