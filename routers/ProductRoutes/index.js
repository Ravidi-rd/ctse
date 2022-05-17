const routes = require("express").Router();
const ProductRoutes = require("../../controllers/product");
routes.get("/", (req, res) => {
  res.send("This is Product System - CSTE Assignment");
});
const upload = require("../../utils/multer");

routes.post("/add-new-product", ProductRoutes.addProduct);

routes.get("/get-all-product", ProductRoutes.getAllProducts);

routes.get("/get-product/:id", ProductRoutes.getProductsById);

routes.put(
  "/upload-image/:id",
  upload.single("image"),
  ProductRoutes.uploadImage
);

routes.put(
  "/update-product-details/:id",
  ProductRoutes.updateProductsDetails
);

routes.delete("/delete-em/:id", ProductRoutes.deleteProducts);

module.exports = routes;
