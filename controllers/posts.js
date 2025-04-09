const Post = require("../models/post");
const cloudinary = require("cloudinary").v2;

const posts = async (req, res) => {
  res.send("Marisela L Fierro's blog API");
};

const allPosts = async (req, res) => {
  await Post.find({})
    .then((response) => {
      const allPosts = response;
      res.status(200).json(allPosts);
    })
    .catch((error) => {
      console.log("Something went wrong. This is the error:");
      console.log(error);
      console.log("Something went wrong. This is the end of the error:");
    });
};

const onePost = async (req, res) => {
  const { id } = req.params;
  await Post.findById(id)
    .then((response) => {
      const post = response;
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log("Something went wrong. This is the error:");
      console.log(error);
      console.log("Something went wrong. This is the end of the error:");
    });
};

const createPost = async (req, res) => {
  const data = req.body;
  const newPost = await new Post({
    reference: data.reference,
    user: data.user,
    title: data.title,
    text: data.text,
    description: data.description,
    likes: data.likes,
    video: data.video,
  });

  if (req.files) {
    newPost.media = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
      mimetype: file.mimetype,
      fileOriginalName: file.originalname,
    }));
  }

  newPost
    .save()
    .then((response) => {
      const post = response;
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log("Something went wrong. This is the error:");
      console.log(error);
      console.log("Something went wrong. This is the end of the error:");
    });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const postToDelete = await Post.findById(id);

  if (postToDelete.media) {
    for (let med of postToDelete.media) {
      await cloudinary.uploader.destroy(med.filename);
    }
  }

  await Post.findByIdAndDelete(id)
    .then((response) => {
      const deletedPost = response;
      res.status(200).json(deletedPost);
    })
    .catch((error) => {
      console.log("Something went wrong, This is the error");
      console.log(error);
      console.log("Something went wrong, This is the end of the error");
    });
};

const handleLike = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  await Post.findOneAndUpdate(
    { _id: id },
    {
      $set: { likes: post.likes + 1 },
    }
  )
    .then((result) => {
      const post = result;
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log("Something went wrong. This is the error:");
      console.log(error);
      console.log("Something went wrong. This is the end of the error:");
    });
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const post = Post.findById(id);
  await Post.findOneAndUpdate(
    { _id: id },
    {
      $set: { title: data.title, description: data.description },
    }
  )
    .then((result) => {
      const post = result;
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log("this is the error", error);
    });
};
``;
module.exports = {
  posts,
  allPosts,
  onePost,
  createPost,
  deletePost,
  handleLike,
  editPost,
};
