import { Typography, Box, Grid2, Stack, Skeleton, Card } from "@mui/material";
import { useParams } from "react-router";
import { coinsType, useGetCryptoCoinDetailsQuery } from "../api/cryptoApi";
import millify from "millify";
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import LocalConvenienceStoreOutlinedIcon from '@mui/icons-material/LocalConvenienceStoreOutlined';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import StatCard from "./StatCard";
import CryptoTimelineChart from "./CryptoTimelineChart";
import { ErrorSvg } from "../assets";
import { useSelector } from "react-redux";
import { getThemeState } from "../slices/themeSlice";

type linkObjectType = {
    name:string,
    url:string,
    type:string
}

const CurrencyPage = () =>{

    const { coinId } = useParams();

    const currentTheme = useSelector(getThemeState);

    const { data, isFetching, isError } = useGetCryptoCoinDetailsQuery(coinId);
    
    const coinDetails:coinsType = data?.data.coin;

    const tableBorderColor = currentTheme == "dark" ? "#3b3b3b" : "lightgrey";
    
    if(isFetching){
        return (
            <Box sx={{mt:"17vh"}}>
                <Stack spacing={1}>
                    <Skeleton animation="wave" width={"30%"} height={"40px"} />
                    <Skeleton animation="wave" width={"35%"} height={"40px"} />
                    <Grid2 spacing={2} container >
                        <Grid2 size={{xs:6,md:4}} >
                            <Skeleton animation="wave" height={"140px"} />
                        </Grid2>
                        <Grid2 size={{xs:6,md:4}} >
                            <Skeleton animation="wave" height={"140px"} />
                        </Grid2>
                        <Grid2 size={{xs:6,md:4}} >
                            <Skeleton animation="wave" height={"140px"} />
                        </Grid2>
                        <Grid2 size={{xs:6,md:4}} >
                            <Skeleton animation="wave" height={"140px"} />
                        </Grid2>
                        <Grid2 size={{xs:6,md:4}} >
                            <Skeleton animation="wave" height={"140px"} />
                        </Grid2>
                    </Grid2>
                </Stack>
            </Box>
        )
    }

    if(isError){
        return(
            <>
                <Box sx={{
                    mt:"17vh"
                }} className="error-svg-cont">
                        <Box sx={{
                            // width:{xs:"100%", md:"60vw", lg:"40vw",
                            width:{xs:"100%",sm:"60%", md:"40%", lg:"30%"}
                        }}>
                            <img className="error-svg" src={ErrorSvg} alt="" />
                    </Box>
                </Box>
            </>
        )
    }

    

    const coinStats = [
        { title: 'Price to USD', value: `$ ${coinDetails?.price && millify(Number(coinDetails?.price))}`, icon: <AttachMoneyRoundedIcon /> },
        { title: 'Rank', value: coinDetails?.rank, icon: <MilitaryTechRoundedIcon /> },
        { title: '24h Volume', value: `$ ${coinDetails?.["24hVolume"] && millify(Number(coinDetails?.["24hVolume"]))}`, icon: <LocalConvenienceStoreOutlinedIcon /> },
        { title: 'Market Cap', value: `$ ${coinDetails?.marketCap && millify(Number(coinDetails?.marketCap))}`, icon: <LocalOfferRoundedIcon /> },
        { title: 'All Time High', value: `$ ${coinDetails?.allTimeHigh?.price && millify(Number(coinDetails?.allTimeHigh?.price))}`, icon: <ShowChartRoundedIcon /> },
    ];
    
    const coinGenericStats = [
        { title: 'Number Of Markets', value: coinDetails?.numberOfMarkets, icon: <StoreRoundedIcon /> },
        { title: 'Number Of Exchanges', value: coinDetails?.numberOfExchanges, icon: <CurrencyExchangeRoundedIcon /> },
        { title: 'Aprroved Supply', value: coinDetails?.supply?.confirmed ? <TaskAltIcon /> : <CancelRoundedIcon />, icon: <VerifiedUserRoundedIcon /> },
        { title: 'Total Supply', value: `$ ${coinDetails?.supply?.total && millify(Number(coinDetails?.supply?.total))}`, icon: <AlignVerticalBottomIcon /> },
        { title: 'Circulating Supply', value: `$ ${coinDetails?.supply?.circulating && millify(Number(coinDetails?.supply?.circulating))}`, icon: <AnalyticsIcon /> },
    ];

    return(
        <>
            <Box sx={{
                mt:"17vh"
            }}>
                <Box sx={{
                    display:"flex",
                    alignItems:"center",
                    gap:"2rem"
                }}>
                    <Typography sx={{
                        fontSize:"2.5rem"
                    }} component="h2" variant="subtitle2" gutterBottom >
                        {coinDetails.name} :
                    </Typography>
                    <Box sx={{
                        width:"3rem"
                    }}>
                        <img style={{width:"100%"}} src={coinDetails.iconUrl} alt="" />
                    </Box>
                </Box>
                <Typography variant="h4">Coin Stats:</Typography>
                <Grid2 sx={{mt:2,pb:5,borderBottom:"1px solid lightgrey", borderColor:tableBorderColor}} container spacing={2} >
                    {
                        coinStats.map( (item,i) =>(
                            <StatCard key={i} detailsPage isFetching={isFetching} isError={isError} title={item.title} value={item.value} icon={item.icon} />
                        ))
                    }
                </Grid2>
                
                <Box>
                    <CryptoTimelineChart coinName={coinDetails.name} currentPrice={coinDetails.price} dailyChange={coinDetails.change} />
                </Box>
                <Box sx={{
                    display:"flex",
                    flexDirection:{xs:"column",lg:"row"}
                }} >
                    <Box sx={{flexGrow:1}}>
                        <Typography sx={{mt:5,textAlign:"center", fontFamily:"Playwrite CU, cursive",textDecoration:"underline"}} variant="h5">Other Statistics:</Typography>
                        <Box sx={{
                            width:"100%", mt:5,
                            display:"flex",alignItems:"center",justifyContent:"center"
                        }} >
                            <Stack sx={{
                                width:{xs:"100%", md:"50%", lg:"80%"},
                            }} spacing={2} >
                                {
                                    coinGenericStats.map( (item,i) =>(
                                        <StatCard key={i} detailsPage isFetching={isFetching} isError={isError} title={item.title} value={item.value} icon={item.icon} />
                                    ))
                                }
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{flexGrow:1}}>
                        <Typography sx={{mt:5,textAlign:"center", fontFamily:"Playwrite CU, cursive",textDecoration:"underline"}} variant="h5">Know More:</Typography>
                        <Box sx={{
                            width:"100%", mt:5,
                            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1
                        }}>
                            {
                                coinDetails.links.map( (item:linkObjectType,i:number) =>(
                                    <Card key={i} sx={{
                                        width:{xs:"100%", md:"50%", lg:"80%"},transition:".3s",
                                        ":hover":{
                                            opacity:.7,
                                            scale:1.03
                                        }
                                    }} variant="outlined">
                                        <a className="flex-center" href={item.url} target="_blank">
                                            <Typography>{item.name}</Typography>
                                            <Typography>{item.type == "website" ? coinDetails.name : item.type}</Typography>
                                        </a>
                                    </Card>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CurrencyPage;