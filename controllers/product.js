const Product = require("../model/product.model");
const cloudinary = require("../utils/cloudinary");

const ProductControllers = {
  addProduct: async (req, res) => {
    try {
      const {
        product_id,
        product_name,
        product_image,
        product_in_date,
        product_out_date,
        product_price,
        product_quantity,
        
      } = req.body;

      if (
        !product_id ||
        !product_name ||
        !product_image ||
        !product_in_date ||
        !product_out_date ||
        !product_price ||
        !product_quantity 
      )
       {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

     

      const productId = await Product.findOne({ product_id });
      if (productId) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${productId.product_id} id already registered.`,
        });
      }
      const ProductName = await Product.findOne({ product_name });
     
      if (ProductName ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${ProductName.product_name}  is already registered Product.`,
        });
      }


      const newProduct = new Product({
        product_id,
        product_name,
        product_in_date,
        product_out_date,
        product_price,
        product_quantity,
      });

      await newProduct.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ProductDetails: newProduct,
        message: "Product added successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const allProducts = await Product.find();

      if (!allProducts) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          ProductsList: allProducts,
          message: "Products list not found.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          ProductsList: allProducts,
          message: "All Products list recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getProductsById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const ProductsDetails = await Product.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          Products: ProductsDetails,
          message: `${ProductsDetails.product_name}   details recieved.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  uploadImage: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "ProductsList",
      });
      if (req.params && req.params.id) {
        await Products.findByIdAndUpdate(req.params.id, {
          product_image: result.secure_url,
        });

        const uploadImage = await Product.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateProduct: uploadImage,
          message: "Image upload successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  updateProductsDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
        product_id,
        product_name,
        product_in_date,
        product_out_date,
        product_price,
        product_quantity,
        } = req.body;

       
        
        const updateProducts = await Products.findById(req.params.id);

        await Products.findByIdAndUpdate(req.params.id, {
          product_id,
          product_name,
          product_in_date,
          product_out_date,
          product_price,
          product_quantity,
        });

       
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  deleteProducts: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const products = await Products.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          ProductsDetails: products,
          message:
          product.product_name +
           
            " is deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
};



module.exports = ProductControllers;
