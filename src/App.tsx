import { Box, CssBaseline } from '@mui/material';
import Home from './components/Home';
import { Route, Routes } from 'react-router';
import AppLayout from './components/AppLayout';
import CryptoCurrencies from './components/CryptoCurrencies';
import Exchanges from './components/Exchanges';
import NewsPage from './components/NewsPage';
import CurrencyPage from './components/CurrencyPage';
import {ThemeProvider} from '@mui/material/styles';
import { getThemeState } from './slices/themeSlice';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './themes/theme';
import BadGateway from './components/BadGateway';


function App() {

    const currentTheme = useSelector(getThemeState);

    const themeForApp = currentTheme == "dark" ? darkTheme : lightTheme;

    // console.log(import.meta.env.VITE_HELLO);

    return (
        <>
            <ThemeProvider theme={themeForApp} >
                <CssBaseline />
                <Box sx={{transition:".3s"}}>
                    <Routes>
                        <Route path='/' element={<AppLayout/>} >
                            <Route index element={<Home/>} />
                            <Route path='/cryptocurrencies'>
                                <Route index element={<CryptoCurrencies />} />
                                <Route path=':coinId' element={<CurrencyPage/>} />
                            </Route>
                            <Route path='/exchanges' element={<Exchanges />} />
                            <Route path='/news' element={<NewsPage />} />
                            <Route path='*' element={<BadGateway />} />
                        </Route>
                    </Routes>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default App
