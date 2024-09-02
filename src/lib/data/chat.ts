import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function listUserChats() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const userId = session.user.id;

  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        {
          donation: {
            userId,
          },
        },
        { interestedUser: { id: userId } },
      ],
    },
    include: {
      donation: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      interestedUser: {
        select: {
          id: true,
          name: true,
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return { chats, userId };
}

export async function findChat(chatId: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  let chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      donation: true,
      interestedUser: {
        select: {
          name: true,
          id: true,
        },
      },
      messages: {
        orderBy: { createdAt: "asc" },
        include: { sender: { select: { name: true, id: true } } },
      },
    },
  });

  if (!chat) redirect("/");

  return { chat, userId };
}

export async function findDonationChat(donationId: number) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  let chat = await prisma.chat.findUnique({
    where: {
      unique_chat: { donationId, interestedUserId: userId },
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        interestedUserId: userId,
        donationId,
      },
    });
  }

  return { chat, userId };
}
