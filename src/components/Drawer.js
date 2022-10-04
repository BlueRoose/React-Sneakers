import React from 'react';
import axios from 'axios';

import Info from './Info';
import AppContext from '../context';

function Drawer({ onClickCross, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
      setIsLoading(true);
      const { data } = await axios.post('https://632b4caf1aabd8373983f5fc.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://632b4caf1aabd8373983f5fc.mockapi.io/cart/' + item.id);
      }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
      <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClickCross} className="cu-p" src="/img/cross.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
          <div className="items">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img
                onClick={() => onRemove(obj.id)}
                className="removeBtn"
                src="/img/cross.svg"
                alt="Remove"
              />
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб. </b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб. </b>
            </li>
          </ul>
          <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пуста'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? '/img/ordered.png' : '/img/empty.png'}
          />
        )}
      </div>
    </div>
      );
    }
    export default Drawer;