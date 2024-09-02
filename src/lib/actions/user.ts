"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export default async function updateUser(prevState: any, formData: FormData) {
  const session = await auth();
  const name = formData.get("name") as any;
  const phone = formData.get("phone") as any;
  const useWhatsapp = true;

  if (!session?.user?.id) redirect("/");

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
      phone,
      useWhatsapp,
    },
  });

  revalidatePath("/profile");
  return {
    message: "Perfil atualizado com sucesso",
  };
}
