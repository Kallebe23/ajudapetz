"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export default async function verifyPhone(_prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const token = formData.get("token");

  if (!token) redirect("/");

  const userToken = await prisma.userPhoneToken.findFirst({
    where: {
      userId: session.user.id,
      token: Number(token),
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!userToken) {
    return { error: "Token inválido ou expirado" };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      isPhoneValid: true,
    },
  });

  revalidatePath("/profile");
  redirect("/profile");
}
