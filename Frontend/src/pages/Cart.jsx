import { AiFillDelete } from "react-icons/ai";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import { Link } from 'react-router-dom';
import  Container  from "../components/Container";
const Cart = () => {
  return (
    <>
    <Meta title={"Cart"}/>
    <BreadCrumb title="Cart"/>
    <Container class1="cart-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
            </div>

            <div className="cart-data py-3 mb-2 d-flex justify-content-between">
                <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                        <img
                            src={"https://th.bing.com/th/id/OIP.3vM6-pFAQfIW90z7IEcwpgHaH7?w=180&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
                            className="img-fluid"
                            alt="product image"
                        />
                    </div>
                    <div className="w-75">
                        <p className="title">asd</p>
                        <p className="color">Color: 22</p>
                        <p className="size">Size: 33</p>
                    </div>
                </div>
                <div className="cart-col-2 mt-4">
                    <h5 className="price fs-5">$100</h5>
                </div>
                <div className="cart-col-3 gap-15 d-flex align-items-center mb-5">
                    <div>
                        <input
                        className="form-control"
                        type="number"
                        min={1}
                        max={10}
                        id="quantity" 
                        name="quantity" 
                        defaultValue={1}
                        />
                    </div>
                    <div>
                        <AiFillDelete className="text-danger"/>
                    </div>
                </div>
                <div className="cart-col-4 mt-4">
                    <p className="fs-5">$200</p>
                </div>
            </div>
            <div className="col-12 py-2 mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/product" className="button">
          Continue To Shopping
        </Link>
      </div>

      <div className="d-flex flex-column align-items-end">
        <h4>SubTotal: $1888</h4>
        <p>Taxes and shipping calculated at checkout</p>
        <Link to="/checkout" className="button">
          Checkout
        </Link>
      </div>
    </div>
                </div>
            </div>
    </Container>
    </>
  )
}

export default Cart