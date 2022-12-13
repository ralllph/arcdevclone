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
        }
      }
    )
  )

const Header = (props)=>{
    //call use style hook to classes
    const classes = useStyles();
    //state to mangeage change of tabs in material ui docs
    const [value,setValue] = useState(0);

    //handle change of tabs method(material ui docs)
    const handleChnage = (event,newValue)=>{
        setValue(newValue);
    }

    //This use effect fixes the bug where the highlighted tab always goes to home instead of the tab you were on
    //Once component updates or refreshes check the current url and highlight the right tab accordingly
    useEffect(
      ()=>{
          //check the current path and set value accordingly
          if(window.location.pathname === "/" && value!==0){
            setValue(0);
          }else if(window.location.pathname === "/services" && value!==1 ){
            setValue(1)
          }else if(window.location.pathname === "/revolution" && value!==2 ){
            setValue(2);
          }else if(window.location.pathname === "/about" && value!==3){
            setValue(3);
          }else if(window.location.pathname === "/contact" && value!==4){
            setValue(4);
          }
      }, [value]
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
                {/*  component tells material ui that you use link in react router*/}
                <Tab className={classes.tab}  label="Home" component = {Link}  to="/"/>
                <Tab className={classes.tab}  label="Services"  component = {Link} to="/services"/>
                <Tab className={classes.tab}  label="The revolution" component = {Link} to="/revolution"/>
                <Tab className={classes.tab}  label="About us" component = {Link} to="/about" />
                <Tab className={classes.tab}  label="Contact us" component = {Link} to="/contact" />
              </Tabs>
              <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
            </Toolbar>
        </AppBar>
        </ElevationScroll>
        {/*  The point of this div and the use styles is to push contents below the app bar since it's position is fixed */}
        <div className={classes.toolBarMargin}></div>
        <h2>hello</h2>
        </>
    )
}

export default Header