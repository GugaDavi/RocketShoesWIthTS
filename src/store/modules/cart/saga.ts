import React from "react";
import { toast } from "react-toastify";
import { call, select, put, all, takeLatest } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";
import { formatPrice } from "../../../utils/format";

import {
  ICartActionsTypes,
  UpdateAmountRequest,
  AddToCartRquest,
  IData
} from "./types";
import * as CartAction from "./actions";
import { ApplicationState } from "../..";

function* addToCart(action: AddToCartRquest) {
  const state: IData[] = yield select<(state: ApplicationState) => IData[]>(
    state => state.cart.products
  );

  const productIndex = state.findIndex(p => p.product.id === action.productId);

  if (productIndex >= 0) {
    const resp = yield call(api.get, `/stock/${action.productId}`);

    if (resp.data.amount > state[productIndex].amount) {
      yield put(
        CartAction.upDateAmountSuccess(
          ICartActionsTypes.ADD_AMOUNT,
          productIndex
        )
      );
    } else {
      toast.warn("Quandidade solicitada fora do estoque");
    }
  } else {
    const resp = yield call(api.get, `/products/${action.productId}`);

    yield put(
      CartAction.addToCartSuccess({
        product: resp.data,
        amount: 1,
        subtotal: formatPrice(resp.data.price)
      })
    );

    history.push("/cart");
  }
}

function* updateAmount(action: UpdateAmountRequest) {
  const state: IData[] = yield select<(state: ApplicationState) => IData[]>(
    state => state.cart.products
  );

  const productIndex = state.findIndex(p => p.product.id === action.productId);

  if (action.request === ICartActionsTypes.ADD_AMOUNT) {
    const resp = yield call(api.get, `/stock/${action.productId}`);

    if (resp.data.amount > state[productIndex].amount) {
      yield put(CartAction.upDateAmountSuccess(action.request, productIndex));
      return;
    }
    toast.warn("Quandidade solicitada fora do estoque");
  } else {
    if (state[productIndex].amount > 1) {
      yield put(CartAction.upDateAmountSuccess(action.request, productIndex));
      return;
    }
    toast.warn("Quandidade solicitada fora do estoque");
  }
}

export default all([
  takeLatest(ICartActionsTypes.ADD_CART_REQUEST, addToCart),
  takeLatest(ICartActionsTypes.UPDATE_AMOUNT_REQUEST, updateAmount)
]);
