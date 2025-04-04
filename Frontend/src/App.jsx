import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import { HelmetProvider } from 'react-helmet-async';
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import  Login  from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <HelmetProvider>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product" element={<OurStore />} />
              <Route path="product/:id" element={<SingleProduct />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="blogs" element={<Blog />} />
              <Route path="blog/:id" element={<SingleBlog />} />
              <Route path="compareproduct" element={<CompareProduct />}/>
              <Route path="wishlist" element={<Wishlist />}/>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<Signup/>}/>
              <Route path="forgotpassword" element={<Forgotpassword/>}/>
              <Route path="resetpassword" element={<Resetpassword/>}/>
              <Route path="privacypolicy" element={<PrivacyPolicy/>}/>
              <Route path="refundpolicy" element={<RefundPolicy/>}/>
              <Route path="shippingpolicy" element={<ShippingPolicy/>}/>
              <Route path="termsconditions" element={<TermAndContions/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </HelmetProvider>
  );
}

export default App;

