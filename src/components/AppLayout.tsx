import { Outlet } from "react-router";
import { Container, Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AppLayout = () =>{

    return(
        <>
            <Box sx={{position:"relative"}}>
                <Container>
                    <Box sx={{
                        minHeight:"100vh",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between",
                    }}>
                        <Box sx={{mb:20}}>
                            <header>
                                <nav>
                                    <NavBar />  
                                </nav>
                            </header>
                            <main>
                                <Outlet />
                            </main>
                        </Box>
                        <Footer />
                    </Box>
                </Container>
            </Box>
        </>
    )
}
export default AppLayout;