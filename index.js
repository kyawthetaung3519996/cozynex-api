const express = require("express");
const app = express();

const prisma = require("./prismaClient");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter } = require("./routers/user");
app.use("/", userRouter);

const { postRouter } = require("./routers/post");
app.use("/", postRouter);

app.listen(8000, () => {
  console.log("Cozynex API started at 8000 ...");
});

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Cozynex API closed.");
    process.exit(0);
  })
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
