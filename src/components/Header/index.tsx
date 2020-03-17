import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import { Container, Cart } from "./styles";
import logo from "../../assets/images/logo.svg";
import { ApplicationState } from "../../store";
import { useSelector } from "react-redux";

export default function Header() {
  const productLength = useSelector<ApplicationState, number>(
    state => state.cart.products.length
  );
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketSoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{productLength} items</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}
