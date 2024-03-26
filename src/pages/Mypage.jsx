import "./Mypage.css";
import ProductForm from "../components/ProductForm";
import { useEffect, useState } from "react";
import MyAuctionObjectsList from "../components/MyAuctionObjectsList.jsx";

export default function Mypage() {
  const [products, setProducts] = useState("");

  const postProduct = async (
    title,
    description,
    extended_Description,
    category,
    keywords,
    endDate,
    price,
    img_url
  ) => {
    try {
            
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          extended_Description,
          category,
          keywords,
          endDate,
          price,
          img_url,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to post product");
      }
      
      fetchAllProducts();
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    }, []);//dependency array, with out it useEffect won't stop running

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
      console.log(products);
    };

    const deleteProduct = async (id) => {
      try {
        const response = await fetch(`${"api/products"}/${id}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        fetchAllProducts();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    };
    // this is an early return: make sure there are products to render; if not, abort
    if(!products.length) {
      return null
    }
  return (
    <>
      <ProductForm onSubmit={postProduct} />

      <div id="mypage-container">
        <section id="user-info">
          <div className="card border-secondary mb-3" id="mypage-card">
            <div className="card-header">Username</div>
            <div className="card-body text-secondary">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
          <button type="button" class="btn btn-primary">
            Post new auction ad
          </button>
        </section>
      </div>



      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My auction ads</h1>
        <div className="ads-card-container-mypage" style={{display: "flex"}}>
        <MyAuctionObjectsList products={products} deleteProduct={deleteProduct} />
        </div>
      </section>
      

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My active bids</h1>
        <div className="ads-card-container-mypage">
          <div className="card" style={{ width: "18rem" }}>
            <img src className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My won auctions</h1>
        <div className="ads-card-container-mypage">
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
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
  )
}


