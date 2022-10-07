import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponce, favoritesResponce, itemsResponce] =
          await Promise.all([
            axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/cart"),
            axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/favorites"),
            axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/items"),
          ]);
        setIsLoading(false);
        setCartItems(cartResponce.data);
        setFavoriteItems(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert("Ошибка при запросе данных :(");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://632b4caf1aabd8373983f5fc.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://632b4caf1aabd8373983f5fc.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (
        favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))
      ) {
        axios.delete(
          `https://632b4caf1aabd8373983f5fc.mockapi.io/favorites/${obj.id}`
        );
        setFavoriteItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://632b4caf1aabd8373983f5fc.mockapi.io/favorites",
          obj
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onRevomeItem = (id) => {
    axios.delete(`https://632b4caf1aabd8373983f5fc.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const isItemLiked = (id) => {
    return favoriteItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoriteItems,
        isItemAdded,
        isItemLiked,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClickCross={() => setCartOpened(false)}
            onRemove={onRevomeItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            exact
            path="*"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                favoriteItems={favoriteItems}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }
          />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;