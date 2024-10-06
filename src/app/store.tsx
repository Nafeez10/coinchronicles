import { configureStore } from "@reduxjs/toolkit";
import cryptoApi from "../api/cryptoApi";
import cryptoNewsApi from "../api/cryptoNewsApi";
import cryptoExchangesApi from "../api/cryptoExchangesApi";
import themeSlice from "../slices/themeSlice";
import chartTimeLineSlice from "../slices/chartTimeLineSlice";

const store = configureStore({
    reducer:{
        theme:themeSlice.reducer,
        chartTimeline:chartTimeLineSlice.reducer,
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
        [cryptoExchangesApi.reducerPath]:cryptoExchangesApi.reducer
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
            .concat(
                cryptoApi.middleware,
                cryptoNewsApi.middleware,
                cryptoExchangesApi.middleware
            )

})

export type RootState = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;

export default store;