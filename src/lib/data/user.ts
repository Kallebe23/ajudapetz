import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function getUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) redirect("/login");

  return user;
}
