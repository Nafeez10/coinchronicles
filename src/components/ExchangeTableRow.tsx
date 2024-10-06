import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import Typography from '@mui/material/Typography';
import { TableRow, TableCell } from '@mui/material';
import millify from 'millify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getThemeState } from '../slices/themeSlice';

type propsType = {
    coinName:string;
    coinImgUrl:string;
    coin24Volume:number;
    coinTrustScore:number;
    coinRank:number;
    coinCountry:string;
    coinDescription:string;
    coinPageUrl:string;
    coinEst:number
}

const ExchangeTableRow = ({ coinName, coinImgUrl, coin24Volume, coinTrustScore, coinRank, coinCountry, coinDescription, coinPageUrl, coinEst}:propsType) => {

    const [open, setOpen] = useState(false);

    const currentTheme = useSelector(getThemeState);

    const tableBorderColor = currentTheme == "dark" ? "#3b3b3b" : "lightgrey";

    const pageRedirectElement = (
        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
            <a href={coinPageUrl} target="_blank" className='exchange-link-hover'>
                <span>Visit Page</span>
                <KeyboardBackspaceRoundedIcon fontSize="small" sx={{rotate:"180deg",transition:".3s"}} />
            </a>
        </Box>
    );
  
    return (
      <>
            <TableRow onClick={() => setOpen(!open)} sx={{ cursor:"pointer" , '& > *': { borderBottom: 'unset' },borderColor:tableBorderColor}}>
                <TableCell sx={{borderColor:tableBorderColor}} component="th" scope="row">
                    <Box sx={{display:"flex",alignItems:"center",gap:".5rem"}} >
                        <img className='exchange-coin-img' src={coinImgUrl} alt="coin-image" />
                        {coinName}
                    </Box>
                </TableCell>
                <TableCell sx={{borderColor:tableBorderColor}} align="center">${millify(coin24Volume)}</TableCell>
                <TableCell sx={{borderColor:tableBorderColor}} align="center">{coinTrustScore}</TableCell>
                <TableCell sx={{borderColor:tableBorderColor}} align="center">{coinRank}</TableCell>
                <TableCell sx={{borderColor:tableBorderColor}} >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{color:"text.primary"}}
                        onClick={() => setOpen(!open)}
                    >
                        <KeyboardArrowUpIcon sx={{transition:".2s",rotate: open ? "0deg" : "-180deg"}} />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow sx={{borderColor:tableBorderColor}} >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0,borderColor:tableBorderColor }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1,textJustify:"inter-word",textAlign:"justify" }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {coinName}
                            </Typography>
                            <Typography sx={{mb:1}} variant='body2'>Country : {coinCountry ? coinCountry : "Unknown"}.</Typography>
                            <Typography sx={{display:"block",mb:1}} variant='body2'>Est : {coinEst ? coinEst : "Unknown"}.</Typography>
                            <Typography sx={{width:"100%"}} variant='caption'>{coinDescription ? coinDescription : "There is no Information about this coin to display."}</Typography>
                            {
                                coinPageUrl ? pageRedirectElement : <Typography sx={{display:"block",textAlign:"center",my:2}} variant='body2'>There is no Page URL</Typography>
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
      </>
    );
  }

  export default ExchangeTableRow;