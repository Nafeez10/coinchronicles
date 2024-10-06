import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type globalStatsType = {
    total:number;
    total24hVolume:string;
    totalCoins: number;
    totalExchanges:number;
    totalMarketCap:string;
    totalMarkets:number

}

export type coinsType = {
    [key:string]:string | number | Boolean | number[] | any;
    "24hVolume": string,
    btcPrice:string
    change:string
    coinrankingUrl:string;
    color:string;
    iconUrl:string
    listedAt:number
    lowVolume:Boolean
    marketCap:string
    name:string
    price:string
    rank:number
    sparkline:number[]
    symbol:string
    tier:number
    uuid:string
}

type dataType = {
    data:{
        coins:coinsType[];
        stats:globalStatsType;
    };
    status:string
}

const baseUrl = import.meta.env.VITE_CRYPTO_API_URL;

const headers = {
    'x-rapidapi-key': import.meta.env.VITE_CRYPTO_API_X_KEY,
    'x-rapidapi-host': import.meta.env.VITE_CRYPTO_API_X_HOST
};

const createUrl = (url:string) => ({url, headers});

const cryptoApi = createApi({
    reducerPath:"cryptoAi",
    baseQuery:fetchBaseQuery({baseUrl}),
    // since we are not going to have any mutation query we dont need tagTypes.
    endpoints:(builder)=>({
        getCryptoCoins:builder.query<dataType,{count:number;offset?:number}>({
            query:({count, offset = 0})=> createUrl(`coins?limit=${count}&offset=${offset}`)
        }),
        getCryptoCoinDetails:builder.query({
            query:(coinId)=>createUrl(`coin/${coinId}`)
        }),
        getCryptoCoinHistory:builder.query({
            query:({coinId,time})=>createUrl(`/coin/${coinId}/history?timePeriod=${time}`)
        }),
        getSearchCryptoCoins:builder.query({
            query:(search)=>createUrl(`coins?search=${search}`)
        })
    })  
}) 

export const {
    useGetCryptoCoinsQuery,
    useGetCryptoCoinDetailsQuery,
    useGetCryptoCoinHistoryQuery,
    useGetSearchCryptoCoinsQuery
} = cryptoApi

export default cryptoApi;