import { useGetCryptoExchangesQuery } from "../api/cryptoExchangesApi";
import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './ExchangeTableRow';
import ExchangesLoadingComponent from "./ExchangesLoadingComponent";
import { ErrorSvg } from "../assets";
import { useSelector } from "react-redux";
import { getThemeState } from "../slices/themeSlice";


const Exchanges = () =>{

    const { data:exchangesData, isFetching, isError } = useGetCryptoExchangesQuery();

    const currentTheme = useSelector(getThemeState);

    const tableBorderColor = currentTheme == "dark" ? "#3b3b3b" : "lightgrey";

    if(isError){
        return(
            <>
                <Box sx={{
                    mt:"17vh"
                }} className="error-svg-cont">
                        <Box sx={{
                            width:{xs:"100%", md:"60vw", lg:"40vw",
                        }
                        }}>
                            <img className="error-svg" src={ErrorSvg} alt="" />
                    </Box>
                </Box>
            </>
        )
    }

    return(
        <>
            <Box sx={{mt:"17vh"}}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{borderColor:tableBorderColor}} >Exchange Name</TableCell>
                                <TableCell sx={{borderColor:tableBorderColor}} align="center">24h Volume(btc)</TableCell>
                                <TableCell sx={{borderColor:tableBorderColor}} align="center">Trust Score</TableCell>
                                <TableCell sx={{borderColor:tableBorderColor}} align="center">Rank</TableCell>
                                <TableCell sx={{borderColor:tableBorderColor}} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isFetching
                                    ?
                                        <ExchangesLoadingComponent />
                                        :
                                        exchangesData?.map((coin) => (
                                            <Row
                                                key={coin.id}
                                                coinName={coin.name}
                                                coinImgUrl={coin.image}
                                                coin24Volume={coin.trade_volume_24h_btc}
                                                coinTrustScore={coin.trust_score}
                                                coinRank={coin.trust_score_rank}
                                                coinCountry={coin.country}
                                                coinDescription={coin.description}
                                                coinPageUrl={coin.url}
                                                coinEst={coin.year_established}
                                            />
                                        ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Exchanges;