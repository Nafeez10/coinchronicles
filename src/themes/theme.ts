import { createTheme } from "@mui/material";
import "@mui/material";
import { PaletteColorOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface ThemeOptions {
    name?: string;
  }
}

declare module '@mui/material/styles' {
    interface Palette {
        loadingStat?: PaletteColorOptions;
    }
    interface PaletteOptions {
        loadingStat?: PaletteColorOptions;
    }

    interface Palette {
        myColor?: PaletteColorOptions;
    }
    interface PaletteOptions {
        myColor?: PaletteColorOptions;
    }

    interface Palette {
        formColor?: PaletteColorOptions;
    }
    interface PaletteOptions {
        formColor?: PaletteColorOptions;
    }

    interface Palette {
        newsForm?: PaletteColorOptions;
    }
    interface PaletteOptions {
        newsForm?: PaletteColorOptions;
    }

    interface Palette {
        inputColor?: PaletteColorOptions;
    }
    interface PaletteOptions {
        inputColor?: PaletteColorOptions;
    }
}

export const darkTheme = createTheme({
    name:"dark",
    palette:{
        background:{
            default:"#000",
            paper:"#1f1f1f"
        },
        primary:{
            main:"#1f1f1f"
        },
        secondary:{
            main: "#1f1f1f"
        },
        text:{
            primary:"#fff",
            secondary:"#fff"
        },
        loadingStat:{
            main:"#1f1f1f"
        },
        myColor:{
            main:"#1f1f1f"
        },
        formColor:{
            main:"#ffffff4b"
        },
        newsForm:{
            main:"#1f1f1f"
        }

    },
    components:{
        MuiCssBaseline:{
            styleOverrides:{
                body:{
                    backgroundColor:"#000"
                }
            }
        },
        MuiSelect:{
            styleOverrides:{
                root:{
                    borderColor:"#ffffff4b",
                    outlineColor:"#ffffff4b"
                }
            }
        },
        // MuiFormControl:{
        //     styleOverrides:{
        //         root:{
        //             borderColor:"#ffffff4b"
        //         }
        //     }
        // }
    }
})

export const lightTheme = createTheme({
    name:"light",
    palette:{
        background:{
            default:"#fff",
            paper:"#fff"
        },
        // primary:{
        //     main:"#1f1f1f"
        // },
        secondary:{
            main: "#000"
        },
        myColor:{
            main:"#1f1f1f"
        },
        text:{
            primary:"#000",
            secondary:"#000"
        },
        inputColor:{
            main:"#fff"
        }
        
    },
    components:{
        MuiCssBaseline:{
            styleOverrides:{
                body:{
                    backgroundColor:"#fff"
                }
            }
        }
    }
})