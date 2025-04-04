import './App.css';
import Login from './pages/Login';
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from './components/MainLayout';
import Dashboard from "./pages/Dashboard";
import Enquiries from './pages/Enquiries';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from  './pages/Productlist';
import AddBlog from './pages/AddBlog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
function App() {
  return (
   <Router>
 <Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/reset-password" element={<Resetpassword/>}/>
  <Route path="/forgot-password" element={<Forgotpassword/>}/>
  <Route path="/admin" element={<MainLayout/>}>
   <Route index element={<Dashboard/>}/>
   
   <Route path="category" element={<Addcat/>}/>
   <Route path="list-category" element={<Categorylist/>}/>
   <Route path="blog" element={<AddBlog/>}/>
   <Route path="blog-category" element={<Addblogcat/>}/>
   <Route path="blog-list" element={<Bloglist/>}/>
   <Route path="blog-category-list" element={<Blogcatlist/>}/>
   <Route path="Product" element={<Addproduct/>}/>
   <Route path="Product-list" element={<Productlist/>}/>
   <Route path="brand" element={<Addbrand/>}/>
   <Route path="list-brand" element={<Brandlist/>}/>
   <Route path="customers" element={<Customers/>}/>
   <Route path="list-color" element={<Colorlist/>}/>
   <Route path="color" element={<Addcolor/>}/>
   <Route path="orders" element={<Orders/>}/>
   <Route path="enquiries" element={<Enquiries/>}/>
  
   
  </Route>
 </Routes>
   </Router>
  );
}

export default App;

