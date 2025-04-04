const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
        },
         
          count: Number,
         color: String,
    
       
      },
    ],
    
    paymentIntent:{} ,
    orderStatus: {
      type: String,
      default: 'Not Processed', 
      enum: ["Pending", "Processing", "Not Processed","Cash on Delivery","Delivered","Dispatched", "Delivered", "Cancelled"],
      
    },
    orderby:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
