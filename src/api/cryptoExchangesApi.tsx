import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type exchangesDataType = {
    country: string;
    description: string;
    has_trading_incentive: Boolean
    id: string
    image: string;
    name: string;
    trade_volume_24h_btc: number;
    trade_volume_24h_btc_normalized: number;
    trust_score: number;
    trust_score_rank: number;
    url: string;
    year_established: number
}

const baseUrl = import.meta.env.VITE_COIN_GECKO_API_URL;

const headers = {
    'x-rapidapi-key': import.meta.env.VITE_COIN_GECKO_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_COIN_GECKO_API_HOST
}

const createUrl = (url:string) =>({url, headers});

const cryptoExchangesApi = createApi({
    reducerPath:"exchangesApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoExchanges : builder.query<exchangesDataType[],void>({
            query:()=> createUrl('/exchanges')
        })
    })
})

export const {
    useGetCryptoExchangesQuery
} = cryptoExchangesApi;

export default cryptoExchangesApi;