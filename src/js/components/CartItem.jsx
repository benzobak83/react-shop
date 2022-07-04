import React from "react";

const CartItem = ({
  mainId,
  displayName,
  price_final,
  quanity,
  deleteOrder = Function.prototype,
  incrementItems = Function.prototype,
  decrementItems = Function.prototype,
}) => {
  return (
    <li className="collection-item item-animation" key={mainId}>
      {displayName}{" "}
      <i
        className="material-icons items-controller remove"
        onClick={(event) => decrementItems(event, mainId, quanity)}
      >
        remove
      </i>{" "}
      {quanity}шт.{" "}
      <i
        className="material-icons items-controller plus"
        onClick={() => incrementItems(mainId)}
      >
        add
      </i>{" "}
      {price_final * quanity}₽{" "}
      <span className="secondary-content">
        <i
          className="material-icons item-delete"
          onClick={(event) => deleteOrder(event, mainId)}
        >
          close
        </i>
      </span>
    </li>
  );
};
export { CartItem };
