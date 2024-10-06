import { Typography, Box, Link as MuiLink } from "@mui/material";
import { GitHub, LinkedIn, WhatsApp } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const Footer = () =>{

    const date = new Date();
    const currentYear = date.getFullYear();

    const myLinks = [
        {
            id: 1,
            icon:  <LinkedIn />,
            url: "https://www.linkedin.com/in/nafeez10"
        },
        {
            id: 3,
            icon: <GitHub />,
            url: "https://github.com/Nafeez10"
        },
        {
            id: 2,
            icon: <WhatsApp />,
            url : "https://wa.me/+919095739759?text=Hi%20Nafees"
        }
    ]

    return(
        <>
            <footer className="app-footer">
                <Box sx={{
                    bgcolor:"myColor.main",
                    width:"100%",
                    textAlign:"center",
                    p:2,
                    borderRadius:".3rem",
                }} >
                    <Typography sx={{color:grey[100]}}>
                        &copy; {currentYear} Coin Chronicles | Developed By Mohamed Nafees
                    </Typography>
                    <Box sx={{
                        display:"flex",
                        justifyContent:"center",
                        gap:".8rem",
                        mt:2
                    }}>
                        {
                            myLinks.map( link =>(
                                <MuiLink target="_blank" rel="noreferrer" key={link.id} href={link.url} sx={{
                                    color:grey[100],
                                    transition:".3s",
                                    ":hover":{
                                        color:grey[500]
                                    }
                                }}>
                                    {
                                        link.icon
                                    }
                                </MuiLink>
                            ))
                        }
                    </Box>
                </Box>
            </footer>
        </>
    )
}

export default Footer;