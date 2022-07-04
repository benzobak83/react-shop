import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "./config.js";
import { ProductsList } from "./ProductsList.jsx";
import { Preloader } from "./Preloader.jsx";
import { Cart } from "./Cart.jsx";
import { CartList } from "./CartList.jsx";
import { Alert } from "./Alert.jsx";

function Main() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isShowingCart, setIsShowingCart] = useState(false);
  const [alertName, setAlertName] = useState("");
  let totalSum;

  if (orders.length) {
    totalSum = orders.reduce((acc, el) => {
      return acc + el.price_final * el.quanity;
    }, 0);
  }

  const itemToCart = (itemName) => {
    const itemIndex = orders.findIndex(
      (item) => item.mainId == itemName.mainId
    );

    if (itemIndex < 0) {
      let newItem = {
        ...itemName,
        quanity: 1,
      };
      setOrders([...orders, newItem]);
    } else {
      let newOrder = orders.map((order, index) => {
        if (itemIndex === index)
          return {
            ...order,
            quanity: +order.quanity + 1,
          };
        else return order;
      });
      setOrders([...newOrder]);
    }
    setAlertName(itemName.displayName);
  };

  const handleShowingCart = () => {
    setIsShowingCart(!isShowingCart);
  };
  const deleteOrder = (event, id) => {
    const newOrder = orders.filter((order) => {
      return order.mainId != id;
    });
    if (event.target.classList.contains("item-delete"))
      event.target.parentNode.parentNode.classList.add("item-animation-out");
    else event.target.parentNode.classList.add("item-animation-out");

    setTimeout(() => setOrders([...newOrder]), 300);
  };
  const incrementItems = (id) => {
    const newOrder = orders.map((item) => {
      if (item.mainId === id) return { ...item, quanity: item.quanity + 1 };
      else return item;
    });
    setOrders(newOrder);
  };
  const decrementItems = (event, id, quanity) => {
    if (quanity <= 1) {
      deleteOrder(event, id);
    } else {
      const newOrder = orders.map((item) => {
        if (item.mainId === id) return { ...item, quanity: item.quanity - 1 };
        else return item;
      });
      setOrders(newOrder);
    }
  };
  const closeAlert = () => {
    setAlertName("");
  };

  useEffect(function getProducts() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        data.shop && setProducts(data.shop);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="content container">
      <Cart quantity={orders.length} handleShowingCart={handleShowingCart} />
      {isLoading ? (
        <Preloader />
      ) : (
        <ProductsList products={products} itemToCart={itemToCart} />
      )}
      {isShowingCart && (
        <CartList
          orders={orders}
          handleShowingCart={handleShowingCart}
          totalSum={totalSum}
          deleteOrder={deleteOrder}
          incrementItems={incrementItems}
          decrementItems={decrementItems}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </div>
  );
}
export { Main };
