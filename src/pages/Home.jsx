import Card from "../components/Card";

function Home({items, cartItems, onAddToFavorite, onAddToCart, searchValue, onChangeSearchInput, isLoading}) {

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

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
          {renderItems()}
        </div>
      </div>
  );
}

export default Home;