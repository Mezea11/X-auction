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

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  useEffect(() => {
    fetchActiveBids();
  }, [activeBids]);

  const fetchActiveBids = async () => {
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
        setActiveBids(data);
        console.log("here");
      }
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
                    {activeBid.highest_bid}:-
                  </strong>
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
          {activeBids.map((activeBid) => (
            // key links the element to the specific object
            <div
              key={activeBid._id}
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
                    {activeBid.highest_bid}:-
                  </strong>
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

      <section className="mypage-sections" id="bid-history-section">
        <h1 id="bid-history-title">My bid history</h1>
        <div>
          <p>
            “Product”, Price: 255 kr, Date: 2024-03-19 13:15, Final price: 500 k
          </p>
        </div>
      </section>
    </>
  );
}
