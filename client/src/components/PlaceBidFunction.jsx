import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../GlobalContext";

export default function PlaceBidFunction({ onSubmit }) {
  const { productId, username } = useParams(); // Destructuring both parameters
  const [bid, setBid] = useState("");
  const [successfulBid, setSuccessfulBid] = useState(false);
  const [unsuccessfulBid, setUnsuccessfulBid] = useState(false);
  const { user } = useContext(GlobalContext);


  // ta tillbaka useEffect för att kunna rendera ut budhistorik + info om bud i "produktkortet"
  /* useEffect(() => {
        // Fetch product details to get the starting price
    const fetchProductDetails = async () => {
        try {
            console.log('PBF: fetchProductDetails step 1');
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
              throw new Error("Error fetching product details");
            }
            const data = await response.json();
            
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
    };

    fetchProductDetails();
}, [productId]); */

  async function handleSubmit(e) {
    console.log("PBF: HandleSubmit: step 2")
    e.preventDefault(); // Prevent default form submission behavior
    const response = await fetch(
        `/api/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Error fetching product details");
      }

      const data = await response.json();
      const startingPrice = data.starting_price;
      const bids = data.bids;
      const parsedBid = parseInt(bid);
      //jobba vidare med logiken inte kunna buda på egen auktion/inte kunna buda på avslutad auktion
      const seller = data.seller;
      const now = Date.now();
      const end_Datetime = data.end_dateTime;

    try {
      
/*       if (parsedBid < startingPrice) {
        // Compare parsedBid with the starting price
          setUnsuccessfulBid(true);
          setSuccessfulBid(false);
          alert("You cannot place bid under starting price!");
          setBid(""); // Clear bid input field
          return; // Exit early if bid is less than the starting price
      } */

      if (bids.length === 0 && parsedBid < startingPrice) {
      // If there are no bids and bid is lower than starting price
        setUnsuccessfulBid(true);
        setSuccessfulBid(false);
        alert("You cannot place bid under starting price!");
        return;
    } else if (bids.length > 0 && parsedBid < bids[bids.length - 1].bid) {
      // If there are bids but bid is lower than highest bid
        setUnsuccessfulBid(true);
        setSuccessfulBid(false);
      alert("You cannot place bid under current bid!");
      return;
    } else if (bids.length > 0 && parsedBid === bids[bids.length - 1].bid) {
      // If there are bids but bid is same as highest bid
        setUnsuccessfulBid(true);
        setSuccessfulBid(false);
        alert("You cannot place the same bid as current bid!");
        return;
    }

      let updatedData = {
         ...data,
      bids: [...bids, { username: user.username, bid: parsedBid }],
    };

     await fetch(
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
        onSubmit({ username: user.username, bid: parsedBid });
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
            {/* {unsuccessfulBid && ( // Render login error message if there's a login error
              <div className="alert alert-danger" role="alert">
                Cannot place bid under starting price.
              </div>
            )} */}
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
