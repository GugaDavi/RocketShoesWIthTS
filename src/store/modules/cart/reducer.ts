import produce from "immer";

import { IProductState, ICartActions, ICartActionsTypes } from "./types";

const INITIAL_STATE: IProductState = {
  products: []
};

const reducer = (state = INITIAL_STATE, action: ICartActions) => {
  switch (action.type) {
    case ICartActionsTypes.ADD_CART_SUCCESS:
      return produce(state, draft => {
        draft.products.push(action.product);
      });
    case ICartActionsTypes.REMOVE_FROM_CART_REQUEST:
      return produce(state, draft => {
        const producIndex = draft.products.findIndex(
          p => p.product.id === action.productId
        );

        draft.products.splice(producIndex, 1);
      });

    case ICartActionsTypes.UPDATE_AMOUNT_SUCCESS:
      return produce(state, draft => {
        if (action.request === ICartActionsTypes.ADD_AMOUNT) {
          draft.products[action.productIndex].amount += 1;
        } else {
          draft.products[action.productIndex].amount -= 1;
        }
      });
    default:
      return state;
  }
};

export default reducer;
