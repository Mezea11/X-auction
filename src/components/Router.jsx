import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Navbar from '../components/Navbar.jsx';
import Faq from '../pages/Faq.jsx';
import Mypage from '../pages/Mypage.jsx';
import ProductPageComponent from './ProductPageComponent.jsx';
import SearchPage from '../pages/SearchPage.jsx';

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route
                    path="/ProductPage/:productId"
                    element={<ProductPageComponent />}
                />
                <Route path="/searchPage" element={<SearchPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
