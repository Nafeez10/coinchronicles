import { Card, Stack, Box, Skeleton } from "@mui/material"

const NewsCardLoading = () =>{

    return(
        <>
            <Card sx={{py:2}} variant="outlined">
                <Stack spacing={2}>
                    <Box sx={{px:2}} ><Skeleton animation="wave" width={"80%"} height={"2rem"} variant="rectangular" /></Box>
                    <Skeleton animation="wave" width={"100%"} height={"194px"} variant="rectangular" />
                    <Box sx={{px:2}}>
                        <Skeleton width={"100%"} animation="wave" variant="text" />
                        <Skeleton width={"100%"} animation="wave" variant="text" />
                        <Skeleton width={"80%"} animation="wave" variant="text" />
                    </Box>
                    <Box sx={{px:2,display:"flex",justifyContent:"end"}}><Skeleton animation="wave" width={"30%"} height={"1rem"}  variant="rectangular" /></Box>
                    <Box sx={{
                        px:2,  display:"flex", alignItems:"center", justifyContent:"space-between"
                    }}>
                        <Skeleton animation="wave" width={"30%"} height={"20px"} />
                        <Skeleton animation="wave" width={"20%"} height={"20px"} />
                    </Box>
                </Stack>
            </Card>
        </>
    )
}

export default NewsCardLoading;