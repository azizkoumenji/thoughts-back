const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password, email, birthday } = request.body;

  if (!password) {
    return response.status(400).json({
      error: "User validation failed: password: Path `password` is required.",
    });
  } else if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      password: passwordHash,
      email,
      birthday,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
