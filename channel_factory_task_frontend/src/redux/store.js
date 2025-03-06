import { configureStore } from "@reduxjs/toolkit";
import distanceReducer from "./distanceSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// const store = configureStore({
//   reducer: {
//     distance: distanceReducer,
//   },
// });

const persistConfig = {
  key: "distance",
  storage,
};

const persistedDistanceReducer = persistReducer(persistConfig, distanceReducer);

const store = configureStore({
  reducer: {
    distance: persistedDistanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //  disable serializable check for Redux Persist
    }),
});

export const persistor = persistStore(store);

export default store;
