import   { useContext } from "react";
import { ColorModeContext } from "../theme";
import { IconButton, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { NavLink ,Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Header=()=> {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
  return (
    <>
    <header className="header-top-strip py-3">
  <div className="container-xxl">
    <div className="row">
      <div className="col-6">
        <p className="text-white mb-0">
          Free Shipping Over $100 & Free Returns
        </p>
      </div>

      <div className="col-4">
      <div>
      {theme.palette.mode === "light" ? (
        <IconButton
          onClick={() => {
            localStorage.setItem(
              "mode",
              theme.palette.mode === "dark" ? "light" : "dark"
            );
            colorMode.toggleColorMode();
          }}
          color="inherit"
        >
          <LightModeOutlined />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            localStorage.setItem(
              "mode",
              theme.palette.mode === "dark" ? "light" : "dark"
            );
            colorMode.toggleColorMode();
          }}
          color="inherit"
        >
          <DarkModeOutlined />
        </IconButton>
      )}
    </div>
    </div>

      <div className="col-2">
        <p className="text-end text-white mb-0">
          Hotline: <a className="text-white" href="tel:0123456789">+0123456789</a>
        </p>
      </div>
    </div>
  </div>
</header>

<header className="header-upper py-3">
  <div className="container-xxl">
    <div className="row align-items-center">
      <div className="col-2">
        <h2>
          <Link to="/" className="text-white">Dev Corner</Link>
        </h2>
      </div>
      <div className="col-5">
        <div className="input-group">
          <input
            type="text"
            className="form-control py-2"
            placeholder="Search Product Here..."
            aria-label="Search Product Here..."
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text p-3" id="basic-addon2">
            <BsSearch className="fs-6" />
          </span>
        </div>
      </div>
      <div className="col-5">
        <div className="header-upper-links d-flex align-items-center justify-content-between">
          <div>
          <Link to="/compareproduct" className="d-flex align-items-center gap-10 text-white">
          <img src="images/compare.svg" alt="compare" />
          <p className="mb-0">
            Compare <br /> Products
          </p>
        </Link>
          </div>
          <div>
          <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white">
          <img src="images/wishlist.svg" alt="wishlist" />
          <p className="mb-0">
            Favourite <br /> Wishlist
          </p>
        </Link>
          </div>
          <div>
          <Link to="/login" className="d-flex align-items-center gap-10 text-white">
          <img src="images/user.svg" alt="user" />
          <p className="mb-0">
            Log in <br /> My Account
          </p>
        </Link>
          </div>
          <div>
          <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
          <img src="images/cart.svg" alt="cart" />
          <div className="d-flex flex-column gap-10">
            <span className="badge bg-white text-dark">0</span>
            <p className="mb-0">$500</p>
          </div>
        </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<header className="header-bottom py-3">
  <div className="container-xxl">
    <div className="row">
      <div className="col-12">
        <div className="menu-bottom d-flex align-items-center gap-30">
          <div>
          <div className="dropdown">
  <button
    type="button"
    id="dropdownMenuButton1"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
  >
    <img src="images/menu.svg" alt="menu icon" className="me-2" />
    <span className="fs-5 d-inline-block">Shop Categories</span>
  </button>

  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li>
      <a className="dropdown-item" to="">
        Action
      </a>
    </li>
    <li>
      <a className="dropdown-item" to="">
        Another action
      </a>
    </li>
    <li>
      <a className="dropdown-item" to="">
        Something else here
      </a>
    </li>
  </ul>
</div>

          </div>
          <div className="menu-links">
            <div className="d-flex align-items-center gap-15">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/product" className="nav-link">Our Store</NavLink>
              <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</header>

        
    </>
  )
}

export default Header
