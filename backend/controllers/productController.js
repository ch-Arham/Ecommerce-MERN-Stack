const Product = require('../models/ProductModel');

// Controller 1: Create a new product /api/v1/products/new -- Admin only -- POST
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: { product }, message: 'Product Created Successfully'});
}

// Controller 2: Get all products /api/v1/products  -- GET
exports.getAllProducts = async (req, res) => {
    const product = await Product.find();
    res.status(200).json({ success: true, data: { product }, message: 'All Products Fetched Successfully'});
}

// Controller 3: Update a product /api/v1/products/:id -- Admin only -- PUT
exports.updateProduct = async (req, res, next) => {

    //Find the product to update and update it
    let product = await Product.findById(req.params.id);
    // if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    if(!product) return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}`});

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
}

// Controller 4: Delete a product /api/v1/products/:id -- Admin only -- DELETE
exports.deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    // if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    // const product = await Product.findByIdAndDelete(req.params.id);
    // if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    // Check if user is Authorized to delete
    if(!product) return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}`});

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: { product }, message: 'Product Deleted Successfully'});
}

// Controller 5: Get a single product /api/v1/products/:id -- GET
exports.getSingleProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}`});
    res.status(200).json({ success: true, data: { product }, message: 'Product Details Fetched Successfully'});
}