const postsRouter = require("express").Router();
const Post = require("../models/post");

postsRouter.get("/", async (request, response) => {
  const posts = await Post.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(posts);
});

module.exports = postsRouter;
