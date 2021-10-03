import { createStore, applyMiddleware } from "redux";
//import placeholderReducer from './placeholderReducer'
//import { ThunkMiddleware } from "redux-thunk";
import { createLogger } from "redux-logger";

const store = createStore(
  //placeholderReducer,
  applyMiddleware(
    //ThunkMiddleware,
    createLogger()
  )
)

export default store
