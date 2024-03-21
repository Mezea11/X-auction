//import SignupButton from "../components/SignupButton";
//import LoginButton from "../components/LoginButton";
import ProductForm from "../components/ProductForm";

function Home() {
  return (
    <>
      <div className="classContainer">
        <div className="card" style={{ width: "18rem" }}>
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
        </div>
        <ProductForm />
      </div>
    </>
  );
}

export default Home;
