import { combineReducers } from "redux";
import { counterReducer, timerReducer } from "./counter/reducers";

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
};

export default combineReducers(reducers);
