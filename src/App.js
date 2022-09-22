import React from "react";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://632b4caf1aabd8373983f5fc.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
      setCartItems([...cartItems, obj]);
  };

  const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClickCross={() => setCartOpened(false)} /> : null}
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
