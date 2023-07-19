import rootReducer from "./store/reducer/rootReducer";
import { persistStore } from "redux-persist";
import { applyMiddleware, createStore ,configureStore} from "redux";    
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const reduxStore = () => {
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk))) // add middware later
    const persistor = persistStore(store)

    return {store,persistor}
}
export default reduxStore;