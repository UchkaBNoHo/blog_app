import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    loved: {
      type: Array,
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    readDuration: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let PostModel;

if (mongoose.models?.post) {
  PostModel = mongoose.models.post;
} else {
  PostModel = mongoose.model("post", Post);
}

export default PostModel;
