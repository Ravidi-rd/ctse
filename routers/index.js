const routes = require("express").Router();
const ProductMainRoute = require("./ProductRoutes");

routes.use("/product", ProductMainRoute);

module.exports = routes;
