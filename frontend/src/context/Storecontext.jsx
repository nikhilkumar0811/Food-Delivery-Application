import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const storeContext = createContext(null);

const storeContextProvider = (props) => {
  const [cartItems, setcartItem] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setcartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default storeContextProvider;
