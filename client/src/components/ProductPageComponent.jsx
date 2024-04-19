import './ProductPageComponent.css';
import React, { useEffect, useState, useContext } from 'react';
import PlaceBidButton from './PlaceBidButton.jsx';
import { useParams } from 'react-router';
import { GlobalContext } from '../GlobalContext.jsx';

function ProductPageComponent() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { user } = useContext(GlobalContext);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [auctionEndTime, setAuctionEndTime] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Error fetching product details');
                }
                const data = await response.json();
                setProduct(data);
                // Set auction end time
                setAuctionEndTime(new Date(data.end_dateTime).getTime());
                setCurrentTime(Date.now())
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        // Fetch product data initially
        fetchProduct();

        // Fetch product data every 5 seconds
        const interval = setInterval(fetchProduct, 1000);
        console.log(interval);
        console.log(auctionEndTime)
        console.log(currentTime);
        // Cleanup interval on component unmount
        return () => clearInterval(interval);

    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const endDateTime = new Date(product.end_dateTime).toLocaleString('en-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    // Check if auction has ended
    const auctionEnded = auctionEndTime && currentTime > auctionEndTime;

    return (
        <>
            <div id="product-page-container">
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
                                {product.bids[product.bids.length - 1].bid} kr
                            </strong>
                        </p>
                        <p>
                            End date:{' '}
                            <strong style={{ color: 'red' }}>
                                {endDateTime}
                            </strong>
                        </p>
                        {user ? (
                            !auctionEnded ? (
                                product.seller !== user.username ? (
                                    <PlaceBidButton />
                                ) : (
                                    <p><strong style={{ color: "red" }}>You are the seller of this product.</strong></p>
                                )
                            ) : (
                                <p><strong style={{ color: "red" }}>Bidding has ended.</strong></p>
                            )
                        ) : (
                            <p><strong style={{ color: "red" }}>You must sign in to place a bid.</strong></p>
                        )}
                    </div>
                </div>
            </div>

            <div id="bid-history-container">
                <div
                    className="card"
                    style={{ width: '18rem' }}
                    id="bid-history-card"
                >
                    <div style={{backgroundColor: "white"}}>Bid history:</div>
                    <ul className="list-group list-group-flush" style={{display: "flex", flexDirection: "column-reverse"}}>
                        {Array.isArray(product.bids) && product.bids.length > 0 ? (
                            product.bids.map((bid, index) => (
                                <li key={index} className="list-group-item">
                                    <strong style={{ color: 'darkgreen' }}>
                                        <span style={{display:"flex"}}>{bid.bid} kr</span> 
                                        <span style={{marginLeft: "65%", textAlign:"right", paddingLeft:"1rem", paddingRight:"1rem"}}>{bid.username}</span>
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
