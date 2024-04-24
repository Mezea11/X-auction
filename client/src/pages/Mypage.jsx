import "./Mypage.css";
import PostProductButton from "../components/PostProductButton.jsx";
import { useEffect, useState, useContext } from "react";
import MyAuctionObjectsList from "../components/MyAuctionObjectsList.jsx";
import { GlobalContext } from "../GlobalContext";
import PatchProductButton from "../components/PatchProductButton.jsx";
import { Link } from "react-router-dom";
import EditUserButton from "../components/EditUserInfoButton.jsx";

export default function Mypage() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(GlobalContext);
  const [signedInUser, setSignedInUser] = useState(null);
  const [activeBids, setActiveBids] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [legacyBids, setLegacyBids] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchWonAuctions();
    fetchBids();
    const interval = setInterval(fetchProducts, 5000);
    const interval2 = setInterval(fetchWonAuctions, 5000);
    const interval3 = setInterval(fetchBids, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval, interval2, interval3);
  }, []);


  const fetchProducts = async () => {
    try {
      if (user && user.username) {
        const response = await fetch(`/api/productsbyseller?seller=${user.username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setSignedInUser(user);
      }
      console.log('fetchProducts')
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBids = async () => {
    try {
      if (user && user.username) {
        console.log(user.username);
        const response = await fetch(
          `/api/productsbybids?username=${user.username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const activeBids = data.filter(product => product.ongoing);
        setActiveBids(activeBids)
        const legacyBids = data.filter(product => !product.ongoing);
        setLegacyBids(legacyBids);
        console.log("fetchBids");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchWonAuctions = async () => {
    try {
      //get data from mongodb database
      const response = await fetch(`/api/products`);
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      // Filter data from json server: Checks if won = true and user has the highest bid
      const wonAuctions = data.filter(product => product.won && product.bids.length > 0 && product.bids[product.bids.length - 1].username === user.username);
      // Update the state with filtered products
      setWonAuctions(wonAuctions);
      console.log('fetchWonAuctions');
      //Error handling
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //deletes one product by id
  const deleteProduct = async (_id) => {
    try {
      console.log(_id);
      const response = await fetch(`/api/products/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          "Failed to delete product. If a bid has been placed the auction ad can't be deleted."
        );
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== _id)
      ); //displays all products anew after specific product has been removed
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(
        error.message || "Failed to delete product. Please try again later."
      );
    }
  };

  const formatDate = (endDateTime) => {
    // Parse the endDateTime string into a Date object
    const endDate = new Date(endDateTime);

    // Format the date as desired
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      locale: 'en-SE'
    };

    return endDate.toLocaleDateString('en-SE', options);
  };

  return (
    <>
      <div id="mypage-container">
        <section id="user-info">
          <div className="card border-secondary mb-3" id="mypage-card">
            <div className="card-header">Welcome to My Page</div>
            <div className="card-body text-secondary">
              <p className="card-text">
                {signedInUser
                  ? `You are signed in as: ${signedInUser.username}`
                  : "Loading..."}
              </p>
            </div>
          </div>
          {/* button-component which in turns triggers the modal for posting a products to show */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ marginBottom: "0.7rem" }}>
              <PostProductButton />
            </div>
            <div style={{ marginBottom: "0.7rem" }}>
              <PatchProductButton />
            </div>
            <div>
              <EditUserButton />
            </div>
          </div>
        </section>
      </div>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My auction ads</h1>
        <div className="ads-card-container-mypage" style={{ display: "flex" }}>
          <MyAuctionObjectsList
            products={products}
            deleteProduct={deleteProduct}
          />
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My active bids</h1>
        <div className="ads-card-container-mypage" style={{ display: "flex" }}>
          {activeBids.map((activeBid) => (
            // key links the element to the specific object
            <div
              key={activeBid._id}
              className="card"
              style={{
                height: "38rem",
                maxWidth: "18rem",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              <img
                src={activeBid.img_url}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{activeBid.productname}</h5>
                <p className="card-text">{activeBid.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>
                    Asking price:{" "}
                    <strong style={{ color: "green" }}>
                      {activeBid.starting_price}:-
                    </strong>
                  </p>
                </li>
                <li className="list-group-item">
                  Highest bid:{" "}
                  <strong style={{ color: "green" }}>
                    {activeBid.bids.length > 0 ?
                      (activeBid.bids[activeBid.bids.length - 1].bid + " kr") :
                      "No bids"}
                  </strong>
                  {activeBid.bids.length > 0 &&
                    (activeBid.bids[activeBid.bids.length - 1].username === user.username ?
                      <p style={{ color: "blue" }}>You have the highest bid!</p> :
                      <p style={{ color: "red" }}>You do not have the highest bid</p>)
                  }
                </li>
                <li className="list-group-item">
                  Time left:{" "}
                  <strong style={{ color: "red" }}>
                    {formatDate(activeBid.end_dateTime)}
                  </strong>
                </li>
              </ul>
              <div
                className="card-body"
                id="home-card-btn"
                style={{ maxHeight: "5rem" }}
              >
                {/* link to productpage with the uniqe id of specific product */}
                <Link to={`/ProductPage/${activeBid._id}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: "0.5rem 0.5rem", maxHeight: "3rem" }}
                  >
                    View Product
                  </button>
                </Link>
                &nbsp;
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My won auctions</h1>
        <div className="ads-card-container-mypage" style={{ display: "flex" }}>
          {wonAuctions.map((wonAuction) => (
            // key links the element to the specific object
            <div
              key={wonAuction._id}
              className="card"
              style={{
                height: "38rem",
                minWidth: "18rem",
                maxWidth: "18rem",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              <img
                src={wonAuction.img_url}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{wonAuction.productname}</h5>
                <p className="card-text">{wonAuction.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>
                    Asking price:{" "}
                    <strong style={{ color: "green" }}>
                      {wonAuction.starting_price}:-
                    </strong>
                  </p>
                </li>
                <li className="list-group-item">
                  Winning bid:{" "}
                  <strong style={{ color: "green" }}>
                    {wonAuction.bids.length > 0
                      ? wonAuction.bids[wonAuction.bids.length - 1].bid + " kr"
                      : "No bids"}
                  </strong>
                </li>
                <li className="list-group-item">
                  End time:{" "}
                  <strong style={{ color: "red" }}>
                    {formatDate(wonAuction.end_dateTime)}
                  </strong>
                </li>
              </ul>
              <div
                className="card-body"
                id="home-card-btn"
                style={{ maxHeight: "5rem" }}
              >
                {/* link to productpage with the uniqe id of specific product */}
                <Link to={`/ProductPage/${wonAuction._id}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: "0.5rem 0.5rem", maxHeight: "3rem" }}
                  >
                    View Product
                  </button>
                </Link>
                &nbsp;
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mypage-sections" id="bid-history-section">
        <h1 id="bid-history-title">My bid history</h1>
        <div>
          {legacyBids.map((legacyBid) => (
            <p key={legacyBid._id}>
              <Link to={`/ProductPage/${legacyBid._id}`}>
                <img src={legacyBid.img_url} alt="Product Image" style={{ width: "50px", height: "50px" }} />
                {legacyBid.productname}
              </Link>
              {legacyBid.bids.length > 0 &&
                (legacyBid.bids[legacyBid.bids.length - 1].username === user.username ?
                  <span style={{ color: "green" }}>won</span> :
                  <span style={{ color: "red" }}>lost</span>)
              }
            </p>
          ))}
        </div>
      </section>


    </>
  );
}
