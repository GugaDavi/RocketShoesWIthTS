import { combineReducers } from "redux";

import cart from "./cart/reducer";

const rootReducers = combineReducers({
  cart
});

export default rootReducers;
