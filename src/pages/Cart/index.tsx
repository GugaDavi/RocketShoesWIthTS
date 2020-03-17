import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from "react-icons/md";

import { Container, ProductList, Total } from "./styles";
import { ApplicationState } from "../../store";
import { IData, ICartActionsTypes } from "../../store/modules/cart/types";
import * as CartEvents from "../../store/modules/cart/actions";
import { formatPrice } from "../../utils/format";

export default function Cart() {
  const dispatch = useDispatch();
  const state: IData[] = useSelector<ApplicationState, IData[]>(
    state => state.cart.products
  );

  const cartList: IData[] = state.map(product => ({
    ...product,
    subtotal: formatPrice(product.amount * product.product.price)
  }));

  const total = formatPrice(
    cartList.reduce((total, product) => {
      return total + product.product.price * product.amount;
    }, 0)
  );

  function handleRemoveFromCart(id: number) {
    dispatch(CartEvents.removeFromCartRequest(id));
  }

  function handleUpdateAmount(
    event: ICartActionsTypes.ADD_AMOUNT | ICartActionsTypes.SUB_AMOUNT,
    id: number
  ) {
    dispatch(CartEvents.upDateAmountRequest(event, id));
  }

  return (
    <Container>
      <ProductList>
        <thead>
          <tr>
            <th></th>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartList.map(cartItem => (
            <tr key={cartItem.product.id}>
              <td>
                <img src={cartItem.product.image} alt="Tenis" />
              </td>
              <td>
                <strong>{cartItem.product.title}</strong>
                <span>{cartItem.product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button
                    onClick={() =>
                      handleUpdateAmount(
                        ICartActionsTypes.SUB_AMOUNT,
                        cartItem.product.id
                      )
                    }
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={cartItem.amount} />
                  <button
                    onClick={() =>
                      handleUpdateAmount(
                        ICartActionsTypes.ADD_AMOUNT,
                        cartItem.product.id
                      )
                    }
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{cartItem.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(cartItem.product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductList>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
