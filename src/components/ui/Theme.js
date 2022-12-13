import { createTheme } from "@material-ui/core/styles"
//colour constants
const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
export default createTheme({
    //adding personal colours to the default palette(check material ui docs for default theme object)
    palette:{
        common:{
            blue:`${arcBlue}`,
            orange:`${arcOrange}`,
        },
        //material ui  generates the light and dark version for those colours using primary and secondary
        //the app now uses the main colours specified instead of the default material ui colours
        primary:{
            main:`${arcBlue}`
        },
        secondary:{
            main:`${arcOrange}`
        }
    },
    typography:{
        //defining typiography used for our tabs in header
        tab:{
        fontFamily:"Raleway",
        //naturally the tabs are in all uppercase,ext transform helps disable that
        textTransform: "none",
        fontWeight:"700",
        fontSize: "1rem"
        },
        estimate:{
            //style the text in the button
          fontFamily:"Pacifico",
          fontSize:"1rem",
          //we need to remove some default styling to text using text transform 
          textTransform:"none"
        }
    }
})