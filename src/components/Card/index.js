import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({id, title, price, imageUrl, onFavorite, onPlus, inFavorite = false, inCart = false, loading = false}) {
  const [isAdded, setIsAdded] = React.useState(inCart);
  const [isFavorite, setIsFavorite] = React.useState(inFavorite);

  const onClickPlus = () => {
    onPlus({id, title, price, imageUrl});
    setIsAdded(!isAdded);
  }

  const onClickLike = () => {
    onFavorite({id, title, price, imageUrl});
    setIsFavorite(!isFavorite);
  }

    return (
    <div className={styles.card}>
      {
        loading ? 
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> : 
        <>
        <div className={styles.favorite} onClick={onFavorite}>
          <img onClick={onClickLike} src={isFavorite ? "/img/like1.svg" : "/img/like0.svg"} alt="like0" />
        </div>
        <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена: </span>
            <b>{price} руб.</b>
          </div>
          <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/galka.svg" : "/img/galka0.svg"} alt="plus" />
        </div>
        </>
      }
    </div>
    );
}

export default Card;