const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const cors = require('cors');
const dotenv=require('dotenv').config()
const PORT=5000
const authRouter=require('./routes/authRoute');
const productRouter=require('./routes/productRoute');
const blogRouter=require('./routes/blogRoute');
const categoryRouter=require('./routes/prodcategoryRoute');
const brandRouter=require('./routes/brandRoute');
const colorRouter=require('./routes/colorRoute');

const couponRouter=require('./routes/couponRoute');
const enqRouter=require('./routes/enqRoute');

const newLocal = './routes/blogCatRoute';
const blogcategoryRouter=require(newLocal);

const cookieParser=require("cookie-parser")
const bodyParser = require("body-parser");
const morgan=require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorhandler");

dbConnect();
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())


app.use(cors());
app.use('/api/user',authRouter)
app.use('/api/product',productRouter)
app.use('/api/blog',blogRouter)
app.use('/api/category',categoryRouter)
app.use('/api/blogcategory',blogcategoryRouter)
app.use('/api/brand',brandRouter)
app.use('/api/color',colorRouter)

app.use('/api/coupon',couponRouter)
app.use('/api/enquiry',enqRouter)



app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});

























