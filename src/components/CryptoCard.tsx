import { Button, Paper, Typography } from "@mui/material";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import millify from "millify";

type propsType = {
    coinRank:number,
    coinPrice:string;
    coinName:string,
    coinIcon:string,
    marketCap:string,
    dailyChange:string;
    limitToTen:Boolean | undefined;
}

const CryptoCard = ({coinPrice, coinRank, coinName, coinIcon, marketCap, dailyChange, limitToTen}:propsType) =>{

    return(
        <>
            <Button sx={{
                width:"100%",transition:".2s",
                ":hover":{
                    scale:1.03
                }
            }} >
                    <Paper elevation={3} sx={{
                        p:2,
                        width:'100%',
                        textTransform:"initial",
                        bgcolor:'myColor.main',
                        color:"white"
                    }}>
                        <div className="crypto-card-header">
                            <Typography variant="h4" sx={{
                                fontFamily:"sans-serif",
                                fontSize:"2rem",
                                textAlign:"left",
                                width:"80%",
                                // textWrap:"nowrap",
                                textOverflow:"ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",

                            }} >
                                { limitToTen ? <span>{coinRank}.</span> : <></> }
                                <span>{coinName}</span>
                            </Typography>
                            <div className="crypto-card-img-cont" >
                                <img className="w" src={coinIcon} alt="" />
                            </div>
                        </div>
                        <Typography sx={{
                            textAlign:"left",
                            fontSize:"1.5rem",
                            mt:1,                            
                        }} variant="h5">
                            ${millify(Number(coinPrice))}
                        </Typography>
                        <Typography sx={{
                            textAlign:"left",
                            fontSize:"1rem",
                            mt:2
                        }} variant="h5">
                            Market Cap : <span>${millify(Number(marketCap))}</span>
                        </Typography>
                        <div className="crypto-daily-change">
                            <Typography sx={{
                                textAlign:"left",
                                fontSize:"1rem"
                            }} variant="h5">
                                Daily Change : <span className={dailyChange.includes('-') ? "loss-text" : "profit-text"} >{millify(Number(dailyChange))}%</span>
                            </Typography>
                            <div className={dailyChange.includes('-') ? "loss" : "profit"}>
                                <PlayArrowRoundedIcon fontSize="medium" />
                            </div>
                        </div>
                    </Paper>
                </Button>
        </>
    )
}

export default CryptoCard;