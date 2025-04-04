import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Container from "../components/Container";
const Checkout = () => {
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": "/" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/ &nbsp;
                  <li
                    className="breadcrumb-item active total-price"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item active total-price"
                    aria-current="page"
                  >
                    Shipping
                  </li>
                  &nbsp;/
                  <li
                    className="breadcrumb-item active total-price"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                arwa <br /> arwa@gmail.com
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                className="d-flex gap-15 flex-wrap justify-content-between"
                action=""
              >
                <div className="w-100">
                  <select
                    name="contact-method form-select"
                    className="form-control"
                    id=""
                  >
                    <option value="email" selected disabled>
                      Seclect Country
                    </option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    id=""
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    id=""
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    id=""
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Apartment, Sui"
                    className="form-control"
                    id=""
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    id=""
                  />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Seclect State
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="form-control"
                    id=""
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return To Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue To Shipping
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      1
                    </span>
                    <img
                      className="img-fluid"
                      src={
                        "https://th.bing.com/th/id/OIP.3vM6-pFAQfIW90z7IEcwpgHaH7?w=180&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      }
                      alt="product"
                    />
                  </div>
                  <div>
                    <h5 className="total-price">Product Title</h5>
                    <p className="total-price">Size: S / #agfgfd</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">$100</h5>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$100</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$1000</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="total">Total</p>
              <p className="mb-0 total-price">$1000</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
