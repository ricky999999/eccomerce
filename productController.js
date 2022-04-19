const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//GET all product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  let products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
  });
});

//Get product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// Update Product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not Found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "product Delete successfully",
  });
};
