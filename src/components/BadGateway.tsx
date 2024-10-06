import { BadGatewaySvg } from "../assets";
import { Box } from "@mui/material";

const BadGateway = () =>{

    return(
        <>
            <Box sx={{
                mt:"17vh"
            }} className="error-svg-cont">
                <Box sx={{
                    width:{xs:"100%",sm:"60%", md:"40%", lg:"40%",
                }
                }}>
                    <img className="error-svg" src={BadGatewaySvg} alt="" />
                </Box>
            </Box>
        </>
    )
}

export default BadGateway;