import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageMagnify from 'react-image-magnify';
import { useState } from "react";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Color from "../components/Color";
import Container from "../components/Container";
const SingleProduct = () => {
    const product = {
        img: "https://th.bing.com/th/id/OIP.3vM6-pFAQfIW90z7IEcwpgHaH7?w=180&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    };
        const copyToClipboard = (text) => {
            console.log("text", text); // Added closing parenthesis and semicolon
            var textField = document.createElement("textarea");
            textField.innerText = text;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            document.body.removeChild(textField);
            alert('Product link copied to clipboard!');
        };
    const [orderedProduct,setorderedProduct ]= useState (true);
return (
    <>
    <Meta title={"Dynamic Blog Name"} />
    <BreadCrumb title="Dynamic Blog Name" />
    <Container class1="main-product-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-6">
                    <div className="main-product-image">
                        <div>
                        <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: 'Product Image',
                                                isFluidWidth: true,
                                                src: product.img,
                                            },
                                            largeImage: {
                                                src: product.img,
                                                width: 1200,
                                                height: 1800,
                                            },
                                            enlargedImageContainerDimensions: {
                                                width: '150%',
                                                height: '150%',
                                            },
                                        }}
                                    />
                        </div>
                       
                    </div>
                </div>
                <div className="col-6">
                <div className="main-product-details">

                    <div className="border-bottom">
                    <h3 className="title">Kids Headphones Bulk 10 Pack Multi Colored For Students</h3>
                    </div>
    
                    <div className="border-bottom p-3">
                        <p className="price">$100</p>
                    <div className="d-flex align-items-center gap-10">
                        <ReactStars 
                            count={5} 
                            size={24} 
                            value={4} 
                            edit={false} 
                            activeColor="#ffd700" 
                        />
                        <p className="mb-0 t-review">2 Reviews</p>
                    </div>
                    <a className="review-btn" href="#review">Write a Review</a>
                    </div>
                    <div className="border-bottom py-3">

    <div className="d-flex gap-10 align-items-center my-2">
        <h3 className="product-heading">Type:</h3>
        <p className="product-data">Watch</p>
    </div>
    
    <div className="d-flex gap-10 align-items-center my-2">
        <h3 className="product-heading">Brand:</h3>
        <p className="product-data">Avelisse</p>
    </div>
    
    {/* Product Category */}
    <div className="d-flex gap-10 align-items-center my-2">
        <h3 className="product-heading">Category:</h3>
        <p className="product-data">Watches</p>
    </div>
    
    {/* Product Tags */}
    <div className="d-flex gap-10 align-items-center my-2">
        <h3 className="product-heading">Tags:</h3>
        <p className="product-data">Watches</p>
    </div>
    
    {/* Product Availability */}
    <div className="d-flex gap-10 align-items-center my-2">
        <h3 className="product-heading">Availability:</h3>
        <p className="product-data">In Stock</p>
    </div>
    <div className="d-flex gap-10 align-items-center mt-2 mb-3">
        <h3 className="product-heading">Size:</h3>
        <div className="d-flex flex-wrap gap-15">
        <span className="badge  border border-1 bg-white text-dark border-secondary">S</span>
        <span className="badge  border border-1 bg-white text-dark border-secondary">M</span>
        <span className="badge  border border-1 bg-white text-dark border-secondary">XL</span>
        <span className="badge  border border-1 bg-white text-dark border-secondary">L</span>
        </div>
    </div>
    <div className="d-flex gap-10 align-items-center mt-2 mb-3">
        <h3 className="product-heading">Color :</h3>
        <Color/>
    </div>
    <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-3">
        <h3 className="product-heading">Quantity:</h3>
        <div className="">
            <input
            type="number"
            min="1"
            className="form-control"
            style={{ width: "70px" }}
            id="quantity-input"
            />
        </div>
    <div className="ms-5 d-flex gap-30 align-items-center">
        <button className="button border-0" type="submit">Add to Card</button>
        <button  className="button signup">Buy it Know</button>
    </div>


    </div>
    <div className="d-flex align-items-center gap-15">
    <div>
        <a href="#">
            <TbGitCompare className="fs-5 me-2"/> Add to Compare
        </a>
    </div>
    <div>
        <a href="#">
            <AiOutlineHeart className="fs-5 me-2"/> Add to Wishlist
        </a>
    </div>
</div>
<div className="d-flex flex-column gap-10 my-3">
            <div className="border-bottom">
                <h3 className="product-heading">Shipping & Returns:</h3>
                <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all US domestic orders within <b>5-10 business days!</b>
                </p>
            </div>

            <div className="d-flex gap-10 align-items-center my-3">
                <h3 className="product-heading">Product Link:</h3>
                <a
                    href="#"
                    onClick={() => copyToClipboard("https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=s")}
                    className="product-link"
                >
                    Copy Product Link
                </a>
            </div>
        </div>

</div>

                    </div>
                </div>
            </div>
        </Container>
    
    <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur nisi similique illum aut perferendis voluptas,
                quisquam obcaecati qui nobis officia. Voluptatibus in harum
                deleniti labore maxime officia esse eos? Repellat?
              </p>
            </div>
          </div>
        </div>
</Container>
        <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                <h4 className="mb-2">Customer Reviews</h4>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0">Based on 2 Reviews</p>
                </div>
                                </div>
                                {orderedProduct && (
                                    <div>
                                        <a className="text-dark text-decoration-underline">Write a Review</a>
                                    </div>
                                )}
                            </div>
                            <div  className="review-form py-4">
                                <h4>Write a Review</h4>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                        count={5}
                                        size={24}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            name=""
                                            id=""
                                            className="w-100 form-control"
                                            placeholder="Comments"
                                            cols="30"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="button border-0">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                <div className="review">
                                    <div className="d-flex align-items-center gap-10">
                                        <h6 className="mb-0" >Navdeep</h6>
                                        <ReactStars
                                        count={5}
                                        size={24}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className="mt-3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Tenetur nisi similique illum aut perferendis voluptas,
                                        quisquam obcaecati qui nobis officia. Voluptatibus in harum
                                        deleniti labore maxime officia esse eos? Repellat?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
        
        <Container class1="popular-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                <ProductCard/>
                </div>
        </Container>
    </>
)
}

export default SingleProduct