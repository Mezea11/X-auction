import './ProductPageComponent.css';
import { useEffect, useState, useContext } from 'react';
import PlaceBidButton from './PlaceBidButton.jsx';
import { useParams } from 'react-router';
import { GlobalContext } from '../GlobalContext.jsx';

function ProductPageComponent() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { user } = useContext(GlobalContext);
    const [ highestBid, setHighestBid ] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Error fetching product details');
                }
                const data = await response.json();
                setProduct(data);
                setHighestBid(data.bids[data.bids.length -1].bid)
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        
        fetchProduct();

    }, [productId, highestBid]);

    if (!product) {
        return <div>Loading...</div>;
    }

    /*
    const highestBid = product.bid && Array.isArray(product.bid) && product.bid.length > 0
        ? Math.max(...product.bid.map((b) => b.bid))
        : null;
*/
    const endDate = new Date(product.end_dateTime); //variable for rendering date on page
    const endDateToMS = endDate.getTime();//variable for product end date to use when comparing to current time
    console.log(endDateToMS);

    const currentDate = Date.now();//current time to use for comparing to product end date
    console.log(currentDate);

    const endDateTime = endDate.toLocaleString('en-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

/*
    if (!user && currentDate < endDate) {
        return <p><strong style={{ color: "red" }}>You must sign in to place a bid.</strong></p>;
    }

    if (product.seller === user.username) {
        return <p><strong style={{ color: "red" }}>You are the seller of this product.</strong></p>;
    }

    if (currentDate >= endDate) {
        return <p><strong style={{ color: "red" }}>This auction has ended.</strong></p>;
    }*/



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
                                {highestBid}
                                {/* {product.bids[product.bids.length -1].bid} */}
                                {/* {highestBid ? `${highestBid} kr` : 'No bids'} */}
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
                        {/* {user && product.seller !== user.username && currentDate < endDate && <PlaceBidButton />} */}
                    </div>
                </div>
            </div>
            <div id="bid-history-container">
                <div
                    className="card"
                    style={{ width: '18rem' }}
                    id="bid-history-card"
                >
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Bid history:</li>
                        {Array.isArray(product.bid) && product.bid.length > 0 ? (
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
