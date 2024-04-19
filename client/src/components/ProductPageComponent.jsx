import './ProductPageComponent.css';
import { useEffect, useState, useContext } from 'react';
import PlaceBidButton from './PlaceBidButton.jsx';
import { useParams } from 'react-router';
import { GlobalContext } from '../GlobalContext.jsx';

function ProductPageComponent() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { user } = useContext(GlobalContext);
    const [highestBid, setHighestBid] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Error fetching product details');
                }
                const data = await response.json();
                setProduct(data);
                const newBid = product.bids[product.bids.length - 1].bid;
                setHighestBid(newBid);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();

    }, [productId, product]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const endDate = new Date(product.end_dateTime);
    const endDateToMS = endDate.getTime();
    const currentDate = Date.now();
    const endDateTime = endDate.toLocaleString('en-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

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
                                {highestBid ? `${highestBid} kr` : 'No bids'}
                            </strong>
                        </p>
                        <p>
                            End date:{' '}
                            <strong style={{ color: 'red' }}>
                                {endDateTime}
                            </strong>
                        </p>
                        {user ? (
                            currentDate < endDateToMS ? (
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
                                        <span style={{display:"flex"}}>{bid.bid } kr</span> 
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
