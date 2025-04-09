var express = require("express");
var router = express.Router();
const postsController = require("../controllers/posts");

const upload = require("../middleware/multer");

/* GET users listing. */
router.get("/", postsController.posts);
router.get("/allposts", postsController.allPosts);
router.get("/:id", postsController.onePost);
router.post("/create", upload.array("media"), postsController.createPost);
router.delete("/:id", postsController.deletePost);
router.patch("/:id", postsController.handleLike);
router.put("/:id", postsController.editPost);

module.exports = router;
