import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = import.meta.env.VITE_NEWS_API_URL;

const headers = {
    'x-rapidapi-key': import.meta.env.VITE_NEWS_API_KEY ,
    'x-rapidapi-host': import.meta.env.VITE_NEWS_API_HOST
}

const createUrl = (url:string) => ({url, headers});

const cryptoNewsApi = createApi({
    reducerPath:"newsApi",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNewsData : builder.query({
            query:(queryInput)=>createUrl(`/articles?query=${queryInput}&language=en&limit=10`)
        }) 
    })
})

export const {
    useGetCryptoNewsDataQuery
} = cryptoNewsApi;

export default cryptoNewsApi;