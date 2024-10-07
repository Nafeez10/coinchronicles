import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts';
import { useGetCryptoCoinHistoryQuery } from '../api/cryptoApi';
import { useParams } from 'react-router';
import { Box, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent, Skeleton } from '@mui/material';
import millify from 'millify';
import { format } from 'date-fns'
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType } from '../app/store';
import { changechartTimeline, getChartTimelineState } from '../slices/chartTimeLineSlice';
import { getThemeState } from '../slices/themeSlice';


const AreaGradient = ({ color, id }: { color: string; id: string }) => {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

type propsType = {
    coinName:string;
    currentPrice:string;
    dailyChange:string
}

const CryptoTimelineChart = ({coinName, currentPrice, dailyChange}:propsType) => {

    const theme = useTheme();

    const { coinId } = useParams();

    const dispatch = useDispatch<dispatchType>();

    const currentTheme = useSelector(getThemeState);

    const textColor = currentTheme == "dark" ? "#fff" : "#000"

    const chartYear = useSelector(getChartTimelineState);

    const { data:historyData, isFetching, isError } = useGetCryptoCoinHistoryQuery({coinId, time:chartYear});

    const coinTimestamp = [];

    const coinPriceHistory = [];

    const loadingElement = (
        <Card variant="outlined" sx={{
            width:"100%",p:2
        }}>
            <Stack spacing={2}>
                <Skeleton animation="wave" width={"25%"} height={20} variant="rectangular" />
                <Skeleton animation="wave" width={"30%"} height={30} variant="rectangular" />
                <Skeleton animation="wave" width={"15%"} height={20} variant="rectangular" />
                <Skeleton animation="wave" width={"100%"} variant='rectangular' sx={{height:{xs:"230px",md:"300px",lg:"350px"}}} />
            </Stack>
        </Card>
    );

    for( let i=0; i < historyData?.data.history.length ; i++ ){
        if(chartYear == '24h'){
            coinTimestamp.push(format(new Date(historyData?.data?.history[i].timestamp * 1000),"p"));
        }else if(chartYear == '7d'){
            coinTimestamp.push(format(new Date(historyData?.data?.history[i].timestamp * 1000),"Pp"));
        }else{
            coinTimestamp.push(new Date(historyData?.data?.history[i].timestamp * 1000).toLocaleDateString());
        }
        
        coinPriceHistory.push(Number(historyData?.data?.history[i].price));
    }
    
    const coinChartTimeLine = ['24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const colorPalette = [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
    ];
    const handleChartYear = (event: SelectChangeEvent) => {
        dispatch(changechartTimeline(event.target.value));
    };
    
    const dailyChangeStat = dailyChange?.includes('-');

    const coinDetailsChart = (
        <>
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Current {coinName} Price
                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                        alignContent: { xs: 'center', sm: 'flex-start' },
                        alignItems: 'center',
                        gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            ${millify(Number(currentPrice))}
                        </Typography>
                        <Chip size="small" color={dailyChangeStat ? "error" : "success"} label={`${dailyChangeStat ? '' : !dailyChange ? "" : '+'}${dailyChange ? `${dailyChange}%` : "No info"}`} />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Price for the last {chartYear}.
                    </Typography>
                    </Stack>
                    <Box sx={{height:{xs:"230px",md:"300px",lg:"350px"}}}>
                        <LineChart
                            colors={colorPalette}
                            xAxis={[
                                {
                                    scaleType: 'point',
                                    data:coinTimestamp.reverse(),
                                    tickInterval: (_, i) => (i + 10) % 5 === 0,
                                    
                                },
                            ]}
                            // dataset={[{
                            //     data:coinTimestamp
                            // }]}
                            series={[
                                {
                                    id: 'direct',
                                    label: '$',
                                    showMark: false,
                                    curve: 'linear',
                                    stack: 'total',
                                    area: true,
                                    stackOrder: 'ascending',
                                    data: coinPriceHistory,
                                    
                                }
                            ]}
                            // height={"100%"}
                            margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                            grid={{ horizontal: true }}
                            sx={{
                                '& .MuiAreaElement-series-organic': {
                                fill: "url('#organic')",
                                },
                                '& .MuiAreaElement-series-referral': {
                                fill: "url('#referral')",
                                },
                                '& .MuiAreaElement-series-direct': {
                                fill: "url('#direct')",
                                },
                            }}
                            slotProps={{
                                legend: {
                                    hidden: true,
                                },
                            }}
                            
                        >
                            <AreaGradient color={theme.palette.primary.dark} id="organic" />
                            <AreaGradient color={theme.palette.primary.main} id="referral" />
                            <AreaGradient color={theme.palette.primary.light} id="direct" />
                        </LineChart>
                    </Box>
                </CardContent>
            </Card>
        </>
    )

    const errorElement = (
        <>
            <Card variant="outlined" sx={{
                width:"100%", p:2, height:"350px", bgcolor:"rgb(255, 181, 181)", display:"flex"
                ,alignItems:"center", justifyContent:"center"
            }}>
                <Box sx={{color:"rgb(105, 11, 11)", display:"flex",alignItems:"center", gap:".5rem"}}>
                    <ErrorIcon />
                    <Typography variant="body1">Something went wrong!</Typography>
                </Box>
            </Card>
        </>
    )

    return (
        <>
            <Box sx={{width:"100%",mt:5, display:"flex", justifyContent:"center"}}>
                    <FormControl color='info' sx={{
                        width: {xs:"100%",md:"70%", lg:"50%" }, mb:4,bgcolor:"background.paper" , color:textColor, 
                    }} >
                        <InputLabel color='info' id="demo-simple-select-label">TimeLine</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chartYear}
                            label="Timeline"
                            onChange={handleChartYear}
                            sx={{borderColor:"formColor.main",border:"2px"}}
                        >
                            {
                                coinChartTimeLine.map( year =>(
                                    <MenuItem key={year} value={year} >{year}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
            </Box>
            {
                isFetching ? loadingElement : isError ? errorElement : coinDetailsChart
                

            }
        </>
    );
}

export default CryptoTimelineChart;