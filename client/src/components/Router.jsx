import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Navbar from '../components/Navbar.jsx';
import Faq from '../pages/Faq.jsx';
import Mypage from '../pages/Mypage.jsx';
import ProductPageComponent from './ProductPageComponent.jsx';
import PlaceBidFunction from './PlaceBidFunction.jsx';
import LoginForm from './LoginForm.jsx';
import ProtectedRoute from '../validation/ProtectedRoute.jsx';
import ProductPage from '../pages/ProductPage.jsx';

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<Faq />} />
                <Route
                    path="/mypage"
                    element={
                        <ProtectedRoute>
                            <Mypage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/Productpage/:productId"
                    element={<ProductPage />}
                />
                <Route
                    path="/place-bid/:productId"
                    element={<PlaceBidFunction />}
                />
                <Route path="/login/:userId" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
