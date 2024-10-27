module.exports = (app) => {
  const express = require("express");
  const path = require("path");
  const image = require("../controllers/image.controller.js");

  app.use('/images', express.static(path.join(__dirname, '../images')));
  app.post('/images/upload', image.upload);
}