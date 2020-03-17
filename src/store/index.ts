import { createStore, Store, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import { IProductState } from "./modules/cart/types";

const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
  cart: IProductState;
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
