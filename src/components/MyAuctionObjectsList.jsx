import MyAuctionObjectCard from "./MyAuctionObjectCard.jsx";

export default function MyAuctionObjectsList({ products, deleteProduct }) {
  return (
    <>
      {products.length === 0 && "No Products"}
      {products.map((product) => (
        <div key={product.id}>
          <MyAuctionObjectCard {...product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </>
  );
}
