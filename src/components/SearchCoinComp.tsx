import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSearchCryptoCoinsQuery } from "../api/cryptoApi";
import { coinsType } from "../api/cryptoApi";

// though i already have a component like this, the autocomplete component in
// these two components differ. and also i only need to search news after the user clicked 
// the coin in search suggestion i need to configure this component differently which
// leads to a lot of errors which i will fix shortly but for now its two components.

const SearchCoinComp = () =>{

    const [ sortCoinInput, setSortCoinInput ] = useState<string>('');
    const [ searchCoinData, setSearchCoinData ] = useState([] as coinsType[]);
    const { data:searchData, isFetching:searchFetching, isSuccess:searchSuccess } = useGetSearchCryptoCoinsQuery(sortCoinInput);

    useEffect(()=>{
        if(searchData && searchSuccess){
            setSearchCoinData(searchData.data.coins);
        }
    },[searchData])

    const options = searchCoinData.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    return(
        <>
            <Autocomplete
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.name}
                inputValue={sortCoinInput}
                onInputChange={( _, newInputValue ) => {
                    setSortCoinInput(newInputValue);
                }}
                loading={searchFetching}
                color="info"
                sx={{ width: {xs:"100%",md:"70%", lg:"45%" },mb:4, mx:"auto", bgcolor:"newsForm.main", color:"text.primary",  }}
                renderInput={(params) => <TextField color="info" {...params} sx={{ bgcolor:"newsForm.main", color:"text.primary"}} label="Select Crypto Currency" />}
                renderOption={(props,option)=>{
                    const { key, ...optionProps } = props
                    return(
                        <li style={{width:"100%", display:"block"}} key={option.uuid} {...optionProps} >
                            <Link style={{display:"block",width:"100%"}} to={`/cryptocurrencies/${option.uuid}`}>
                                {option.name}
                            </Link>
                        </li>
                    )
                    }
                }
            />
        </>
    )
}

export default SearchCoinComp