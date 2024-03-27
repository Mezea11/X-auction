import MyAuctionObjectCard from "./MyAuctionObjectCard.jsx";
//creates the list component for user owned products, which user owned product cards will populate
export default function MyAuctionObjectsList({ products, deleteProduct, userId }) {
  const filteredProducts = products.filter(product => product.userId === "2");//filter products to only show those where ueserId match active user
  
  return (
    <>
      {filteredProducts.length === 0 && "No Products"}
      {/* loops through products array from db an populates the Card-component with the array objects data */}
      {filteredProducts.map((product) => (
        <div key={product.id}>
          {/* adds deleteProduct function to each card, which was passed ass a prop */}
          <MyAuctionObjectCard {...product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </>
  );
}
