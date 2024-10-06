import { AppBar, Container, Toolbar, Typography, Button, SwipeableDrawer, Box, IconButton, styled } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType } from '../app/store';
import { changeTheme, getThemeState } from '../slices/themeSlice';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const NavBar = () =>{

    const currentTheme = useSelector(getThemeState);

    const dispatch = useDispatch<dispatchType>();

    const [ showDrawer, setShowDrawer ] = useState<boolean|undefined>(false);
    
    const CustomBtn = styled(Button)({
        color:"white",
        marginLeft:'1rem',
    })

    const navBtn = [
        {
            label:"Home",
            path:'/',
            icon:<HomeRoundedIcon />
        },
        {
            label:"Exchanges",
            path:'/exchanges',
            icon:<CurrencyExchangeRoundedIcon />
        },
        {
            label:"crypto Currencies",
            path:'/cryptocurrencies',
            icon:<PriceChangeRoundedIcon />
        },
        {
            label:"news",
            path:'/news',
            icon:<NewspaperRoundedIcon />
        },
    ]

    const themeHandeler = () =>{
        if(currentTheme == "dark" ){
            dispatch(changeTheme("light"));
        }else{
            dispatch(changeTheme("dark"));
        }
    }

    return(
        <>
            <SwipeableDrawer
                anchor={"left"}
                open={showDrawer}
                onClose={()=>setShowDrawer(false)}
                onOpen={()=>setShowDrawer(true)}
            >
                <Box sx={{
                    bgcolor:"black",
                    height:"100%",
                    width:"100%",
                    display:"flex",
                    flexDirection:"column",
                    py:"2rem"
                }}>
                    <Typography sx={{color:"white", fontSize:"1.2rem",mb:'1rem',ml:"1.2rem",fontWeight:'500'}} variant='h2'>
                        Navigation
                    </Typography>
                    {
                        navBtn.map((btn)=>(
                            <NavLink className={({isActive}) => isActive ? "activeDrawer" : '' } key={btn.label} to={btn.path} >
                                <Button
                                    startIcon={btn.icon}
                                    onClick={()=>setShowDrawer(false)}
                                    sx={{
                                    justifyContent:"left",
                                    mb:"1rem",
                                    color:"white",
                                    px:"2rem",
                                    width:'100%'
                                    }}
                                >
                                    {btn.label}
                                </Button>
                            </NavLink>
                        ))
                    }
                </Box>
            </SwipeableDrawer>
            <AppBar sx={{
                bgcolor:"myColor.main",
                height:"13vh",
                display:"flex",
                // alignItems:"center",
                justifyContent:"center"
            }} >
                <Toolbar >
                    <Container sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <IconButton
                                sx={{
                                    display:{sm:'block',lg:'none'},
                                    mr:"1rem",
                                    p:0
                                }}
                                onClick={()=>setShowDrawer(true)}
                            >
                                <MenuRoundedIcon sx={{color:'white'}} fontSize='large' />   
                            </IconButton>
                            <h1 className='playwrite-cuba logo-font'>CoinChronicles.</h1>
                        </Box>
                        <Box sx={{
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}>
                            <Box sx={{
                                display:{xs:"none",lg:"block"}
                            }}>
                                {
                                    navBtn.map( btn =>(
                                        <NavLink className={({isActive}) => isActive ? "active" : '' } key={btn.label} to={btn.path} >
                                            <CustomBtn>
                                                {btn.label}
                                            </CustomBtn>
                                        </NavLink>
                                    ))
                                }
                            </Box>
                            <Box>
                                <IconButton onClick={themeHandeler} sx={{color:"white",ml:"1rem",transition:".3s", ":active":{scale:".9"}}}>
                                    {
                                        currentTheme == "dark" ? <LightModeRoundedIcon /> : <NightsStayRoundedIcon />
                                    }
                                </IconButton>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        
        </>
    )
}

export default NavBar;
