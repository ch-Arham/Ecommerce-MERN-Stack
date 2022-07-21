const Product = require('../models/ProductModel');
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

// Controller 1: Create a new product /api/v1/products/new -- Admin only -- POST
exports.createProduct = catchAsyncError(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: { product }, message: 'Product Created Successfully'});
});

// Controller 2: Get all products /api/v1/products  -- GET
exports.getAllProducts = catchAsyncError(async (req, res) => {
    
    const apiFeature = new ApiFeatures(Product.find(), req.query).search();
    
    const product = await apiFeature.query; // instead of Product.find() again, we use the query we created in ApiFeatures

    if(!product) {
        return next("No Products Found", 404);
    }

    res.status(200).json({ success: true, data: { product }, message: 'All Products Fetched Successfully'});
});

// Controller 3: Update a product /api/v1/products/:id -- Admin only -- PUT
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    //Find the product to update and update it
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Check if user is Authorized to update
    // if (req.user.id !== product.user.toString()) {
    //     return next(new ErrorResponse(`User not authorized to update this product`, 401));
    // }

    // Update Product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({ success: true, data: { product }, message: 'Product Updated Successfully'});
});

// Controller 4: Delete a product /api/v1/products/:id -- Admin only -- DELETE
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    // if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    // const product = await Product.findByIdAndDelete(req.params.id);
    // if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    // Check if user is Authorized to delete
    if(!product){
        return next(new ErrorHandler(`Product not found with id of ${req.params.id}`, 404));
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: { product }, message: 'Product Deleted Successfully'});
});

// Controller 5: Get a single product /api/v1/products/:id -- GET
exports.getSingleProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHandler("Product not found", 404));
    } 
    
    res.status(200).json({ success: true, data: { product }, message: 'Product Details Fetched Successfully'});
});