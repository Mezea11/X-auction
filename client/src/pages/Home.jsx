import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [recentlySoldProducts, setRecentlySoldProducts] = useState([]);
    const [mostAffordableProducts, setMostAffordableProducts] = useState([]);
    const [mostPopularProducts, setMostPopularProducts] = useState([]);

    // function to render products that have been sold
    const fetchRecentlySoldProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();

            // create a copy of product array, but with only products someone has won
            const recentlySoldProducts = data.filter((product) => product.won);
            //sort from most recently won
            recentlySoldProducts.sort(
                (a, b) => new Date(a.end_dateTime) - new Date(b.end_dateTime)
            );
            //limit result to 4
            const topFourProducts = recentlySoldProducts.slice(0, 4);
            setRecentlySoldProducts(topFourProducts);
        } catch (error) {
            console.error('Error fetching recently sold products:', error);
        }
    };

    // function to render products with lowest starting price
    const filterByLowestPriceProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();

            //only products that are currently for sale
            const mostAffordableProducts = data.filter(
                (product) => product.ongoing
            );
            //sort from lowest to highest starting_price
            mostAffordableProducts.sort(
                (a, b) => a.starting_price - b.starting_price
            );
            //limit result to 4
            const topFourProducts = mostAffordableProducts.slice(0, 4);
            setMostAffordableProducts(topFourProducts);
        } catch (error) {
            console.error('Error fetching most affordable products:', error);
        }
    };

    // function  to render products with most bids
    const filterByMostPopularProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();

            //only products that are currently for sale
            const mostPopularProducts = data.filter(
                (product) => product.ongoing
            );
            //sort by highest number of bids
            mostPopularProducts.sort((a, b) => b.bids.length - a.bids.length);
            //limit result to 4
            const topFourProducts = mostPopularProducts.slice(0, 4);
            setMostPopularProducts(topFourProducts);
        } catch (error) {
            console.error('Error fetching most popular products:', error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
        fetchRecentlySoldProducts(); // Call fetchRecentlySoldProducts here
        filterByLowestPriceProducts(); // Call filteredByLowestPriceProducts here
        filterByMostPopularProducts(); // Call filteredByMostPopularProducts here

        const interval = setInterval(fetchAllProducts, 5000);
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();
            //only products that are currently for sale
            const ongoingProducts = data.filter((product) => product.ongoing);
            //sort by end_dateTime
            ongoingProducts.sort(
                (a, b) => new Date(a.end_dateTime) - new Date(b.end_dateTime)
            );
            //limit result to 20
            const shortestTimeLeftProducts = ongoingProducts.slice(0, 20);
            setProducts(shortestTimeLeftProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    if (!products.length) {
        return null;
    }

    // function for error handling while fetching individual product
    const handleViewProductError = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                throw new Error('Error fetching product');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    return (
        <>
            <div id="home-card-container" style={{ fontFamily: 'Roboto' }}>
                <div className="searchbar-container">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate('/searchPage')}
                    >
                        Search for products
                    </button>
                </div>
                <section id="homepage-slogan-container">
                    <div className="jumbotron text-center" id="homepage-jumbo">
                        <h1>X-Auction</h1>
                        <p>Your trusted auction for all things extreme.</p>
                    </div>
                </section>
                <h2 style={{ marginTop: '1rem' }}>Featured Products</h2>

                <section
                    id="homepage-products-container"
                    style={{ borderRadius: '8px' }}
                >
                    {/* goes through products array and renders each object (product) on page */}
                    {products.map((product) => (
                        // key links the element to the specific object
                        <div className="card" key={product._id} id="home-cards">
                            <img
                                src={product.img_url}
                                style={{
                                    height: '15rem',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div
                                className="card-body"
                                id="card-body"
                                style={{ textAlign: 'center' }}
                            >
                                <h5 className="card-title">
                                    {product.productname}
                                </h5>
                                <p
                                    className="card-text"
                                    id="card-description"
                                    style={{ textAlign: 'center' }}
                                >
                                    {product.description}
                                </p>
                            </div>
                            <ul
                                className="list-group list-group-flush"
                                id="card-prices"
                            >
                                <li className="list-group-item">
                                    Starting price:{' '}
                                    <strong style={{ color: 'green' }}>
                                        {product.starting_price} kr
                                    </strong>
                                </li>
                                <li className="list-group-item">
                                    Highest bid:{' '}
                                    <strong style={{ color: 'darkgreen' }}>
                                        {product.bids.length > 0
                                            ? product.bids[
                                                  product.bids.length - 1
                                              ].bid + ' kr'
                                            : 'No bids'}
                                    </strong>
                                </li>
                                <li
                                    className="list-group-item"
                                    id="end-date-li"
                                >
                                    End date:{' '}
                                    <strong style={{ color: 'red' }}>
                                        {new Date(
                                            product.end_dateTime
                                        ).toLocaleString(undefined, {
                                            hour12: false,
                                            hourCycle: 'h23',
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </strong>
                                </li>
                            </ul>
                            <div
                                className="card-body"
                                id="home-card-btn-container"
                            >
                                <Link to={`productpage/${product._id}`}>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleViewProductError(product._id)
                                        }
                                        id="home-card-btn"
                                    >
                                        View Product
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="container overflow-hidden text-center">
                    <div className="row gx-5">
                        <div className="col">
                            <div className="p-3">
                                <h3>Most affordable</h3>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-3">
                                <h3>Most Popular</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container text-center"
                    id="filtered-products-parent"
                >
                    <div className="row" id="filtered-products-container">
                        <div className="col" id="filtered-products-cards">
                            {mostAffordableProducts.map((product) => (
                                <div
                                    className="card"
                                    key={product._id}
                                    style={{ width: '18rem' }}
                                >
                                    <img
                                        src={product.img_url}
                                        className="card-img-top"
                                        alt={product.productname}
                                        style={{
                                            height: '15rem',
                                            width: 'auto',
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {product.productname}
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            Starting price:{' '}
                                            {product.starting_price} kr
                                        </h6>
                                        <Link
                                            to={`productpage/${product._id}`}
                                            onClick={() =>
                                                handleViewProductError(
                                                    product._id
                                                )
                                            }
                                            className="btn btn-primary"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col" id="filtered-products-cards">
                            <div className="col" style={{}}>
                                {mostPopularProducts.map((product) => (
                                    <div
                                        className="card"
                                        key={product._id}
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={product.img_url}
                                            className="card-img-top"
                                            alt={product.productname}
                                            style={{
                                                height: '15rem',
                                                width: 'auto',
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {product.productname}
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                Starting price:{' '}
                                                {product.starting_price} kr
                                            </h6>
                                            <Link
                                                to={`productpage/${product._id}`}
                                                onClick={() =>
                                                    handleViewProductError(
                                                        product._id
                                                    )
                                                }
                                                className="btn btn-primary"
                                            >
                                                View Product
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="recent-sold-container" style={{ fontFamily: 'Roboto' }}>
                <h3 id="recently-sold-h1">Recently sold products</h3>
                <ul id="recent-sold-ul">
                    <li id="recent-sold-li">
                        {' '}
                        {recentlySoldProducts.map((product) => (
                            <div id="recent-sold-item" key={product._id}>
                                <Link
                                    to={`productpage/${product._id}`}
                                    onClick={() =>
                                        handleViewProductError(product._id)
                                    }
                                    style={{
                                        textDecoration: 'none',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    <img
                                        src={product.img_url}
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            objectFit: 'cover',
                                            overflow: 'hidden',
                                            borderRadius: '6px',
                                            marginTop: '10px',
                                            border: '1px solid #0000002f',
                                        }}
                                    />
                                    <p id="recent-sold-p">
                                        {product.productname}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
            <div>
                <Footer />
                <ScrollToTopButton />
            </div>
        </>
    );
}

export default Home;
