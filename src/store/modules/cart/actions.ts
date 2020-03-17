import { IData, ICartActionsTypes, ICartActions } from "./types";

export function addToCartRequest(productId: number): ICartActions {
  return {
    type: ICartActionsTypes.ADD_CART_REQUEST,
    productId
  };
}

export function addToCartSuccess(product: IData): ICartActions {
  return {
    type: ICartActionsTypes.ADD_CART_SUCCESS,
    product
  };
}

export function removeFromCartRequest(productId: number): ICartActions {
  return {
    type: ICartActionsTypes.REMOVE_FROM_CART_REQUEST,
    productId
  };
}

export function upDateAmountRequest(
  request: ICartActionsTypes.ADD_AMOUNT | ICartActionsTypes.SUB_AMOUNT,
  productId: number
): ICartActions {
  return {
    type: ICartActionsTypes.UPDATE_AMOUNT_REQUEST,
    productId,
    request
  };
}

export function upDateAmountSuccess(
  request: ICartActionsTypes.ADD_AMOUNT | ICartActionsTypes.SUB_AMOUNT,
  productIndex: number
): ICartActions {
  return {
    type: ICartActionsTypes.UPDATE_AMOUNT_SUCCESS,
    request,
    productIndex
  };
}
