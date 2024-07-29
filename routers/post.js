const express = require("express");
const router = express.Router();

const prisma = require("../prismaClient");
const { auth } = require("../middlewares/auth");

router.get("/posts", async (req, res) => {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: { id: "desc" },
    });

    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = { postRouter: router };
