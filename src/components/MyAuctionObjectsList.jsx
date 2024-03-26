import MyAuctionObjectCard from "./MyAuctionObjectCard.jsx";

export default function MyAuctionObjectsList({ products, deleteProduct, userId }) {
  const filteredProducts = products.filter(product => product.userId === "2");
  
  return (
    <>
      {filteredProducts.length === 0 && "No Products"}
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <MyAuctionObjectCard {...product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </>
  );
}
