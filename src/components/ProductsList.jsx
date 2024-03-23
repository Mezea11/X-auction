const ProductsList = ({ products }) => {
  return (
    <div className="mockdataoutput">
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h6>{product.keywords.map((keyword) => "#" + keyword).join(" ")}</h6>
        </div>
      ))}
    </div>
  );
};
export default ProductsList;
