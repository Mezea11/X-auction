import { useState, useEffect } from "react";

export default function SearchbarComponent() {
  /* STATE HOOK: submitted user input in searchbar */
  const [searchTerm, setSearchTerm] = useState("");
  /* STATE HOOK: data from database */
  const [products, setProducts] = useState(null);
  /* STATE HOOK: search result will be stored in new array */
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [successOrErrorMessage, setSuccessOrErrorMessage] = useState(undefined);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Error fetching product details");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* takes in searchterm (user input in search bar) and sets it to lowercase */
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowResults(true);

    const filteredItems = products.filter(
      (product) => {
        // Check if the lowercase search term is included in the lowercase product title
        const matchingTitle =
          product.title && product.title.toLowerCase().includes(searchTerm);

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
      }
      // Function filter() returns filteredProducts without being explicitly told to
    );

    // Set filtered products state to the result from function above
    setFilteredProducts(filteredItems);

    // Set success or error message based on the number of filtered items
    if (filteredItems.length === 0) {
      setSuccessOrErrorMessage("No products matched your search");
    } else {
      setSuccessOrErrorMessage(
        `Your search yielded ${filteredItems.length} results`
      );
    }
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      {/* Display amount of hits or give error message if no match is
      found */}
      {successOrErrorMessage && <p>{successOrErrorMessage}</p>}
      {/* Render search results, if any */}
      <div id="searchbar-results-container">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <h6>
              {product.keywords.map((keyword) => "#" + keyword).join(" ")}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}
