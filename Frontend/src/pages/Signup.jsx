import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
const Signup = () => {
return (
    <>
    <Meta title={"Sign Up" }/>
    <BreadCrumb title="Sign Up" />
    <div className="login-wrapper py-5 home-wrapper-2">
  <div className="container-xxl">
    <div className="row">
      <div className="col-12">
        <div className="auth-card">
          <h3 className="text-center mb-3">Sign Up</h3>
          <form action="" className="d-flex flex-column gap-15">
            <CustomInput type="text" name="email" placeholder="Name"/>
            <CustomInput type="email" name="email" placeholder="Email" />
            <CustomInput type="tel" name="mobile" placeholder="Mobile Number" />
            <CustomInput type="password" name="password" placeholder="Password"/>
            <div>
                <div className="d-flex justify-content-center gap-15 align-items-center">
                <button className="button border-0">Sign Up</button>
            </div>
        </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
)
}

export default Signup