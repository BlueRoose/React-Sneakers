import React from "react";
import styles from "./Card.module.scss";

function Card({title, price, imageUrl, onFavorite, onPlus}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({title, price, imageUrl});
    setIsAdded(!isAdded);
  }

  const onClickLike = () => {
    onFavorite({title, price, imageUrl});
    setIsFavorite(!isFavorite);
  }

    return (
        <div className={styles.card}>
  <div className={styles.favorite} onClick={onFavorite}>
    <img onClick={onClickLike} src={isFavorite ? "/img/like1.svg" : "/img/like0.svg"} alt="like0" />
  </div>
  <img width={133} height={112} src={imageUrl} alt="Sneakers" />
  <h5>{title}</h5>
  <div className="d-flex justify-between align-center">
    <div className="d-flex flex-column">
      <span>Цена: </span>
      <b>{price} руб.</b>
    </div>
      <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/galka.svg" : "/img/galka0.svg"} alt="plus" />
  </div>
</div>
    );
}

export default Card;