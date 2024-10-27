module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  const router = require("express").Router();
  const path = "/products"

  router.post(path, products.create);
  router.get(path, products.findAll);
  router.get(path + '/:id', products.findOne);
  router.put(path + '/:id', products.update);
  router.delete(path + '/:id', products.delete);

  app.use('/api', router);
}