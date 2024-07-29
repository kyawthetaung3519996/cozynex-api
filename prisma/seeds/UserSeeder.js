const bcrypt = require("bcrypt");
const prisma = require("../../prismaClient");

async function UserSeeder() {
  const password = await bcrypt.hash("password", 10);
  const email = "kyawthetaung319@gmail.com";

  console.log("User seeding started....");

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      firstName: "Kyaw Thet",
      lastName: "Aung",
      email: email,
      password: password
    }
  })

  console.log("User seeding done.");
}

module.exports = { UserSeeder };
