import ProductPageComponent from "../components/ProductPageComponent.jsx";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

function ProductPage() {
  return (
    <>
      <ProductPageComponent />
      <Footer position="fixed-bottom" />
      <ScrollToTopButton />
    </>
  );
}

export default ProductPage;
