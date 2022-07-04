const Cart = (props) => {
  const { quantity = 0, handleShowingCart = Function.prototype } = props;

  return (
    <div
      className="cart indigo darken-1 white-text"
      onClick={handleShowingCart}
    >
      <i className="material-icons cart__icon">shopping_cart</i>
      <span className="cart__quantity">{quantity ? quantity : null}</span>
    </div>
  );
};
export { Cart };
