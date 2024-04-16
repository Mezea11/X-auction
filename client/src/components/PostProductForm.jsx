import { useState, useContext } from 'react';
//import { GlobalContext } from '../GlobalContext';

//creates the form used for posting new products to the db
export default function PostProductForm({ onSubmit }) {
    const [productName, setProductName] = useState(''); //Hooks for setting the varibale values for all inputFields
    const [description, setDescription] = useState('');
    const [extendedDescription, setExtendedDescription] = useState('');
    const [category, setCategory] = useState('');
    const [keywords, setKeywords] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [extendedDescriptionLength, setExtendedDescriptionLength] =
        useState(0);
    const [productNameLength, setProductNameLength] = useState(0);
    //const { user } = useContext(GlobalContext);

    const handleProductNameLength = (e) => {
        setProductNameLength(e.target.value.length);
    };

    const handleDescriptionLength = (e) => {
        setDescriptionLength(e.target.value.length);
    };

    const handleExtendedDescriptionLength = (e) => {
        setExtendedDescriptionLength(e.target.value.length);
    };

    function handleSubmit(e) {
        e.preventDefault(); //prevent form default behaviour (reload)

        const formData = {
            productname: productName,
            description: description,
            extended_description: extendedDescription,
            category: category,
            keywords: keywords,
            end_dateTime: endDateTime,
            starting_price: startingPrice,
            img_url: imgUrl,
            //seller: user,
        };
        //calling onSubmit and specifying the data passed back to the parent component
        onSubmit(
            productName,
            description,
            extendedDescription,
            category,
            keywords,
            endDateTime,
            startingPrice,
            imgUrl
            //user
        );

        console.log(formData);
        //reset all variables on submit
        setProductName('');
        setDescription('');
        setExtendedDescription('');
        setCategory('');
        setKeywords('');
        setEndDateTime('');
        setStartingPrice('');
        setImgUrl('');
    }

    return (
        <>
            <div className="product-form-container" id="ProductForm">
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="productname">
                            Product Name ({70 - productNameLength}/70 chars
                            remaining)
                        </label>
                        <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            onKeyUp={handleProductNameLength}
                            type="text"
                            placeholder="What are you selling?"
                            className="form-control w-75"
                            id="productname"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="description">
                            Description ({70 - descriptionLength}/70 chars
                            remaining)
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
                        <label
                            className="form-label"
                            htmlFor="extended_description"
                        >
                            Extended Description (
                            {2000 - extendedDescriptionLength}/2000 chars
                            remaining)
                        </label>
                        <input
                            value={extendedDescription}
                            onChange={(e) =>
                                setExtendedDescription(e.target.value)
                            }
                            onKeyUp={handleExtendedDescriptionLength}
                            type="text"
                            className="form-control w-75"
                            id="extended_description"
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
                            onChange={(e) =>
                                setKeywords(e.target.value.split(','))
                            }
                            type="text"
                            placeholder="enter, keywords, like, this"
                            className="form-control w-75"
                            id="keywords"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="end_dateTime">
                            Auction end time & date
                        </label>
                        <input
                            value={endDateTime}
                            onChange={(e) => setEndDateTime(e.target.value)}
                            type="datetime-local"
                            className="form-control w-75"
                            id="end_dateTime"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="starting_price">
                            Starting Price
                        </label>
                        <input
                            value={startingPrice}
                            onChange={(e) =>
                                setStartingPrice(Number(e.target.value))
                            }
                            type="number"
                            className="form-control w-75"
                            placeholder="Enter lowest selling price"
                            id="starting_price"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="img_url">
                            Insert image url:
                        </label>
                        <input
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            type="url"
                            className="form-control w-75"
                            placeholder="Enter url for img of what you are selling"
                            id="img_url"
                            required
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Post Object
                    </button>
                </form>
            </div>
        </>
    );
}
