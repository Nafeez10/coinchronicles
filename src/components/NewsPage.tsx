import { Box, Grid2 } from "@mui/material";
import { useGetCryptoNewsDataQuery } from "../api/cryptoNewsApi";
import NewsCard from "./NewsCard";
import { useState } from "react";
import NewsCardLoading from "./NewsCardLoading";
import { ErrorSvg } from "../assets";
import NewsSearchComp from "./NewsSearchComp";

type articleType = {
    date:string;
    title:string;
    url:string;
    publisher:{
        name:string;
        url:string;
        favicon:string;
    },
    excerpt:string;
    authors:string[];
    thumbnail:string;
}

const NewsPage = () =>{
    // I added in a way that the input to search only when any one of the option is selected
    // to avoid unnecessary searches thorugh the api.
    const [ coinNews, setCoinNews ] = useState<string>('');

    const { data, isFetching, isError } = useGetCryptoNewsDataQuery(coinNews || 'crypto')

    const newsData = data?.data;

    const newsInputChangeHandeler = (_:any,newInputValue:string | null) => setCoinNews(newInputValue!);

    const coinNewsCards = (
        <Grid2 container spacing={3}  >
            {
                newsData?.map( (article:articleType, i:number) =>(
                    <Grid2 key={i} sx={{p:{xs:2,md:0}}} size={{xs:12,md:6,lg:4}}>
                        <a href={article.url} target="_blank" >
                            <NewsCard
                                title={article.title}
                                thumbnailUrl={article.thumbnail}
                                description={article.excerpt}
                                publisherImgUrl={article.publisher.favicon}
                                PublisherName={article.publisher.name}
                                authors={article.authors}
                                publishedTime={article.date}
                            />
                        </a>
                    </Grid2>
                
                ))
            }
        </Grid2>
    )

    const LoadingCards = (
        <Grid2 container spacing={3}>
            {
                Array.from(Array(3)).map( (_,i) =>(
                    <Grid2 key={i} sx={{p:{xs:2,md:0}}} size={{xs:12,md:6,lg:4}} >
                        <NewsCardLoading />
                    </Grid2>
                ))
            }
        </Grid2>
    );

    const errorSvgMessage = (
        <div className="error-svg-cont">
                <Box sx={{
                    width:{xs:"100%", md:"60vw", lg:"40vw",
                }
                }}>
                    <img className="error-svg" src={ErrorSvg} alt="" />
            </Box>
        </div>
    );

    return( 
        <>
            <Box sx={{
                    mt:"18vh",mb:"5rem"
            }}>
                <Box sx={{width:"100%",mt:5, display:"flex", justifyContent:"center",mb:5}}>
                    <NewsSearchComp newsInputChangeHandeler={newsInputChangeHandeler} />
                </Box>
                {
                    isFetching ? LoadingCards : isError ? errorSvgMessage :  coinNewsCards
                }
            </Box>
        </>
    )
}

export default NewsPage;