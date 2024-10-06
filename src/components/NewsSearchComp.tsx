import { Autocomplete, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useGetSearchCryptoCoinsQuery } from "../api/cryptoApi";
import { coinsType } from "../api/cryptoApi";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

type propsType = {
    newsInputChangeHandeler:(_: any, newInputValue: string | null) => void
}

// though i already have a component like this, the autocomplete component in
// these two components differ. and also i only need to search news after the user clicked 
// the coin in search suggestion i need to configure this component differently which
// leads to a lot of errors which i will fix shortly but for now its two components.

const NewsSearchComp = ({newsInputChangeHandeler}:propsType) =>{

    const [ sortCoinInput, setSortCoinInput ] = useState<string>('');
    const [ searchCoinData, setSearchCoinData ] = useState([] as coinsType[]);
    const { data:searchData, isFetching:searchFetching, isSuccess:searchSuccess } = useGetSearchCryptoCoinsQuery(sortCoinInput);

    useEffect(()=>{
        if(searchData && searchSuccess){
            setSearchCoinData(searchData.data.coins);
        }
    },[searchData])

    const allCoinsName = searchCoinData?.map( (coin:coinsType) => coin.name);

    const autoCompleteOptions = allCoinsName?.length ? allCoinsName : [] as (readonly string[]);

    let optionKey = 0;

    return(
        <>
            <Autocomplete
                popupIcon={<Box sx={{color:"text.primary"}}><ArrowDropDownRoundedIcon /></Box>}
                clearIcon={<Box sx={{color:"text.primary"}}><ClearRoundedIcon /></Box>}
                limitTags={1}
                id="multiple-limit-tags"
                loading={searchFetching}
                options={autoCompleteOptions}
                inputValue={sortCoinInput}
                onInputChange={( _, newInputValue ) => {
                    setSortCoinInput(newInputValue);
                }}
                getOptionLabel={(option) => option}
                value={sortCoinInput}
                onChange={newsInputChangeHandeler}
                renderInput={(params) => (
                    <TextField color="info" {...params} sx={{bgcolor:"newsForm.main", color:"text.primary"}} label="Select Coin to Search" placeholder="Coin name" />
                )}
                renderOption={(props,option)=>{
                    // i also destructured key although there is nothing to do with it 
                    // still i've done it because im spreading the optionProps for the 
                    // li attributes so if i havent destructured it , then it will be place twice .
                    const { key, ...optionProps } = props
                    return(
                        <li style={{width:"100%", display:"block"}} key={optionKey++} {...optionProps} >
                            {option}
                        </li>
                    )
                    }
                }
                onError={(_)=><p>Error</p>}
                sx={{ width: {xs:"100%",md:"70%", lg:"45%" },mb:4, mx:"auto", bgcolor:"newsForm.main", color:"text.primary",  }}
            />
        </>
    )
}

export default NewsSearchComp;