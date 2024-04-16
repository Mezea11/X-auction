import Product from '../model/Product.js';

export default function (server, db) {
    // endpoint get all products by seller
    server.get('/api/products', async (req, res) => {
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
        const productId = req.params.id;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
                new: true,
            });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}