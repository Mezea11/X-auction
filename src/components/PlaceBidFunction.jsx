import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PlaceBidFunction({ onSubmit }) {
  const { productId, userId } = useParams(); // Destructuring both parameters
  const [bid, setBid] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);
  const [askingPrice, setAskingPrice] = useState(null);

  useEffect(() => {
    // Fetch product details to get the asking price
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching product details");
        }
        const data = await response.json();
        setAskingPrice(parseFloat(data.price)); // Convert asking price to a number
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const parsedBid = parseFloat(bid);
    try {
      if (parsedBid < askingPrice) {
        // Compare parsedBid with the asking price
        alert("CANNOT PLACE BID UNDER ASKING PRICE");
        setSuccessfulBid(false);
        setBid(""); // Clear bid input field
        return; // Exit early if bid is less than the asking price
      }

      const response = await fetch(
        `http://localhost:3000/products/${productId}`
      );

      const data = await response.json();

      let updatedData;
      if (!data.bid) {
        updatedData = {
          ...data,
          bid: [{ userId: "2", bid: parsedBid }],
        };
      } else {
        updatedData = {
          ...data,
          bid: [
            ...(Array.isArray(data.bid) ? data.bid : [data.bid]),
            { userId: "2", bid: parsedBid },
          ],
        };
      }

      const patchResponse = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      setSuccessfulBid(true);
      onSubmit({ bid: parsedBid });
      setBid(""); // Resetting the bid input after successful submission
    } catch (error) {
      console.error("Error:", error);
      // Error message in consoles
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
