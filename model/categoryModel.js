import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let CategoryModel;

if (mongoose.models?.category) {
  CategoryModel = mongoose.models.category;
} else {
  CategoryModel = mongoose.model("category", Category);
}

export default CategoryModel;
