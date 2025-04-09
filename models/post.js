const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    media: [
      {
        url: String,
        filename: String,
        mimetype: String,
        fileOriginalName: String,
        required: false,
      },
    ],
    video: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
