import { useContext } from "react";
import { Context } from "../Context.jsx";
import SignupButton from '../components/SignupButton.jsx';
import LoginButton from '../components/LoginButton.jsx';
import LogoutButton from "./LogoutButton.jsx";
import { Link } from 'react-router-dom';

function Navbar() {

    const { LoggedIn } = useContext(Context);

    return (
        <>
            <div>
                <nav
                    className="navbar navbar-expand-lg bg-body-tertiary"
                    style={{
                        boxShadow: '0 0 10px #719ece',
                    }}
                >
                    <div className="container-fluid">
                        <Link to={'/'} className="navbar-brand">
                            <img id="home-icon" src="src/assets/icon.png" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <div id="nav-link-container">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item" id="nav-faq-link">
                                        <Link to={'/faq'} className="nav-link">
                                            FAQ
                                        </Link>
                                    </li>
                                    {LoggedIn && (<li
                                        className="nav-item"
                                        id="nav-mypage-link"
                                    >
                                        <Link
                                            to={'/mypage'}
                                            className="nav-link"
                                        >
                                            My page
                                        </Link>
                                    </li>)}
                                    <li className="nav-item" id="">
                                        <a className="nav-link" href="#">
                                            {LoggedIn ? (<LogoutButton />) : (<LoginButton />)}     
                                        </a>
                                    </li>
                                    {!LoggedIn && (<li className="nav-item" id="">
                                        <a className="nav-link" href="#">
                                            <SignupButton />
                                        </a>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
