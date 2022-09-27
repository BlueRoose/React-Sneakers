import Card from "../components/Card";

function Favorites({items, onAddToCart, onAddToFavorite}) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Избранное</h1>
        </div>
        <div className="d-flex flex-wrap">
        {items.map((item, index) => (
            <Card
              key={index}
              inFavorite={true}
              onPlus={(obj) => onAddToCart(obj)}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))}
        </div>
      </div>
    );
}

export default Favorites;