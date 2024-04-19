import "./Mypage.css";
import PostProductButton from "../components/PostProductButton.jsx";
import { useEffect, useState, useContext } from "react";
import MyAuctionObjectsList from "../components/MyAuctionObjectsList.jsx";
import { GlobalContext } from "../GlobalContext";
import PatchProductButton from "../components/PatchProductButton.jsx";

export default function Mypage() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(GlobalContext);
  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user && user.username) {
          const response = await fetch(`/api/products?seller=${user.username}`);
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
  }, [user]);

  //deletes one product by id
  const deleteProduct = async (id) => {
    try {
        console.log(id)
      const response = await fetch(`/api/products/6620cf1dd489e6d8379c1ad4`, {
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <PostProductButton />
            </div>
            <PatchProductButton />
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
        {/* <h1 className="section-titles-mypage">My active bids</h1>
                <div
                    className="ads-card-container-mypage"
                    style={{ display: 'flex' }}
                >
                    {products.length > 0 && (
                        <div
                            className="card"
                            style={{
                                minHeight: 'min-content',
                                minWidth: '18rem',
                                maxWidth: '18rem',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={products[5].img_url}
                                style={{
                                    width: '100%',
                                    height: '15rem',
                                    objectFit: 'cover',
                                }}
                                alt="Product Image"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {products[5].title}
                                </h5>
                                <p className="card-text">
                                    {products[5].description}
                                </p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <p>
                                            Asking price:{' '}
                                            <strong style={{ color: 'green' }}>
                                                {products[5].price}:-
                                            </strong>
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        Highest bid:{' '}
                                        <strong style={{ color: 'green' }}>
                                            {products[5].highest_bid}:-
                                        </strong>
                                    </li>
                                    <li className="list-group-item">
                                        Time left:{' '}
                                        <strong style={{ color: 'red' }}>
                                            {products[5].endDate}
                                        </strong>
                                    </li>
                                </ul>
                                <div className="card-body" id="home-card-btn">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {products.length > 0 && (
                        <div
                            className="card"
                            style={{
                                minHeight: 'min-content',
                                minWidth: '18rem',
                                maxWidth: '18rem',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={products[6].img_url}
                                style={{
                                    width: '100%',
                                    height: '15rem',
                                    objectFit: 'cover',
                                }}
                                alt="Product Image"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {products[6].title}
                                </h5>
                                <p className="card-text">
                                    {products[6].description}
                                </p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <p>
                                            Asking price:{' '}
                                            <strong style={{ color: 'green' }}>
                                                {products[6].price}:-
                                            </strong>
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        Highest bid:{' '}
                                        <strong style={{ color: 'green' }}>
                                            {products[6].highest_bid}:-
                                        </strong>
                                    </li>
                                    <li className="list-group-item">
                                        Time left:{' '}
                                        <strong style={{ color: 'red' }}>
                                            {products[6].endDate}
                                        </strong>
                                    </li>
                                </ul>
                                <div className="card-body" id="home-card-btn">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div> */}
      </section>

      <section className="mypage-sections">
        {/* <h1 className="section-titles-mypage">My won auctions</h1>
                <div
                    className="ads-card-container-mypage"
                    style={{ display: 'flex' }}
                >
                    {products.length > 0 && (
                        <div
                            className="card"
                            style={{
                                minHeight: 'min-content',
                                minWidth: '18rem',
                                maxWidth: '18rem',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={products[7].img_url}
                                style={{
                                    width: '100%',
                                    height: '15rem',
                                    objectFit: 'cover',
                                }}
                                alt="Product Image"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {products[7].title}
                                </h5>
                                <p className="card-text">
                                    {products[7].description}
                                </p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <p>
                                            Asking price:{' '}
                                            <strong style={{ color: 'green' }}>
                                                {products[7].price}:-
                                            </strong>
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        Highest bid:{' '}
                                        <strong style={{ color: 'green' }}>
                                            {products[7].highest_bid}:-
                                        </strong>
                                    </li>
                                    <li className="list-group-item">
                                        Time left:{' '}
                                        <strong style={{ color: 'red' }}>
                                            {products[7].endDate}
                                        </strong>
                                    </li>
                                </ul>
                                <div className="card-body" id="home-card-btn">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {products.length > 0 && (
                        <div
                            className="card"
                            style={{
                                minHeight: 'min-content',
                                minWidth: '18rem',
                                maxWidth: '18rem',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={products[9].img_url}
                                style={{
                                    width: '100%',
                                    height: '15rem',
                                    objectFit: 'cover',
                                }}
                                alt="Product Image"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {products[0].title}
                                </h5>
                                <p className="card-text">
                                    {products[0].description}
                                </p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <p>
                                            Asking price:{' '}
                                            <strong style={{ color: 'green' }}>
                                                {products[9].price}:-
                                            </strong>
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        Highest bid:{' '}
                                        <strong style={{ color: 'green' }}>
                                            {products[9].highest_bid}:-
                                        </strong>
                                    </li>
                                    <li className="list-group-item">
                                        Time left:{' '}
                                        <strong style={{ color: 'red' }}>
                                            {products[9].endDate}
                                        </strong>
                                    </li>
                                </ul>
                                <div className="card-body" id="home-card-btn">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div> */}
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
