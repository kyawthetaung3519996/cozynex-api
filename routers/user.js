const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "email and password required"});
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ token, user });
    }
  }

  res.status(401).json({ msg: "incorrect email or password" });
});

router.get("/verify", auth, async (req, res) => {
  const user = res.locals.user;
  res.json(user);
})

router.post("/users", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "fistName, lastName, email and password required." });
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: password_hash },
  });

  res.json(user);
})

module.exports = { userRouter: router };
