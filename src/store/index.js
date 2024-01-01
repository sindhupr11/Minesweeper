import { createStore } from 'redux';
import { rootReducer } from './modules';

const DEBUG = process.env.NODE_ENV === 'development';

export default createStore(
  rootReducer,
  DEBUG &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
