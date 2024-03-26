import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductPageComponent from "../components/ProductPageComponent";
//import Searchbar from "../components/Searchbar.jsx";
import mockproducts from "../assets/mockproducts.jsx";
import { useState } from "react";
import ProductsList from "../components/ProductsList.jsx";

function Home() {
  /* STATE HOOK: sökord som användaren matar in - från början tom sträng (= inget har sökts) */
  const [searchTerm, setSearchTerm] = useState("");
  /* STATE HOOK: filtrera sökta produkter - från början alla objekt i mockproducts (= inget har sökts - alla objekt "matchar") */
  const [filteredItems, setFilteredItems] = useState(mockproducts);
  const [successOrErrorMessage, setSuccessOrErrorMessage] = useState(undefined);

  const handleSearchInputChange = (event) => {
    /* ta in value av search och sätt till lowercase i variable searchItem - setSearchItem förändrar värdet av searchItem */
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /* filtrerar data vid submit */
    const filteredItems = mockproducts.filter((product) => {
      /* ta ut matchande sökning baserat på produktens namn */
      /* om objektet (product) har en property name och om den propertyn inkluderar söktermen */
      const matchingName =
        product.name && product.name.toLowerCase().includes(searchTerm);
      /* ta ut matchande sökning baserat på produktens beskrivning */
      /* om objektet (product) har en property description och om den inkluderar söktermen */
      const matchingDescription =
        product.description &&
        product.description.toLocaleLowerCase().includes(searchTerm);
      /* ta ut matchande sökning baserat på produktens keywords */
      /* om objektet (product) har en property keywords och om den inkluderar söktermen */
      const matchingKeywords =
        product.keywords &&
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm)
        );

      /* returnerar alla objekt som matchar sökning */
      return matchingName || matchingDescription || matchingKeywords;
    });

    /* ändrar värdet av filteredItems till en array av objekt där name och/eller description och/eller keywords matchar sökning */
    setFilteredItems(filteredItems);
    if (filteredItems.length === 0) {
      setSuccessOrErrorMessage("Inga produkter matchade din sökning");
    } else if (filteredItems.length > 0) {
      setSuccessOrErrorMessage(
        `Din sökning fick ${filteredItems.length} träffar`
      );
    }
  };

  return (
    <>
      <div className="classContainer">
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            value={searchTerm}
            placeholder="Search"
            aria-label="Search"
            // "lyssnar" på sökrutan
            onChange={handleSearchInputChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Submit
          </button>
        </form>
        {/* skriver ut antal träffar eller om inga träffar fanns */}
        <p>{successOrErrorMessage}</p>
        {/* skriver ut filtrerade produkter */}
        <ProductsList products={filteredItems} />
      </div>
    </>
  );
}

export default Home;
