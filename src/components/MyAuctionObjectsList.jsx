/* import MyAuctionObjectCard from "./MyAuctionObjectCard.jsx"

export default function MyAuctionObjectsList( { products }) {
    return (
    <div className="card">
      {products.length === 0 && "No Products"}
      {products.map(product => { 
        return (
            <MyAuctionObjectCard 
            {...product} //this line does the same as the three lines underneath
                //id={product.id}
                //title={product.title}
                key={product.id}
            />
        )
      })}
    </div>
    )
} */

import MyAuctionObjectCard from "./MyAuctionObjectCard.jsx";

export default function MyAuctionObjectsList({ products }) {
  return (
    <div className="card">
      {products.length === 0 && "No Products"}
      {products.map(product => (
        <div key={product.id}>
          <MyAuctionObjectCard {...product} />
        </div>
      ))}
    </div>
  );
}