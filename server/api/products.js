import Product from '../model/Product.js';

export default function (server) {
    // --- GET----
    // endpoint get all products
    server.get('/api/products', async (req, res) => {
        try {
            const currentTime = new Date();
            const products = await Product.find();
            if (products.length === 0) {
                // If there are no products in the database
                res.status(404).json({ message: 'No products found' });
            } else {
                // Check each product for ongoing status and auction expiration
                for (let product of products) {
                    if (
                        product.ongoing &&
                        currentTime > new Date(product.end_dateTime)
                    ) {
                        // If the auction has ended, update ongoing status to false
                        product.ongoing = false;
                        await product.save();
                    } else if (!product.ongoing && product.bids.length > 0) {
                        // If the product is not ongoing and has bids, set won to true
                        product.won = true;
                        await product.save();
                    }
                }
                res.status(200).json(products);
            }
        } catch (error) {
            console.error('Error retrieving products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    server.get('/api/products/:id', async (req, res) => {
        const productId = req.params.id; // Get the product ID from the request parameters
        try {
            const product = await Product.findById(productId); // Find the product by its ID
            if (!product) {
                // If no product found with the provided ID, return a 404 response
                return res.status(404).json({ message: 'Product not found' });
            }
            // If product found, send it as JSON response
            res.status(200).json(product);
        } catch (error) {
            // If an error occurs during the database query, return a 500 response
            console.error('Error retrieving product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    server.get('/api/productsbybids', async (req, res) => {
        try {
            // Check if there's a username query parameter
            const { username } = req.query;

            // If username is provided, construct the query to filter products
            const query = username ? { 'bids.username': username } : {};

            // Find products based on the query
            const products = await Product.find(query);

            if (products.length === 0) {
                // If no products are found matching the query
                res.status(404).json({ message: 'No products found' });
            } else {
                // If products are found, send them as JSON response
                res.status(200).json(products);
            }
        } catch (error) {
            // If an error occurs during the process
            console.error('Error retrieving products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    server.get('/api/productsbyseller', async (req, res) => {
        try {
            // Check if there's a seller query parameter
            const { seller } = req.query;
            const query = seller ? { seller } : {}; // If seller is provided, filter by seller

            const products = await Product.find(query);
            if (products.length === 0) {
                // If there are no products in the database
                res.status(404).json({ message: 'No products found' });
            } else {
                // If products are found, send them as JSON response
                res.status(200).json(products);
            }
        } catch (error) {
            console.error('Error retrieving products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // --- POST ---
    // endpoint post product
    server.post('/api/products', async (req, res) => {
        try {
            // Create a new product document based on the incoming data
            const newProduct = new Product({
                productname: req.body.productname,
                description: req.body.description,
                extended_description: req.body.extended_description,
                category: req.body.category,
                keywords: req.body.keywords,
                end_dateTime: req.body.end_dateTime,
                starting_price: req.body.starting_price,
                img_url: req.body.img_url,
                seller: req.body.seller,
                ongoing: req.body.ongoing,
                won: req.body.won,
                bids: req.body.bids,
            });

            // Save the new product document to the database
            const savedProduct = await newProduct.save();

            res.status(201).json(savedProduct); // Return the saved product in the response
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // --- PATCH ---

    // Endpoint for patch product by id in product page
    server.patch('/api/products/:id', async (req, res) => {
        const productId = req.params.id;
        const updatedData = req.body;

        try {
            const existingProduct = await Product.findById(productId); // Find the product by its ID
            if (!existingProduct) {
                // return a 404 response if no product
                return res.status(404).json({ message: 'Product not found' });
            }

            Object.assign(existingProduct, updatedData);

            // Save the updated product to the database
            const updatedProduct = await existingProduct.save();

            res.status(200).json(updatedProduct); // Return the updated product in the response
        } catch (error) {
            // Return 500 if update not possible
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // patch a product from my page when logged in
    server.patch('/api/patchproducts/:id', async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);

            if (
                req.body.end_dateTime !== undefined &&
                new Date(req.body.end_dateTime) > product.end_dateTime
            ) {
                // Check if the product is not ongoing
                if (!product.ongoing) {
                    // Set ongoing to true
                    req.body.ongoing = true;
                }
            }

            // If product IS won, dont let user patch product
            if (product.won) {
                return res.status(400).json({
                    message:
                        'Cannot patch this product, the auction has been won.',
                });
            }

            // If the product has bids, DON'T let the user update the time on the product
            if (product.bids.length > 0) {
              // Check if the request body contains the end_Datetime field
              if (req.body.end_dateTime !== undefined) {
                return res.status(400).json({
                  message:
                    "Cannot update End Date Time because there are existing bids.",
                });
              } else if (req.body.starting_price !== undefined) {
                return res.status(400).json({
                  message:
                    "Cannot update starting price because there are existing bids.",
                });
              }

              // Check if the request body contains the starting_price parameter and if there are existing bids
            }

            // If no bids or starting_price not in request body, user may update the product
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                req.body,
                {
                    new: true,
                }
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Return 200 response if the successful
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // --- DELETE ---
    // endpoint for delete
    server.delete('/api/products/:id', async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);

            if (product.bids.length > 0) {
                return res.status(400).json({
                    message:
                        'Cannot delete the product because there are existing bids.',
                });
            }

            const deletedProduct = await Product.findByIdAndDelete(product);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
