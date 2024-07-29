const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { UserSeeder } = require("./UserSeeder");
const { PostSeeder } = require("./PostSeeder");

async function main() {
  try {
    await UserSeeder();
    await PostSeeder();
  } catch (e) {
    console.error(e);
    process.exit(1)
  } finally {
    await prisma.$disconnect();
  }
}

main();
