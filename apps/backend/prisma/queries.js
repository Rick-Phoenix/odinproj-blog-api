import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(username, email, hash, salt) {
  await prisma.user.create({
    data: {
      username,
      email,
      hash,
      salt,
    },
  });
}

export async function getUser(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}
