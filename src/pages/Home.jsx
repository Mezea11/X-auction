import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div id="home-card-container">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://geauction.com/wp-content/uploads/2018/07/5-Auction-Tips-for-Beginners2.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Product</h5>
            <p className="card-text">
              This product is up for auction. Underneath you can see the highest
              bid and the time left.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Highest bid: <strong style={{ color: "green" }}>4325:-</strong>
            </li>
            <li className="list-group-item">
              Time left: <strong style={{ color: "red" }}>3d 22h</strong>
            </li>
          </ul>
          <div className="card-body" id="home-card-btn">
            <Link to={"/ProductPage"}>
              <button type="button" className="btn btn-primary">
                View Product
              </button>
            </Link>
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
