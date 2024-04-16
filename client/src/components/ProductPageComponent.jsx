import './ProductPageComponent.css';
import { useEffect, useState } from 'react';
import PlaceBidButton from './PlaceBidButton.jsx';
import { useParams } from 'react-router';

function ProductPageComponent() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    //  const productId = "661d289c4e4ab36c7381ab27";

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('pp: step 1');
                const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Error fetching product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    // Find the highest bid
    const highestBid =
        product.bid && Array.isArray(product.bid) && product.bid.length > 0
            ? Math.max(...product.bid.map((b) => b.bid))
            : null;

    return (
        <>
            <div id="product-page-container">
                <>
                    <div className="card mb-3" id="product-page-card">
                        <img
                            src={product.img_url}
                            className="card-img-top"
                            alt="..."
                            id="product-image"
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                {product.productname}
                            </h5>
                            <h6>{product.description}</h6>
                            <p
                                className="card-text"
                                id="product-page-extended-description"
                            >
                                {product.extended_description}
                            </p>
                            <p className="card-text">
                                Starting price:{' '}
                                <strong style={{ color: 'green' }}>
                                    {product.starting_price} kr
                                </strong>
                            </p>
                            <p className="card-text">
                                Highest bid:{' '}
                                <strong style={{ color: 'darkgreen' }}>
                                    {highestBid
                                        ? `${highestBid} kr`
                                        : 'No bids'}
                                </strong>
                            </p>
                            <p>
                                End date:{' '}
                                <strong style={{ color: 'red' }}>
                                    {product.end_DateTime}
                                </strong>
                            </p>
                            <PlaceBidButton />
                        </div>
                    </div>
                </>
            </div>
            <div id="bid-history-container">
                <div
                    className="card"
                    style={{ width: '18rem' }}
                    id="bid-history-card"
                >
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Bid history:</li>
                        {Array.isArray(product.bid) &&
                        product.bid.length > 0 ? (
                            product.bid.map((bid, index) => (
                                <li key={index} className="list-group-item">
                                    <strong style={{ color: 'darkgreen' }}>
                                        {bid.bid} kr
                                    </strong>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">No bids</li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProductPageComponent;
