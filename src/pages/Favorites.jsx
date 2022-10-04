import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
  const {favoriteItems, onAddToCart, onAddToFavorite} = React.useContext(AppContext);

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Избранное</h1>
        </div>
        <div className="d-flex flex-wrap">
        {favoriteItems.map((item, index) => (
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