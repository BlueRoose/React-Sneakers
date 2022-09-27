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
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://632b4caf1aabd8373983f5fc.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://632b4caf1aabd8373983f5fc.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
      axios
      .get("https://632b4caf1aabd8373983f5fc.mockapi.io/favorites")
      .then((res) => {
        setFavoriteItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://632b4caf1aabd8373983f5fc.mockapi.io/cart", obj);
    setCartItems([...cartItems, obj]);
  };

  const onAddToFavorite = (obj) => {
    if (favoriteItems.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://632b4caf1aabd8373983f5fc.mockapi.io/favorites/${obj.id}`);
      setFavoriteItems((prev) => prev.filter((item) => item.id !== obj.id)); 
    }
    else {
      axios.post("https://632b4caf1aabd8373983f5fc.mockapi.io/favorites", obj);
      setFavoriteItems([...favoriteItems, obj]);
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
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
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
