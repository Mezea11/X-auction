import { useState, useEffect } from "react";

export default function PatchProductForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    extended_description: "",
    category: "",
    keywords: "",
    end_dateTime: "",
    starting_price: "",
    img_url: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        // Set initial form data and format date fields if necessary
        ...initialData,
        end_dateTime: initialData.end_dateTime
          ? formatDate(initialData.end_dateTime)
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({
        ...formData,
        // Convert date to ISO string format before sending to the server
        end_dateTime: new Date(formData.end_dateTime).toISOString(),
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Stockholm"
    };
    return new Date(date).toLocaleString("sv-SE", options);
  };

  return (
    <>
      <div className="product-form-container" id="ProductForm">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <label className="form-label" htmlFor="productname">
              Product Name ({70 - formData.productname.length}/70 chars remaining)
            </label>
            <input
              value={formData.productname}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="productname"
              name="productname"
              maxLength={70}
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="description">
              Description ({70 - formData.description.length}/70 chars
              remaining)
            </label>
            <input
              value={formData.description}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="description"
              name="description"
              maxLength={70}
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="extended_description">
              Extended Description ({2000 - formData.extended_description.length}/2000 chars
              remaining)
            </label>
            <input
              value={formData.extended_description}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="extended_description"
              name="extended_description"
              required
               maxLength={2000}
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <select
              value={formData.category}
              onChange={handleChange}
              className="form-control w-75"
              id="category"
              name="category"
              required
            >
              <option value="">Select category</option>
              <option value="Bird">Bird</option>
              <option value="Fish">Fish</option>
              <option value="Inbetween">Inbetween</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="keywords">
              Keywords
            </label>
            <input
              value={formData.keywords}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="keywords"
              name="keywords"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="end_dateTime">
              End Date Time
            </label>
            <input
              value={formData.end_dateTime}
              onChange={handleChange}
              type="datetime-local"
              className="form-control w-75"
              id="end_dateTime"
              name="end_dateTime"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="starting_price">
              Starting Price (can't be changed if any bids has been placed)
            </label>
            <input
              value={formData.starting_price}
              onChange={handleChange}
              type="number"
              className="form-control w-75"
              id="starting_price"
              name="starting_price"
              min={1}
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="img_url">
              Image URL
            </label>
            <input
              value={formData.img_url}
              onChange={handleChange}
              type="url"
              className="form-control w-75"
              id="img_url"
              name="img_url"
              required
            />
          </div>
          <button className="btn btn-success" style={{ marginTop: "1rem" }}>
            Update Object
          </button>
        </form>
      </div>
    </>
  );
}