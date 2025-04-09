const Post = require("../models/post");
const cloudinary = require("cloudinary").v2;

const posts = async (req, res) => {
  try {
    res.send("Marisela L Fierro's blog AasdfasdPI");
  } catch {
    (error) => {
      console.log("Error connecting to the database:", error);
      res.status(500).json({ message: "Error connecting to the database" });
    };
  }
};

const allPosts = async (req, res) => {
  await Post.find({})
    .then((response) => {
      const allPosts = response;
      res.status(200).json(allPosts);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts" });
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
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Error fetching post" });
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
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Error fetching post" });
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
      console.error("Error deliting post:", error);
      res.status(500).json({ message: "Error deleting post" });
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
      console.error("Error editing post:", error);
      res.status(500).json({ message: "Error editing post" });
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
      console.error("Error editing post:", error);
      res.status(500).json({ message: "Error editing post" });
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
