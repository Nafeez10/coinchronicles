import { Grid2,Paper, Box, Typography, Icon, Skeleton } from "@mui/material"
import { red } from "@mui/material/colors";
import millify from "millify";
import ErrorIcon from '@mui/icons-material/Error';


type statCardType = {
    title:string;
    value: string | number;
    icon: any;
    isFetching:Boolean;
    isError:Boolean;
    detailsPage?:Boolean
}

const StatCard = ({title, value, icon, isFetching, isError, detailsPage}:statCardType) =>{

    return(
    
        <Grid2 size={{xs:6,md:4}}>
            <Paper sx={{
                p:2,
                bgcolor:isFetching ? "loadingStat.main" : isError ? "rgb(82, 3, 3);" : "myColor.main" ,
                color:isFetching ? "black" : isError ? red[100] : "white",
                transition:".5s",
                cursor:"pointer",
                ":hover":{
                    bgcolor:"black"
                }
            }}>
                <Box sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }} >
                    {
                        isFetching ?
                            <Skeleton animation="pulse" height={"2.3rem"} width={'30%'} />
                            : 
                            <Typography sx={{fontSize:"1.2rem"}} variant="h3">
                                {title}:
                            </Typography>
                    }
                    
                    <Icon sx={{
                        width:"30px",
                        height:"30px"
                    }}>
                        {
                            isFetching ? <Skeleton animation="pulse" width={"30px"} height={"30px"} variant="circular" /> : icon
                        }
                        
                    </Icon>
                </Box>
                {
                    isFetching ?
                    <Skeleton animation="pulse" height={"2.5rem"} />
                    :
                    title == "Aprroved Supply"
                    ?
                    <Box sx={{mt:2}}>
                        {value}
                    </Box>
                    :
                    <Typography sx={{
                        fontSize:"2rem",
                        mt:1,
                        // color:'text.primary'
                    }} variant="h4">
                        {isError ? <ErrorIcon /> : detailsPage ? `${value!}` : title == "Total Exchanges" || title == "Total Markets" ? `${millify(value as number)}` : `$${millify(value as number)}`}
                    </Typography>
                }
            </Paper>
        </Grid2>
    )
}

export default StatCard;