const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
        sold:{
            type: Number,
            default:0,
        }
    },
    images:[],
    color:[],
    tags:[],
    ratings: [
      {
          star: Number,
          comment: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
  ],
  totalrating: {
      type: Number,
      default: 0,
  },
   
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);
// Auto-generate slug before saving
productSchema.pre("save", function (next) {
  if (!this.slug) {
      this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Export the model

module.exports =mongoose.model("Product", productSchema);
