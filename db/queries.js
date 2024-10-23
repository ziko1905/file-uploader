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
  size,
  url
) => {
  await prisma.folder.update({
    where: {
      id: +folderId,
    },
    data: {
      files: {
        create: {
          name: fileName,
          extension: extension,
          size: size,
          url: url,
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
      orderBy: {
        creationDate: "desc",
      },
    }),
    prisma.file.findMany({
      where: {
        folderId: folderId,
      },
      orderBy: {
        uploadDate: "desc",
      },
    }),
  ]);
  return [...children[0], ...children[1]];
};

module.exports.makeFolder = async (parentFolderId, folderName, userId) => {
  await prisma.folder.create({
    data: {
      parentFolderId: +parentFolderId,
      name: folderName,
      userId: userId,
    },
  });
};

module.exports.checkFolderOwner = async (folderId, userId) => {
  return !!(await prisma.user.findFirst({
    where: {
      id: +userId,
      folders: {
        some: {
          id: +folderId,
        },
      },
    },
  }));
};

module.exports.checkFileOwner = async (fileId, userId) => {
  return !!(await prisma.user.findFirst({
    where: {
      id: +userId,
      folders: {
        some: {
          files: {
            some: { id: +fileId },
          },
        },
      },
    },
  }));
};

module.exports.updateFolder = async (id, folderName) => {
  await prisma.folder.update({
    where: {
      id: +id,
    },
    data: {
      name: folderName,
    },
  });
};

module.exports.updateFile = async (id, fileName) => {
  await prisma.file.update({
    where: {
      id: +id,
    },
    data: {
      name: fileName,
    },
  });
};

module.exports.getFileUrl = async (id) => {
  const file = await prisma.file.findFirst({
    where: {
      id: +id,
    },
  });
  return file.url;
};

module.exports.getFolderById = async (folderId) => {
  return await prisma.folder.findFirst({
    where: {
      id: +folderId,
    },
  });
};

module.exports.getFileById = async (fileId) => {
  return await prisma.file.findFirst({
    where: {
      id: +fileId,
    },
  });
};

module.exports.deleteFolder = async (folderId) => {
  await prisma.file.deleteMany({
    where: {
      folderId: +folderId,
    },
  });
  await prisma.folder.delete({
    where: {
      id: +folderId,
    },
  });
};

module.exports.deleteFile = async (fileId) => {
  await prisma.file.delete({
    where: {
      id: +fileId,
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
