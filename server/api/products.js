import Product from '../model/Product.js';

export default function (server, db) {
    // endpoint get all products
    server.get('/api/products', async (req, res) => {
        try {
            const products = await Product.find();
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
                bids: req.body.bids,
            });

            // Save the new product document to the database
            const savedProduct = await newProduct.save();

            res.status(201).json(savedProduct); // Return the saved product in the response
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


server.patch('/api/products/:id', async (req, res) => {
    const productId = req.params.id; // Get the product ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    try {
        const existingProduct = await Product.findById(productId); // Find the product by its ID
        if (!existingProduct) {
            // If no product found with the provided ID, return a 404 response
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the existing product with the new data
        // You may want to validate the updated data before applying it to the product
        Object.assign(existingProduct, updatedData);

        // Save the updated product to the database
        const updatedProduct = await existingProduct.save();

        res.status(200).json(updatedProduct); // Return the updated product in the response
    } catch (error) {
        // If an error occurs during the database query or update, return a 500 response
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
}