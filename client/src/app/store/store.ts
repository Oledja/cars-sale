import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { userAuthSlice } from "./reducers/UserSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    userAuthReducer: userAuthSlice.reducer,
});

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const persistedReduser = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReduser,
// });
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
    // return store;
};

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
