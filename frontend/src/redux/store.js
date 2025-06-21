import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.js";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// redux-persist의 설정 객체를 정의합니다.
const persistConfig = {
  key: "root", // persist된 상태를 저장할 루트 키를 설정합니다.
  storage, // 상태를 저장할 스토리지를 지정합니다. 여기서는 localStorage를 사용합니다.
  whitelist: ["auth"], // 영속적으로 저장할 리듀서(슬라이스)를 지정합니다. 여기서는 "logIn" 슬라이스만 저장됩니다.
};

// persistReducer를 사용하여 루트 리듀서를 감싸 persistConfig 설정을 적용합니다.
// 이를 통해 지정한 슬라이스의 상태만 영속적으로 저장됩니다.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux 스토어를 구성합니다.
const store = configureStore({
  reducer: persistedReducer, // 영속성을 적용한 리듀서를 스토어에 추가합니다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist가 사용하는 특정 액션 타입을 무시하도록 설정하여 직렬화 검사에서 제외합니다.
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(thunk), // 기본 미들웨어에 redux-thunk를 추가하여 비동기 작업을 처리할 수 있게 합니다.
});

// Persistor 객체를 생성합니다.
// persistor는 스토어의 상태를 persist 설정에 따라 영속적으로 관리합니다.
export const persistor = persistStore(store);

// 구성된 스토어를 기본으로 내보냅니다.
export default store;
