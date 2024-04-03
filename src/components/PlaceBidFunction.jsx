import { useState } from "react";

export default function PlaceBidFunction({ onSubmit }) {
  const [bid, setBid] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const placeBid = {
      bid: bid,
    };

    const parsedBid = parseFloat(bid);

    try {
      console.log("BID PLACED BRO");
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bid: parsedBid }), // Corrected the parameter here
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      setSuccessfulBid(true);
      onSubmit(placeBid);
      setBid(""); // Resetting the bid input after successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
  }

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
        </form>
      </div>
    </>
  );
}
