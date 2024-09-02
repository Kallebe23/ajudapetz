"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function createChat(donationId: number, userId: string) {
  const chat = await prisma.chat.create({
    data: {
      donationId,
      interestedUserId: userId,
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

  return chat;
}

export async function sendMessage(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const senderId = session.user.id;
  const chatId = formData.get("chatId") as string;
  const content = formData.get("content") as string;

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { donation: true },
  });

  if (!chat) return null;

  await prisma.message.create({
    data: {
      content,
      senderId,
      chatId,
    },
  });

  revalidatePath(`/chats/${chatId}`);
}
