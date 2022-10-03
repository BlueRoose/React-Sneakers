import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      const cartResponce = await axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/cart");
      const favoritesResponce = await axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/favorites");
      const itemsResponce = await axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/items");

      setisLoading(false);

      setCartItems(cartResponce.data);
      setFavoriteItems(favoritesResponce.data);
      setItems(itemsResponce.data);
      }

      fetchData();
    }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://632b4caf1aabd8373983f5fc.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    }
    else {
      axios.post("https://632b4caf1aabd8373983f5fc.mockapi.io/cart", obj);
      setCartItems(prev => [...prev, obj]);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favoriteItems.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://632b4caf1aabd8373983f5fc.mockapi.io/favorites/${obj.id}`);
    }
    else {
      const {data} = await axios.post("https://632b4caf1aabd8373983f5fc.mockapi.io/favorites", obj);
      setFavoriteItems((prev) => [...prev, obj]);
    }
    }
    catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onRevomeItem = (id) => {
    axios.delete(`https://632b4caf1aabd8373983f5fc.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id != id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened ? (
        <Drawer
          items={cartItems}
          onClickCross={() => setCartOpened(false)}
          onRemove={onRevomeItem}
        />
      ) : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
      <Route
          exact
          path="*"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              isLoading={isLoading}
            />
          }
        />
        <Route
          exact
          path="/favorites"
          element={
            <Favorites
              items={favoriteItems}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;