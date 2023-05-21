import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/user";
import tasksReducer from "./slices/tasks";

const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;