const { faker } = require("@faker-js/faker");
const prisma = require("../../prismaClient");

async function PostSeeder() {
  const data = [];

  for (let i = 0; i < 5; i++) {
    const content = faker.lorem.paragraph();
    const type = "text";
    const userId = 1;

    data.push({ content, type, userId })
  }

  for (let i = 0; i < 5; i++) {
    const content = faker.image.url();
    const type = "image";
    const userId = 1;

    data.push({ content, type, userId })
  }

  for (let i = 0; i < 5; i++) {
    const content = `https://www.youtube.com/watch?v=${faker.string.uuid()}`;
    const type = "video";
    const userId = 1;

    data.push({ content, type, userId })
  }

  console.log("Post seeding started...");
  await prisma.post.createMany({ data });
  console.log("Post seeding done.");
}

module.exports = { PostSeeder };
