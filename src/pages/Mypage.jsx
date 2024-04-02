import './Mypage.css';
import PostProductButton from '../components/PostProductButton.jsx';
import { useEffect, useState } from 'react';
import MyAuctionObjectsList from '../components/MyAuctionObjectsList.jsx';

export default function Mypage() {
    const [products, setProducts] = useState('');

    useEffect(() => {
        fetchAllProducts();
    }, []); //dependency array, with out it useEffect won't stop running

    const fetchAllProducts = async () => {
        try {
            //get data from json-server at db.json
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        console.log(products);
    };

    const [users, setUsers] = useState('');

    useEffect(() => {
        fetchUserById('6049fa70-900f-4d34-87a7-55f06da0558f');
    }, []); //dependency array, with out it useEffect won't stop running

    async function fetchUserById(id) {
        try {
            //get user data from json-server at db.json
            const response = await fetch(`http://localhost:3000/users/${id}`);
            if (!response.ok) {
                throw new Error('error');
            }
            const usersData = await response.json();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        console.log(users);
    }
    //deletes one product by id
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${'api/products'}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            fetchAllProducts(); //displays all products anew after specific product has been removed
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    // this is an early return: make sure there are products to render; if not, abort
    if (!products.length) {
        return null;
    }

    return (
        <>
            <div id="mypage-container">
                <section id="user-info">
                    <div
                        className="card border-secondary mb-3"
                        id="mypage-card"
                    >
                        <div className="card-header">Welcome to My Page</div>
                        <div className="card-body text-secondary">
                            <p className="card-text">
                                You are signed in as: {users.username}
                            </p>
                        </div>
                    </div>
                    {/* button-component which in turns triggers the modal for posting a products to show */}
                    <PostProductButton />
                </section>
            </div>

            <section className="mypage-sections">
                <h1 className="section-titles-mypage">My auction ads</h1>
                <div
                    className="ads-card-container-mypage"
                    style={{ display: 'flex' }}
                >
                    <MyAuctionObjectsList
                        products={products}
                        deleteProduct={deleteProduct}
                    />
                </div>
            </section>

            <section className="mypage-sections">
                <h1 className="section-titles-mypage">My active bids</h1>
                <div className="ads-card-container-mypage">
                    <div className="card" style={{ width: '18rem' }}>
                        <img src className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the cards content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the cards content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mypage-sections">
                <h1 className="section-titles-mypage">My won auctions</h1>
                <div className="ads-card-container-mypage">
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the cards content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the cards content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mypage-sections" id="bid-history-section">
                <h1 id="bid-history-title">My bid history</h1>
                <div>
                    <p>
                        “Product”, Price: 255 kr, Date: 2024-03-19 13:15, Final
                        price: 500 k
                    </p>
                </div>
            </section>
        </>
    );
}
