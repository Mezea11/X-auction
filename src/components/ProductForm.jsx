import { useState } from "react";
//creates the form used for posting new products to the db
export default function ProductForm({ onSubmit }) {
  const [title, setTitle] = useState("");//Hooks for setting the varibale values for all inputFields
  const [description, setDescription] = useState("");
  const [extended_Description, setExtended_Description] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [endDate, setEndDate] = useState("");
  const [asking_price, setAsking_price] = useState("");
  const [img_url, setImg_url] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleDescriptionLength = (e) => {
    setDescriptionLength(e.target.value.length);
  };

  function handleSubmit(e) {
    e.preventDefault();//prevent form default behaviour (reload)

    const formData = {
      title: title,
      description: description,
      extended_Description: extended_Description,
      category: category,
      keywords: keywords,
      endDate: endDate,
      asking_price: asking_price,
      img_url: img_url,
    };
    //calling onSubmit and specifying the data passed back to the parent component
    onSubmit(
      title,
      description,
      extended_Description,
      category,
      keywords,
      endDate,
      asking_price,
      img_url
    );

    console.log(formData);
    //reset all variables on submit
    setTitle("");
    setDescription("");
    setExtended_Description("");
    setCategory("");
    setKeywords("");
    setEndDate("");
    setAsking_price("");
    setImg_url("");
  }

  return (
    <>
      <div className="container" id="ProductForm">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="What are you selling?"
              className="form-control w-75"
              id="title"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="description">
              Description ({70 - descriptionLength}/70 chars remaining)
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyUp={handleDescriptionLength}
              type="text"
              className="form-control w-75"
              id="description"
              placeholder="Describe what you are selling"
              maxLength={70}
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="extended_Description">
              Extended Description
            </label>
            <input
              value={extended_Description}
              onChange={(e) => setExtended_Description(e.target.value)}
              type="text"
              className="form-control w-75"
              id="extended_Description"
              placeholder="Write an extended description for the auction object."
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="category">
              Categorize product
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              //onChange={handleCategoryChange}
              className="form-control w-75"
              id="category"
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
              Key search words. Separate keywords with a comma
            </label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value.split(","))}
              type="text"
              placeholder="enter, keywords, like, this"
              className="form-control w-75"
              id="keywords"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="datetime-local">
              Auction end time & date
            </label>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="datetime-local"
              className="form-control w-75"
              id="datetime-local"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="asking_price">
              Listing asking_price
            </label>
            <input
              value={asking_price}
              onChange={(e) => setAsking_price(e.target.value)}
              type="number"
              className="form-control w-75"
              placeholder="Enter lowest selling asking_price"
              id="asking_price"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="img_url">
              Insert image url:
            </label>
            <input
              value={img_url}
              onChange={(e) => setImg_url(e.target.value)}
              type="url"
              className="form-control w-75"
              placeholder="Enter url for img of what you are selling"
              id="img_url"
              required
            />
          </div>
          <button className="btn btn-primary">Post Object</button>
        </form>
      </div>
    </>
  );
}
