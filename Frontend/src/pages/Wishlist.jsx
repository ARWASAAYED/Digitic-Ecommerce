import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
const Wishlist = () => {
return (
    <>
    <Meta title={"Wishlist" }/>
    <BreadCrumb title="Wishlist" />
    <Container class1="wishlist-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-3">
                    <div className="wishlist-card position-relative">
                        <img
                        src="images/cross.svg"
                        alt="cross"
                        className="position-absolute cross img-fluid"
                        />
                        <div className="wishlist-card-image">
                            <img src="images/watch.jpg" alt="watch" />
                        </div>
                        <div className="py-3 px-3">
                            <h5 className="title">
                            Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                            </h5>
                            <h6 className="price mt-3 mb-3">$100</h6>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="wishlist-card position-relative">
                        <img
                        src="images/cross.svg"
                        alt="cross"
                        className="position-absolute cross img-fluid"
                        />
                        <div className="wishlist-card-image">
                            <img src="images/watch.jpg" alt="watch" />
                        </div>
                        <div className="py-3 px-3">
                            <h5 className="title">
                            Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                            </h5>
                            <h6 className="price mt-3 mb-3">$100</h6>
                        </div>
                    </div>
                </div>
                
            </div>
    </Container>
    </>
)
}

export default Wishlist