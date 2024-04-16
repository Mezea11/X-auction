import { useState, useEffect } from "react";

export default function PatchProductForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    extended_Description: "",
    category: "",
    keywords: "",
    endDate: "",
    price: "",
    img_url: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <div className="product-form-container" id="ProductForm">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="title"
              name="title"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <input
              value={formData.description}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="description"
              name="description"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="extended_Description">
              Extended Description
            </label>
            <input
              value={formData.extended_Description}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="extended_Description"
              name="extended_Description"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <input
              value={formData.category}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="category"
              name="category"
              required
            />
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
            <label className="form-label" htmlFor="endDate">
              End Date
            </label>
            <input
              value={formData.endDate}
              onChange={handleChange}
              type="text"
              className="form-control w-75"
              id="endDate"
              name="endDate"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="price">
              Asking Price
            </label>
            <input
              value={formData.price}
              onChange={handleChange}
              type="number"
              className="form-control w-75"
              id="price"
              name="price"
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
              type="text"
              className="form-control w-75"
              id="img_url"
              name="img_url"
              required
            />
          </div>
          <button className="btn btn-success" style={{ marginTop: "1rem" }}>
            Patch Object
          </button>
        </form>
      </div>
    </>
  );
}