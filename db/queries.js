const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
