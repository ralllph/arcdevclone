import React from "react"
import { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar"
import { Toolbar } from "@material-ui/core"
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logo.svg"
import { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";



//elevate scroll app bar makes app bar float when scrolling
function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  //inline styling syntax mui. Make styles is a hook
  const useStyles = makeStyles(
    //theme is the theme we set up
    theme=>(
      {
        toolBarMargin:{
          //tcheck docs for default. check mixin object
          ...theme.mixins.toolbar,
          marginTop:"3em"
        },
        logo:{
          height:"8em"
        },
        tabContainer:{
          marginLeft:"auto"
        },
        tab:{
          //putting props for tab typiography from theme 
          ...theme.typography.tab,
          //minwidth reduces the sizing of each tab to come closer
          minWidth: 10,
          marginLeft:"25px"
        },
        button:{
          ...theme.typography.estimate,
          borderRadius:"50px",
          marginLeft:"50px",
          marginRight:"25px",
        },
        logoContainer:{
          padding:"0"
        },
        menu:{
          backgroundColor:theme.palette.common.blue,
          color:"white"
        },
        menuItem:{
          ...theme.typography.tab,
          //same opacity as normal tabs
          opacity:"0.7",
          //change the opacity on hover... & is used to denote the element
          "&:hover":{
            opacity:1
          }
        }
      }
    )
  )

const Header = (props)=>{
    //call use style hook to classes
    const classes = useStyles();
    //state to mangeage change of tabs in material ui docs
    const [value,setValue] = useState(0);
    //The following state is for menu that appears when you hover over a tab in the header. e.g service tab
    //anchorEl is to keep state of the dom element we clicked on(requiredinn MUI docs (check Simple menu)) e.g the services tab 
    const [anchorEl, setAnchorEl] = useState(null);
    //state to control if the menu is open or not
    const [open,setOpen] = useState(false);
    //state for holding on to the currently selected index
    const [selectedIndex, setSelectedIndex] = useState(0);

    //menu items array
    const menuItems = [
      { name:"Services",link:"/services"},
      {name:"Custom Software Development",link:"/customsoftware"},
      {name:"Mobile App Development", link:"/mobileapps"},
      {name:"Website Development", link:"/websites"}
    ];

    //handle menu item click
    const handleMenuItemClick =(event, elementIndex)=>{
      //set back the element to null meaning you don't need the pop up to be displayed on any element since it's closed
      setAnchorEl(null);
      //menu closed 
      setOpen(false);
      //capture element just clicked on
      setSelectedIndex(elementIndex);
    }
    //This handle click is for the menu (Mui docs). The menu here is displayed as a pop up
    const handleClick = (e)=>{
      //the element clicked is in the current target
      setAnchorEl(e.currentTarget);
      //also open the menu
      setOpen(true);
    }

    //closing the menu
    const handleClose =(e)=>{
      //set back the element to null meaning you don't need the pop up to be displayed on any element since it's closed
      setAnchorEl(null);
      //menu closed 
      setOpen(false);
    }
    //handle change of tabs method(material ui docs)
    const handleChnage = (event,newValue)=>{
        setValue(newValue);
    }

    //Assigning routes to numbers for use effect
    const pathMap = {
      "/": 0,
      "/services": 1,
      "/customsoftware": 1,
      "/mobileapps": 1,
      "/websites": 1,
      "/revolution": 2,
      "/about": 3,
      "/contact": 4
     
    }
    const menuMap = {
      "/services": 0,
      "/customsoftware": 1,
      "/mobileapps": 2,
      "/websites": 3
    }

    //This use effect fixes the bug where the highlighted tab always goes to home instead of the tab you were on
    //Once component updates or refreshes check the current url and highlight the right tab accordingly
    useEffect(
      ()=>{
            setValue(pathMap[window.location.pathname]);
            setSelectedIndex(menuMap[window.location.pathname]);
        }, [value,selectedIndex]
      )
    return(
        <>
        <ElevationScroll>   
        {//App bar has props of color, position. color is controlled by theme object we set up.
         }
        <AppBar position="fixed">
          {/*Disbale gutters prop takes off excessive padding*/}
            <Toolbar disableGutters>
              {/*Disable ripple button effect on logo using disableRipple */}
              <Button component={Link} to="/" disableRipple className={classes.logoContainer} onClick={()=>setValue(0)}><img src={logo} alt="Company logo" className={classes.logo} /> </Button> 
              {/*the first tab under tabs would be shighlighted since default sate is 0 using value prop  and onchange to handle clicks*/}
              {/* if you dislike the highlighted tab color use indicatorColor prop to change hte  color*/}
              <Tabs className={classes.tabContainer} value={value} onChange={handleChnage}>
                {/* Each tab can be set to the active using values 0,1,2.. according to the order arranged below courtesy of MUI */}
                {/*  component tells material ui that you use link in react router*/}
                <Tab className={classes.tab}  label="Home" component = {Link}  to="/"/>
                {/*Services tab would display a menu to show that you can link to mobile app, and other routes*/}
                {/*aria owns and has popup helps accessiblity for visually impaired users*/}
                {/*Quick note: the handle click passes the element clicked to anchorEl*/}
                <Tab aria-owns={anchorEl ? "simple-menu" : undefined} onMouseOver={(e)=> handleClick(e)}  aria-haspopup={anchorEl? "true" : undefined} className={classes.tab}  label="Services"  component = {Link} to="/services"/>
                <Tab className={classes.tab}  label="The revolution" component = {Link} to="/revolution"/>
                <Tab className={classes.tab}  label="About us" component = {Link} to="/about" />
                <Tab className={classes.tab}  label="Contact us" component = {Link} to="/contact" />
              </Tabs>
              <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
              {/* set up menuu. Can be anywhere reall. id prop should match aria-owns */}
              {/* To close the menu when the tab is not hovered on,. Accordng to docs you need to use menulistprops*/}
              {/* information about overriding is usually contained in the API e.g menu Api.*/}
              {/* Changing the styling on background colour to blue. Such changes involves using the classes prop and overriding paper according to menu Api */}
             
              <Menu id="simple-menu" classes={{paper:classes.menu}}  anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{onMouseLeave:handleClose}} elevation={0} >
                  {
                    menuItems.map((item, i)=>{
                      return (
                        <MenuItem key={i} onClick={(e,i)=>{ handleMenuItemClick(e,i);  setValue(1)}}  selected= {i === selectedIndex && value===1}  component={Link} to={item.link}>{item.name}</MenuItem>
                      )
                    })
                  }
              </Menu>
            </Toolbar>
        </AppBar>
        </ElevationScroll>
        {/*  The point of this div and the use styles is to push contents below the app bar since it's position is fixed */}
        <div className={classes.toolBarMargin}></div>
        </>
    )
}

export default Header