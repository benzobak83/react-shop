import React from "react";

const ProductCard = (props) => {
  const {
    mainId,
    displayName,
    displayAssets,
    displayDescription,
    price,
    itemToCart = Function.prototype,
  } = props;
  let price_final = price.finalPrice;

  return (
    <div className="card product">
      <div className="card-image">
        <img src={displayAssets[0].full_background} />
      </div>
      <div className="card-content">
        <span className="card-title">{displayName}</span>
        <p>{displayDescription}</p>
      </div>
      <div className="card-action">
        <button
          className="btn"
          onClick={() => itemToCart({ mainId, displayName, price_final })}
        >
          Купить
        </button>
        <span className="right" style={{ fontSize: "20px" }}>
          {price_final} ₽
        </span>
      </div>
    </div>
  );
};

export { ProductCard };
