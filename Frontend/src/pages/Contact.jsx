
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";

const Contact = () => {
  return (
    <>
      <Meta title={"Contact Us" }/>
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56304.50761535181!2d30.791705846786517!3d28.11506391415327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145b24f09217d047%3A0x742598a281e93ed0!2z2YXZhtiq2KzYuSDYrdmI2LHYsyDYp9mE2LPZitin2K3Zig!5e0!3m2!1sar!2seg!4v1730328287220!5m2!1sar!2seg"
                width="100%"
                height="450"
                className="border-0 w-100"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
              <h3 className="contact-title mb-4">Contact Us</h3>
              <form className="d-flex flex-column gap-15">
              <div><input type="text" className="form-control" placeholder="Name" /></div>
              <div><input type="email" className="form-control" placeholder="Email" /></div>
              <div><input type="text" className="form-control" placeholder="Mobile Number" /></div>
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
                <div>
                <button className="button border-0">Submit</button>
                </div>
              </form>
            </div>
              <div>
              <h3 className="contact-title mb-4">Get in touch with us</h3>
              <div>
              <ul className="ps-0">
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <AiOutlineHome className="fs-5" />
                  <address className="mb-0">
                    Hno: 277, Nasr City, Cairo
                  </address>
                </li>
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <BiPhoneCall className="fs-5" />
                  <a href="tel:+0123456789">+0123456789</a>
                </li>
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <AiOutlineMail className="fs-5" />
                  <a href="mailto:youremail@example.com">youremail@example.com</a>
                </li>
                <li className="mb-3 d-flex gap-3 align-items-center">
                  <BiInfoCircle className="fs-5" />
                  <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default Contact;
