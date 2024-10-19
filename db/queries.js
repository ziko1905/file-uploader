const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
require("dotenv").config();

async function main() {
  await prisma.$connect();
  module.exports.getUserByEmail = async (email) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };

  module.exports.getUserById = async (id) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  };
}

module.exports.addUser = async (firstName, lastName, email, password) => {
  password = bcrypt.hashSync(password, +process.env.SALT);

  await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
