import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../GlobalContext";

export default function PlaceBidFunction({ onSubmit }) {
  const { productId, username } = useParams(); // Destructuring both parameters
  const [bid, setBid] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);
  const [unsuccessfulBid, setUnsuccessfulBid] = useState(false);
  const [startingPrice, setStartingPrice] = useState(null);
  const { user } = useContext(GlobalContext);


  useEffect(() => {
        // Fetch product details to get the starting price
    const fetchProductDetails = async () => {
        try {
            console.log('PBF: fetchProductDetails step 1');
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
              throw new Error("Error fetching product details");
            }
            const data = await response.json();
            setStartingPrice(parseInt(data.price)); // Convert starting price to a number
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
    };

    fetchProductDetails();
}, [productId]);

  async function handleSubmit(e) {
    console.log("PBF: HandleSubmit: step 2")
    e.preventDefault(); // Prevent default form submission behavior

    const parsedBid = parseInt(bid);
    try {
      if (parsedBid < startingPrice) {
        // Compare parsedBid with the starting price
        setUnsuccessfulBid(true);
        setSuccessfulBid(false);
        setBid(""); // Clear bid input field
        return; // Exit early if bid is less than the starting price
      }

      //MORE TRY HERE
      //compare new bid with last bid in bids array
      //if same or lower: reject
      //else: patch

      const response = await fetch(
        `/api/products/${productId}`
      );

      const data = await response.json();

      let updatedData;
      // if the product object does not have a property bids – create property bid as an array of objects
      if (!data.bids) {
        updatedData = {
          ...data,
          bids: [{ username: user, bid: parsedBid }],
        };
      } else {
        //if the product object does have a property bids that is an array, use that
        //if the product object does have a property bids that is NOT an array, change object to an array
        updatedData = {
          ...data,
          bids: [
            ...(Array.isArray(data.bids) ? data.bids : [data.bids]),
            { username: user, bid: parsedBid },
          ],
        };
      }

      //patch: array + new bid to the product object if it does not already have a property bids (if statement above)
      //or: new bid to array bids (else above)
      const patchResponse = await fetch(
        `/api/products/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
        console.log("Step 3: Patch successful!")

      setSuccessfulBid(true);
      if (typeof onSubmit === "function") {
        onSubmit({ username: user, bid: parsedBid });
      }
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
              type="number"
              min="1"
              className="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={bid.trim().length === 0}
          >
            Place bid
          </button>
          <div className="modal-body">
            {unsuccessfulBid && ( // Render login error message if there's a login error
              <div className="alert alert-danger" role="alert">
                Cannot place bid under starting price.
              </div>
            )}
          </div>
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
