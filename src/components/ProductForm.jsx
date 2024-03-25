import { useState } from "react";

export default function ProductForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      title: title,
      description: description,
      category: category,
      keywords: keywords,
      endDate: endDate,
      price: price,
      img: img,
    };

    onSubmit(title, description, category, keywords, endDate, price, img);

    console.log(formData);

    setTitle("");
    setDescription("");
    setCategory("");
    setKeywords("");
    setEndDate("");
    setPrice("");
    setImg("");
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
              className="form-control w-75"
              id="title"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control w-75"
              id="description"
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
              Key search words
            </label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              type="text"
              className="form-control w-75"
              id="description"
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
            <label className="form-label" htmlFor="price">
              Listing price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="form-control w-75"
              id="price"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="img">
              Insert image url:
            </label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              type="url"
              className="form-control w-75"
              id="img"
              required
            />
          </div>
          <button className="btn btn-primary">Post Object</button>
        </form>
      </div>
    </>
  );
}
