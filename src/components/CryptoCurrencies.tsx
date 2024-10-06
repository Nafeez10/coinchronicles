import { useEffect, useState } from "react";
import { coinsType, useGetCryptoCoinsQuery } from "../api/cryptoApi";
import { Link } from "react-router-dom";
import { Box, Grid2, Pagination, Typography } from "@mui/material";
import CryptoCard from "./CryptoCard";
import { ErrorSvg } from "../assets";
import SearchCoinComp from "./SearchCoinComp";


type propsType = {
    limitToTen?:Boolean
}

const CryptoCurrencies = ({ limitToTen }:propsType) =>{

    const [ page, setPage ] = useState<number>(1);
    const [ offsetData, setOffsetData ] = useState<number>(0);
    const { data, isFetching, isError, isSuccess } = useGetCryptoCoinsQuery({
        count:10,
        offset:offsetData
    });
    const [ cryptoCoins, setCryptoCoins ] = useState<coinsType[]>( [] as coinsType[] );

    useEffect(()=>{
        if(isSuccess && data){
            setCryptoCoins(data?.data.coins);
        }
    },[isSuccess,data])

    if(isFetching){
        return (
            <Box sx={{
                height:"200px"
            }}>
                <div style={{
                    marginTop:!limitToTen ? "17vh" : ""
                }} className="loader">
                    
                </div>
            </Box>
        )
    }

    if(isError){

        return (
            <div style={{
                marginTop:!limitToTen ? "17vh" : ""
            }} className="error-svg-cont">
                <Box sx={{
                    width:{xs:"100%",sm:"60%", md:"40%", lg:"30%"}
                }}>
                    <img className="error-svg" src={ErrorSvg} alt="" />
                </Box>
            </div>
        )
    }

    const handlePagination = (currentPage:number) =>{
        if(currentPage < 101 ){
            setPage(currentPage);
            setOffsetData(Number(`${currentPage}0`) - 10);
        }

    }

    return(
        <>
            <Box
                sx={{
                    mt: !limitToTen ? "17vh" : ""
                }}
            >
                {
                    !limitToTen ?
                        <Box>
                            <SearchCoinComp />
                        </Box>
                        :
                        <></>
                }
                {
                    <Grid2 container>
                        {
                            cryptoCoins.map((coin)=>(
                                <Grid2 key={coin.uuid}  size={{xs:12, md:6, lg:4 }} >
                                    <Link to={`/cryptocurrencies/${coin.uuid}`}>
                                        <CryptoCard
                                            coinPrice={coin.price}
                                            coinRank={coin.rank}
                                            coinName={coin.name}
                                            coinIcon={coin.iconUrl}
                                            marketCap={coin.marketCap}
                                            dailyChange={coin.change}
                                            limitToTen={limitToTen}
                                        />
                                    </Link> 
                                </Grid2>
                                
                            ))
                        }
                        {
                            !cryptoCoins.length && <Typography sx={{textAlign:"center", width:"100%"}} >No more coins Data available.</Typography>
                        }
                    </Grid2>
                }
                {
                    !limitToTen ? 
                        <Box sx={{
                            mb:10,mt:5,display:"flex",justifyContent:"center"
                        }}>
                            <Pagination color="secondary" onChange={(_,currentPage)=>handlePagination(currentPage)} page={page} size="large" count={100} defaultPage={1} siblingCount={1} />
                        </Box>
                        :
                        <></>
                }
            </Box>
        </>
    )
}

export default CryptoCurrencies;