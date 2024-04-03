import "./Mypage.css";
import PostProductButton from "../components/PostProductButton.jsx";
import { useEffect, useState } from "react";
import MyAuctionObjectsList from "../components/MyAuctionObjectsList.jsx";

export default function Mypage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []); //dependency array, without it useEffect won't stop running

  const fetchAllProducts = async () => {
    try {
      //get data from json-server at db.json
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserById("6049fa70-900f-4d34-87a7-55f06da0558f");
  }, []); //dependency array, without it useEffect won't stop running

  async function fetchUserById(id) {
    try {
      //get user data from json-server at db.json
      const response = await fetch(`http://localhost:3000/users/${id}`);
      if (!response.ok) {
        throw new Error("error");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  //deletes one product by id
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      fetchAllProducts(); //displays all products anew after specific product has been removed
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // this is an early return: make sure there are products to render; if not, abort
  if (!products.length) {
    return null;
  }

  return (
    <>
      <div id="mypage-container">
        <section id="user-info">
          <div className="card border-secondary mb-3" id="mypage-card">
            <div className="card-header">Welcome to My Page</div>
            <div className="card-body text-secondary">
              <p className="card-text">You are signed in as: {user.username}</p>
            </div>
          </div>
          {/* button-component which in turns triggers the modal for posting a products to show */}
          <PostProductButton />
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
        <div className="ads-card-container-mypage">
          <div className="card-body">
            <h5 className="card-title">
              {" "}
              <MyAuctionObjectsList products={products} />
            </h5>
            <p className="card-text"></p>
            <a href="#" className="btn btn-primary">
              View Product
            </a>
          </div>
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My won auctions</h1>
        <div className="ads-card-container-mypage">
          {/* You can put your won auction cards here */}
        </div>
      </section>

      <section className="mypage-sections" id="bid-history-section">
        <h1 id="bid-history-title">My bid history</h1>
        <div>
          <p>
            “Product”, Price: 255 kr, Date: 2024-03-19 13:15, Final price: 500
            kr
          </p>
        </div>
      </section>
    </>
  );
}
