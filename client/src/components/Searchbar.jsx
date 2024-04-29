//reviewed

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchbarComponent() {
    const navigate = useNavigate();
    const inputRef = useRef(null); // Create a ref for the input element

    // useEffect to focus the input field when the component mounts
    useEffect(() => {
        inputRef.current.focus(); // Focus the input field
    }, []); // Empty dependency array ensures this effect
    
    /* STATE HOOK: submitted user input in searchbar */
    const [searchTerm, setSearchTerm] = useState('');
    /* STATE HOOK: data from database */
    const [products, setProducts] = useState([]);
    /* STATE HOOK: search result will be stored in new array */
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [successOrErrorMessage, setSuccessOrErrorMessage] =
        useState(undefined);
    const [showResults, setShowResults] = useState(false);

    // useEffect to fetch products with an interval
    useEffect(() => {
        fetchProducts(); // Fetch products initially
        const interval = setInterval(fetchProducts, 5000); // Fetch products every 5 seconds
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array to ensure it's called on every render

    // fetch ongoing products from database
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Error fetching product details');
            }
            const data = await response.json();

            // Filter out products whose auctions have ended
            const currentTime = new Date();
            const ongoingProducts = data.filter(
                (product) =>
                    product.ongoing &&
                    new Date(product.end_dateTime) > currentTime
            );

            // Update the state with only ongoing products
            setProducts(ongoingProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    /* takes in search term (user input in search bar) and sets it to lowercase */
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // the function which handle the filtering and rendering of the products
    const handleSubmit = (event) => {
        event.preventDefault();

        setShowResults(true);

        const filteredItems = products.filter((product) => {
            // Check if the lowercase search term is included in the lowercase product title
            const matchingTitle =
                product.productname &&
                product.productname.toLowerCase().includes(searchTerm);

            // Check if the lowercase search term is included in the lowercase product description
            const matchingDescription =
                product.description &&
                product.description.toLowerCase().includes(searchTerm);

            // Check if the lowercase search term is included in the lowercase product extended description
            const matchingExtendedDescription =
                product.extended_description &&
                product.extended_description.toLowerCase().includes(searchTerm);

            // Check if the lowercase search term is included in any of the lowercase product keywords
            const matchingKeywords =
                product.keywords &&
                product.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(searchTerm)
                );
            // Return bool: shall product be included in filteredItems or not?
            return (
                matchingTitle ||
                matchingExtendedDescription ||
                matchingDescription ||
                matchingKeywords
            );
        });

        // Remove filtered items with expired auctions
        const currentTime = new Date();
        const updatedFilteredItems = filteredItems.filter(
            (product) => new Date(product.end_dateTime) > currentTime
        );

        // Set filtered products state to the updated result
        setFilteredProducts(updatedFilteredItems);

        // Set success or error message based on the number of filtered items
        if (updatedFilteredItems.length === 0) {
            setSuccessOrErrorMessage('No products matched your search');
        } else {
            setSuccessOrErrorMessage(
                `Your search yielded ${updatedFilteredItems.length} results`
            );
        }
    };

    if (!products) {
        return <div>Loading...</div>;
    }

    // function so we can go to product page
    const handleViewProduct = async (productId) => {
        // Fetch individual product data
        try {
            await fetch(`/api/products/${productId}`);
            // Now you have the product data, you can navigate to the product page
            navigate(`/Productpage/${productId}`);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    return (
        <div id="searchbar-container">
            <form onSubmit={handleSubmit} className="d-flex" role="search">
                <input
                    ref={inputRef} 
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <button
                    className="btn btn-outline-success"
                    type="submit"
                    disabled={searchTerm.trim().length === 0}
                >
                    Search
                </button>
            </form>

            {/* Display amount of hits or give error message if no match is found */}
            {successOrErrorMessage && <p>{successOrErrorMessage}</p>}

            {/* Render search results, if any */}
            <div
                id="searchbar-results-container"
                className={
                    showResults ? 'searchbar-results-container-active' : ''
                }
            >
                <section id="searchpage-products-container">
                    {/* goes through products array and renders each filtered product on page */}
                    {filteredProducts.map((product) => (
                        // key links the element to the specific object
                        <div
                            className="card"
                            style={{
                                overflow: 'hidden',
                            }}
                            key={product._id}
                        >
                            <img
                                src={product.img_url}
                                style={{
                                    width: '100%',
                                    height: '15rem',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {product.productname}
                                </h5>
                                <p className="card-text">
                                    {product.description}
                                </p>
                            </div>
                            <ul className="list-group list-group-flush">
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
                                <li className="list-group-item">
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
                            <div className="card-body" id="home-card-btn">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleViewProduct(product._id)
                                    }
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
