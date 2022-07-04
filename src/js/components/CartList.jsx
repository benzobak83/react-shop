import React from "react";
import { CartItem } from "./CartItem.jsx";

const CartList = (props) => {
  const {
    orders = [],
    handleShowingCart = Function.prototype,
    totalSum,
    deleteOrder = Function.prototype,
    incrementItems = Function.prototype,
    decrementItems = Function.prototype,
  } = props;

  return (
    <ul className="collection cart-list">
      <li className="collection-item active">
        Корзина{" "}
        <i className="material-icons card-close" onClick={handleShowingCart}>
          close
        </i>
      </li>
      {orders.length ? (
        orders.map((order) => (
          <CartItem
            key={order.mainId}
            {...order}
            deleteOrder={deleteOrder}
            incrementItems={incrementItems}
            decrementItems={decrementItems}
          />
        ))
      ) : (
        <li className="collection-item">Корзина пуста :(</li>
      )}
      {orders.length ? (
        <li className="collection-item active">Общая сумма: {totalSum} ₽ </li>
      ) : (
        <li className="collection-item active"></li>
      )}
    </ul>
  );
};
export { CartList };
