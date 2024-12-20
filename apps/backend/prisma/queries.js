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

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

export async function createPost(title, text, published) {
  await prisma.post.create({
    data: {
      title,
      text,
      published,
    },
  });
}

export async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getSinglePost(id) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: {
        orderBy: {
          publishedAt: "asc",
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  return post;
}

export async function deletePost(id) {
  await prisma.post.delete({
    where: {
      id,
    },
  });
}

export async function updatePost(id, title, text, published) {
  await prisma.post.update({
    where: {
      id,
    },

    data: {
      title,
      text,
      published,
    },
  });
}

export async function createComment(text, postId, userId) {
  const comment = await prisma.comment.create({
    data: {
      text,
      postId,
      userId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return comment;
}

export async function deleteComment(id) {
  await prisma.comment.delete({
    where: {
      id,
    },
  });
}

export async function updateComment(id, text) {
  const comment = await prisma.comment.update({
    where: {
      id,
    },

    data: {
      text,
    },
  });

  return comment;
}
