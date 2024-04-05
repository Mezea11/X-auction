import { Link } from 'react-router-dom';
//creates element to hold user owned product
export default function MyAuctionObjectCard({
    id,
    title,
    description,
    category,
    keywords,
    endDate,
    price,
    highest_bid,
    img_url,
    deleteProduct,
}) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); //gets value of sessionStorage
    console.log(isLoggedIn);

    return (
        <div
            className="card"
            style={{
                minHeight: '35rem',
                minWidth: '18rem',
                maxWidth: '18rem',
                borderRadius: '1rem',
                overflow: 'hidden',
            }}
        >
            <img
                src={img_url}
                style={{ width: '100%', height: '15rem', objectFit: 'cover' }}
                alt="Product Image"
            />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <p>
                        Asking price:{' '}
                        <strong style={{ color: 'green' }}>{price}:-</strong>
                    </p>
                </li>
                <li className="list-group-item">
                    Highest bid:{' '}
                    <strong style={{ color: 'green' }}>{highest_bid}:-</strong>
                </li>
                <li className="list-group-item">
                    Time left:{' '}
                    <strong style={{ color: 'red' }}>{endDate}</strong>
                </li>
            </ul>
            <div className="card-body" id="home-card-btn" >
                {/* link to productpage with the uniqe id of specific product */}
                <Link to={`/ProductPage/${id}`}>
                    <button type="button" className="btn btn-primary" >
                        View Product
                    </button>
                </Link>
                &nbsp;
                {/* shows button if value in sessionStorage is thrue */}
                {isLoggedIn && (
                    <button
                        onClick={() => deleteProduct(id)}
                        type="button"
                        className="btn btn-danger"
                    >
                        Delete Product
                    </button>
                )}
            </div>
        </div>
    );
}
