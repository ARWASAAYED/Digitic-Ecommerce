const {default :mongoose} = require("mongoose");

const dbConnect=  () => {
  try{
    const conn=mongoose.connect(process.env.MONGODB_URL)
    console.log('database connectted')
  }
  catch(error){
console.log('database error')
  }
  
};
module.exports = dbConnect;


