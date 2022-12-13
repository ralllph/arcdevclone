import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ui/Theme";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Services from "../pages/Services";
import CustomSoftware from "../pages/CustomSoftware"
import MobileApp from "../pages/MobileApp";
import Websites from "../pages/Websites";
import Revoultion from "../pages/Revolution";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Estimate from "../pages/Estimate";

const App =()=>{
  return (
    <ThemeProvider theme={theme}>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services/>} />
              <Route path="/customsoftware" element={<CustomSoftware/>} />
              <Route path="/mobileaps" element={<MobileApp/>} />
              <Route path="/websites" element={<Websites/>} />
              <Route path="/revolution" element={<Revoultion/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/estimate" element={<Estimate/>} />
          </Routes>
    </ThemeProvider>
  );
}

export default App;
