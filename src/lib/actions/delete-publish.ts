"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export default async function disablePublish(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const donationId = Number(formData.get("donationId"));

  if (!donationId || typeof donationId !== "number") {
    return {
      error: "Parametro inválido",
    };
  }

  const donation = await prisma.donation.findUnique({
    where: {
      id: donationId,
    },
  });

  if (!donation) {
    return { error: "Doação não encontrada" };
  }

  if (donation.userId !== session.user.id) {
    return { error: "Você não é o criador deste anúncio" };
  }

  await prisma.donation.update({
    where: {
      id: donationId,
    },
    data: {
      status: "CANCELLED",
    },
  });

  revalidatePath("/user-announcements");
}
