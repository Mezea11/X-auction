import mongoose from "mongoose";

// Creates "products" schema: defines the structure of every "product" document in our database
const productsSchema = new mongoose.Schema({
  productname: String,
  description: String,
  extended_description: String,
  category: String,
  keywords: [String],
  end_dateTime: Date,
  starting_price: Number,
  img_url: String,
  seller: String,
  ongoing: Boolean,
  won: Boolean,
  bids: [
    {
      username: String,
      bid: Number,
    },
  ],
});

/* 
  Creates mongoose model based on productsSchema
  Allows us to create/read/update/delete (CRUD) documents in our "products" collection
*/
const Product = mongoose.model("products", productsSchema);

export default Product;
