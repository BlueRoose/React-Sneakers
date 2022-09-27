import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/" exact>
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li>
          <img
            className="cu-p mr-15"
            onClick={props.onClickCart}
            width={18}
            height={18}
            src="/img/cart.svg"
            alt="logo"
          />
        </li>
        <li>
          <Link to="/favorites">
          <img
            className="cu-p mr-15"
            width={18}
            height={18}
            src="/img/favorites.svg"
            alt="favorites"
          />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="logo" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
