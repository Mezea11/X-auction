import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PlaceBidFunction({ onSubmit }) {
  const { productId } = useParams();
  const [bid, setBid] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const parsedBid = parseFloat(bid);
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          //ska pushas till propertyn bid som är en array på produkt-objektet
          body: JSON.stringify({ bid: { userId: "2", bid: parsedBid } }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessfulBid(true);
      onSubmit({ bid: parsedBid });
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
    setBid(""); // Resetting the bid input after successful submission
  }

  useEffect(() => {
    // This effect is executed when the component mounts.
    // You can perform initial data fetching or any other side effect here.
    // Example: Fetch initial data about the product or set initial state.
  }, []); // Empty dependency array to avoid infinite loops

  return (
    <>
      <div id="place-bid-function-container">
        <p>Insert amount:</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text">SEK</span>
            <input
              type="text"
              className="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Place bid
          </button>
          <div className="modal-body">
            {successfulBid ? (
              <div className="alert alert-success" role="alert">
                Bid placed successfully!
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}
