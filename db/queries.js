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
      folders: {
        create: {
          name: "main",
          isMain: true,
        },
      },
    },
  });
};

module.exports.getMainFolder = async (userId) => {
  return await prisma.folder.findFirst({
    where: {
      userId: userId,
      isMain: true,
    },
  });
};

module.exports.addFileToFolder = async (
  folderId,
  fileName,
  extension,
  size
) => {
  await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      files: {
        create: {
          name: fileName,
          extension: extension,
          size: size,
        },
      },
    },
  });
};

module.exports.getChildren = async (folderId) => {
  const children = await Promise.all([
    prisma.folder.findMany({
      where: {
        parentFolderId: folderId,
      },
    }),
    prisma.file.findMany({
      where: {
        folderId: folderId,
      },
    }),
  ]);
  return [...children[0], ...children[1]];
};

module.exports.makeFolder = async (parentFolderId, folderName, userId) => {
  await prisma.folder.create({
    data: {
      parentFolderId: parentFolderId,
      name: folderName,
      userId: userId,
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
