import Card from "../components/Card";

function Home({items, onAddToFavorite, onAddToCart, searchValue, onChangeSearchInput}) {
    return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="search" />
            <input onChange={onChangeSearchInput} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          ))}
        </div>
      </div>
    );
}

export default Home;