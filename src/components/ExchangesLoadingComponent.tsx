import { TableRow, TableCell, Skeleton, Box } from "@mui/material"
import { useSelector } from "react-redux";
import { getThemeState } from "../slices/themeSlice";

const ExchangesLoadingComponent = () =>{

    const currentTheme = useSelector(getThemeState);

    const tableBorderColor = currentTheme == "dark" ? "#3b3b3b" : "lightgrey";

    return(
        <>
            {
                Array.from(Array(3)).map((_,i) =>(
                    <TableRow key={i} sx={{ cursor:"pointer" , '& > *': { borderBottom: 'unset' },borderColor:tableBorderColor }}>
                        <TableCell sx={{borderColor:tableBorderColor}} component="th" scope="row">
                            <Box sx={{display:"flex",alignItems:"center",gap:".5rem"}} >
                                <Skeleton animation="wave" width={"2rem"} height={"2rem"} variant="circular" />
                                <Skeleton animation="wave" sx={{width:{xs:"60%",md:"50%"}}} variant="rectangular" />
                            </Box>
                        </TableCell>
                        <TableCell sx={{borderColor:tableBorderColor}} align="center">
                            <Skeleton animation="wave" sx={{width:{xs:"100%",lg:"50%"},mx:"auto"}} variant="rectangular" />
                        </TableCell>
                        <TableCell sx={{borderColor:tableBorderColor}} align="center">
                        <Skeleton animation="wave" sx={{width:{xs:"100%",lg:"50%"},mx:"auto"}} variant="rectangular" />
                        </TableCell>
                        <TableCell sx={{borderColor:tableBorderColor}} align="center">
                            <Skeleton animation="wave" variant="rectangular" />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}

export default ExchangesLoadingComponent;