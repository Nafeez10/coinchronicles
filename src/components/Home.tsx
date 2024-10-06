import { Box, Grid2, Typography } from "@mui/material";
import { useGetCryptoCoinsQuery } from "../api/cryptoApi";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import LocalConvenienceStoreSharpIcon from '@mui/icons-material/LocalConvenienceStoreSharp';
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import StatCard from "./StatCard";
import { globalStatsType } from "../api/cryptoApi";
import CryptoCurrencies from "./CryptoCurrencies";


const Home = () =>{

    const { data, isFetching, isError } = useGetCryptoCoinsQuery({
        count:1
    });

    const globalStats:(globalStatsType | undefined) = data?.data.stats;

    return(
        <>
            <div>
                <Box sx={{
                    width:"100%",
                    mt:"15vh"
                }}>
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize:"2rem",
                                fontWeight:"500",
                                textDecoration:"underline",
                                textUnderlineOffset:"5px",
                                lineHeight:'1.8',
                                color:"text.primary"
                        }}>Global Crypto Stats:</Typography>
                        <Grid2 sx={{mt:5,transition:".5s"}} container spacing={2} >
                            <StatCard isError={isError} isFetching={isFetching} title={'Total Sales'} value={globalStats?.total as string | number} icon={<TrendingUpRoundedIcon />} />
                            <StatCard isError={isError} isFetching={isFetching} title={'Total Exchanges'} value={globalStats?.totalExchanges as string | number} icon={<CurrencyExchangeRoundedIcon />} />
                            <StatCard isError={isError} isFetching={isFetching} title={'Total Market Cap'} value={Number(globalStats?.totalMarketCap)} icon={<SellRoundedIcon />} />
                            <StatCard isError={isError} isFetching={isFetching} title={'Total 24h Volume'} value={Number(globalStats?.total24hVolume)} icon={<LocalConvenienceStoreSharpIcon />} />
                            <StatCard isError={isError} isFetching={isFetching} title={'Total Markets'} value={globalStats?.totalMarkets as string | number} icon={<PublicSharpIcon />} />
                        </Grid2>
                    </Box> 
                </Box>
            </div>
            <Box sx={{mt:5}}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize:"2rem",
                        fontWeight:"500",
                        textDecoration:"underline",
                        textUnderlineOffset:"5px",
                        mb:3,
                        lineHeight:'1.8'
                }} >Top 10 Crypto Currencies:</Typography>
                <CryptoCurrencies limitToTen />
            </Box>
        </>
    )
}

export default Home;