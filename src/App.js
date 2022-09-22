import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => { 
      axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/items").then((res) => {
        setItems(res.data);
      })
      axios.get("https://632b4caf1aabd8373983f5fc.mockapi.io/cart").then((res) => {
        setCartItems(res.data);
      })
  }, []);

  const onAddToCart = (obj) => {
      axios.post("https://632b4caf1aabd8373983f5fc.mockapi.io/cart", obj);
      setCartItems([...cartItems, obj]);
  };

  const onRevomeItem = (id) => {
    axios.delete(`https://632b4caf1aabd8373983f5fc.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id != id));
  }

  const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClickCross={() => setCartOpened(false)} onRemove={onRevomeItem} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            <input onChange={onChangeSearchInput} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
            <Card
              key={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log("Добавили в закладки")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
