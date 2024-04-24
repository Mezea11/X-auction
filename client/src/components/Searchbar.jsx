import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchbarComponent() {
    const navigate = useNavigate();
    /* STATE HOOK: submitted user input in searchbar */
    const [searchTerm, setSearchTerm] = useState('');
    /* STATE HOOK: data from database */
    const [products, setProducts] = useState(null);
    /* STATE HOOK: search result will be stored in new array */
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [successOrErrorMessage, setSuccessOrErrorMessage] =
        useState(undefined);
    const [showResults, setShowResults] = useState(false);

    // useEffect to fetch products with an interval
    useEffect(() => {
        fetchProducts();
        const interval = setInterval(fetchProducts, 5000);
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [products]); //Empty dependency array to prevent infinite loop

    // fetch ongoing products from database
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Error fetching product details');
            }
            const data = await response.json();

            // Filter data from json server: Checks if object: "onngoing" is true or false
            const ongoingProducts = data.filter((product) => product.ongoing);

            // Update the state with only products that are ongoing
            setProducts(ongoingProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    /* takes in search term (user input in search bar) and sets it to lowercase */
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // the function which handle the filtering and rendering og the products
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('i submitted');
        setShowResults(true);

        const filteredItems = products.filter(
            (product) => {
                //const matchingCategory = product.category;

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
                    product.extended_description
                        .toLowerCase()
                        .includes(searchTerm);

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
            }
            // Function filter() returns filteredProducts without being explicitly told to
        );

        // Set filtered products state to the result from function above
        setFilteredProducts(filteredItems);

        // Set success or error message based on the number of filtered items
        if (filteredItems.length === 0) {
            setSuccessOrErrorMessage('No products matched your search');
        } else {
            setSuccessOrErrorMessage(
                `Your search yielded ${filteredItems.length} results`
            );
        }
    };

    if (!products) {
        return <div>Loading...</div>;
    }

    // function so we can go to product page
    const handleViewProduct = async (productId) => {
        console.log('handle view product');
        // Fetch individual product data
        try {
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                throw new Error('Error fetching product');
            }
            const productData = await response.json();
            // Now you have the product data, you can navigate to the product page
            navigate(`/Productpage/${productId}`);
            console.log('Product data:', productData);
        } catch (error) {
            console.log('error');
            console.error('Error fetching product:', error);
        }
    };

    /*  const handleChecked = (e) => {
        // Destructuring
        const { name, checked } = e.target;
        if (checked) {
            console.log(`${name} is ${checked}`);
        } else if (!checked) {
            console.log(`${name} is ${checked}`);
        }
    }; */
    return (
        <div id="searchbar-container">
            <form onSubmit={handleSubmit} className="d-flex" role="search">
                <input
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
            {/* If we want to continue developing filtering according to category, we can use this
            <div id="filter-container">
                <div className="filter">
                    <label htmlFor="bird">Bird</label>
                    <input
                        type="checkbox"
                        id="bird"
                        name="bird"
                        onChange={handleChecked}
                    />
                </div>
                <div className="filter">
                    <label htmlFor="fish">Fish</label>
                    <input
                        type="checkbox"
                        id="fish"
                        name="fish"
                        onChange={handleChecked}
                    />
                </div>
                <div className="filter">
                    <label htmlFor="inbetween">Inbetween</label>
                    <input
                        type="checkbox"
                        id="inbetween"
                        name="inbetween"
                        onChange={handleChecked}
                    />
                </div>
            </div> */}
            {/* Display amount of hits or give error message if no match is
      found */}
            {successOrErrorMessage && <p>{successOrErrorMessage}</p>}

            {/* Render search results, if any */}
            <div
                id="searchbar-results-container"
                className={
                    showResults ? 'searchbar-results-container-active' : ''
                }
            >
                {
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
                }
            </div>
        </div>
    );
}
