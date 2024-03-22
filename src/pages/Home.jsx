//import SignupButton from "../components/SignupButton";
//import LoginButton from "../components/LoginButton";
//import Searchbar from "../components/Searchbar.jsx";
import mockproducts from "../assets/mockproducts.jsx";
import { useState } from "react";

function Home() {
  /* STATE HOOK: sökord som användaren matar in - från början tom sträng (= inget har sökts) */
  const [searchItem, setSearchItem] = useState("");
  /* STATEHOOK: filtrera sökta produkter - från början alla objekt i mockproducts (= inget har sökts - alla objekt "matchar" */
  const [filteredItems, setFilteredItems] = useState(mockproducts);
  //const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSearchInputChange = (event) => {
    /* ta in value av search och sätt till lowercase i variable searchTerm - setSearchItem förändrar värdet av searchItem */
    const searchTerm = event.target.value.toLowerCase();
    setSearchItem(searchTerm);

    const filteredItems = mockproducts.filter((product) => {
      /* ta ut matchande sökning baserat på produktens namn */
      const matchingName =
        product.name && product.name.toLowerCase().includes(searchTerm);
      /* ta ut matchande sökning baserat på produktens beskrivning */
      const matchingDescription =
        product.description &&
        product.description.toLocaleLowerCase().includes(searchTerm);
      /* ta ut matchande sökning baserat på produktens keywords */
      const matchingKeywords =
        product.keywords &&
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm)
        );

      return matchingName || matchingDescription || matchingKeywords;
    });

    /* ändrar värdet av filteredItems till en array av objekt där name och/eller description och/eller keywords matchar sökning */
    setFilteredItems(filteredItems);
  };
  return (
    <>
      <div className="classContainer">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            value={searchItem}
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchInputChange}
          />
        </form>
        <div className="mockdataoutput">
          {/* {errorMessage?.type === "error" && (
            <p>Inga produkter matchade din sökning</p>
          )} */}
          {/* skriver ut filtrerade produkter (= alla produkter om inget sökord har matats in)*/}
          {filteredItems.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h6>
                {product.keywords.map((keyword) => "#" + keyword).join(" ")}
              </h6>
            </div>
          ))}
        </div>
        {/* <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card s content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
