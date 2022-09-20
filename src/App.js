import React from 'react';
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
  { name: "Кроссовки Nike Blazer Mid Suede", price: 12999, imageURL: "/img/sneakers/1.png"},
  { name: "Кроссовки Nike Blazer Mid Suede", price: 12999, imageURL: "/img/sneakers/3.jpg"},
  { name: "Кроссовки Nike Air Max 270", price: 11999, imageURL: "/img/sneakers/2.jpg"},
  { name: "Кроссовки Puma X Aka Boku Future Rider", price: 8999, imageURL: "/img/sneakers/4.jpg"},
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex justify-between">
          {arr.map((obj) => (
            <Card
            title={obj.name}
            price={obj.price}
            imageURL={obj.imageURL}
            onFavorite={() => console.log("Добавили в закладки")}
            onPlus={() => console.log("Нажали плюс")}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;