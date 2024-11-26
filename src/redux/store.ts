import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
