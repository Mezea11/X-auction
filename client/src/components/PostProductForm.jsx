import { useState, useContext } from 'react';
import PostProductModal from './PostProductModal.jsx';
import { GlobalContext } from '../GlobalContext';

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
    const [extendedDescriptionLength, setExtendedDescriptionLength] = useState(0);
    const [productNameLength, setProductNameLength] = useState(0);
    const { user } = useContext(GlobalContext);
    const [successfulPost, setSuccessfulPost] = useState(false);

    const handleProductNameLength = (e) => {
        setProductNameLength(e.target.value.length);
    };

    const handleDescriptionLength = (e) => {
        setDescriptionLength(e.target.value.length);
    };

    const handleExtendedDescriptionLength = (e) => {
        setExtendedDescriptionLength(e.target.value.length);
    };

    const validateStartingPrice = (e) => {
        const value = e.target.value;

        //regex only allows digits
        if (/^\d*$/.test(value)) {
            setStartingPrice(value);
    }
}

    const handleStartingPriceInputBlur = () => {
        const intValue = parseInt(startingPrice)
        if (!isNaN(intValue) && intValue > 0) {
      setStartingPrice(intValue);
    } else {
      setStartingPrice('');
    }
    }

    async function postProduct(e) {
        e.preventDefault();

        try {
            const response = await fetch('/api/products', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productname: productName,
                    description: description,
                    extended_description: extendedDescription,
                    category: category,
                    keywords: keywords,
                    end_dateTime: endDateTime,
                    starting_price: startingPrice,
                    img_url: imgUrl,
                    seller: user.username,
                }),
            });
            console.log('step 1: entering function');

            const result = await response.json();

            if (response.status == 201) {
                console.log(result)
                console.log('step 2: successful post');
                setSuccessfulPost(true);                
            } else {
                console.log('step 3: else');
                if (response.status === 404 || response.status === 409) {
                    setLoginError(true);
                    console.log('step 4: 404');
                }
                // Handle other status codes or errors
            }
        } catch (error) {
            console.error('Error during post:', error);
            console.log('error');
            
            // Handle network or parsing errors
        }
    }

    function handleSubmit(e) {
       postProduct(e);
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
                            onChange={validateStartingPrice}
                            onBlur={handleStartingPriceInputBlur}
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
                    <div>
                {successfulPost && ( // Render login error message if there's a login error
                        <div className="alert alert-success" role="alert">
                            Post successful!
                        </div>
                    )}
                </div>
                </form>
            </div>
        </>
    );
}
