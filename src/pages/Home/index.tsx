import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import api from "../../services/api";

import { ProductList } from "./styles";

import { formatPrice } from "../../utils/format";
import * as CartEvents from "../../store/modules/cart/actions";
import { ApplicationState } from "../../store";
import { IData, IProduct } from "../../store/modules/cart/types";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const state = useSelector<ApplicationState, IData[]>(
    state => state.cart.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const resp = await api.get<IProduct[]>("/products");

      const formattedData = resp.data.map(product => ({
        ...product,
        formattedPrice: formatPrice(product.price)
      }));

      setProducts(formattedData);
    }

    getProducts();
  }, []);

  function handleAddProduct(productId: number) {
    dispatch(CartEvents.addToCartRequest(productId));
  }

  function productAmount(productId: number) {
    const producIndex = state.findIndex(p => p.product.id === productId);

    if (producIndex >= 0) {
      return state[producIndex].amount;
    }
  }

  return (
    <ProductList>
      {products?.map(product => (
        <li key={String(product.id)}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdShoppingCart
                size={16}
                color="#fff"
                style={{ marginRight: 5 }}
              />
              {productAmount(product.id) || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
