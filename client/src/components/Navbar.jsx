//reviewed

import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import SignupButton from '../components/SignupButton.jsx';
import LoginButton from '../components/LoginButton.jsx';
import LogoutButton from './Logout.jsx';
import { Link } from 'react-router-dom';

function Navbar() {
    const { user } = useContext(GlobalContext);
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
                        <div id="nav-link-container">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item" id="nav-faq-link">
                                    <Link to={'/faq'} className="nav-link">
                                        FAQ
                                    </Link>
                                </li>
                                {user && (
                                    <li
                                        className="nav-item"
                                        id="nav-mypage-link"
                                    >
                                        <Link
                                            to={'/mypage'}
                                            className="nav-link"
                                        >
                                            My page
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item" id="">
                                    <a className="nav-link" href="#">
                                        {user ? (
                                            <LogoutButton />
                                        ) : (
                                            <LoginButton />
                                        )}
                                    </a>
                                </li>
                                {!user && (
                                    <li className="nav-item" id="">
                                        <a className="nav-link" href="#">
                                            <SignupButton />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
