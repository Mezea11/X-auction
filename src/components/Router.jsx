import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home.jsx"
import Navbar from "../components/Navbar.jsx"
import Mypage from "../pages/Mypage.jsx"

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
