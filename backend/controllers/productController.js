import expressAsyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

export const getProducts = expressAsyncHandler(async (req, res) => {

  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? 
                {name:
                  {
                    $regex: req.query.keyword,
                    $options: 'i'
                  }} : {}

  const count = await Product.countDocuments({...keyword})

  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
  res.json({
    products,
    page,
    pages: Math.ceil(count/pageSize)
  });
})



export const getProductById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
})

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
export const createProduct = expressAsyncHandler(async(req, res)=>{
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: "sample brand",
    category:'sample category',
    countInStock: 0,
    numReviews: 0,
    description:'sample description'
  })
  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

export const deleteProduct = expressAsyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)

  if(product){
    await Product.findByIdAndDelete(req.params.id)
    res.json('Product deleted')
  }else{
    res.status(404).json('Product not found')
  }
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc  Review a product
// @route POST /api/products/:id/review
// @access Private
export const createdProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
  const alreadyReviewed = product.reviews.find(
    (review)=> review.user.toString() === req.user._id.toString())
    
    if(alreadyReviewed){
      res.status(400)
      throw new Error("Product already reviewed");
      // res.status(400).json({ message: "Product already reviewed" });


    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user:req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, review)=> acc+ review.rating,0)/product.reviews.length

    await product.save()
    res.status(201)
    res.json({message: 'Review added'})
    
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})  // get all
    .sort({ rating: -1 })                 // sort by rating descending
    .limit(3);                            // get top 3

  res.json(products);
});