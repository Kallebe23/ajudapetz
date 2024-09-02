"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../prisma";

export default async function repproveDonation(formData: FormData) {
  const session = await auth();

  if (session?.user?.email !== "kallebegomesmendes@gmail.com") redirect("/");

  const donationId = Number(formData.get("donationId"));

  const donation = await prisma.donation.findUnique({
    where: {
      id: donationId,
    },
  });

  if (!donation) {
    return { error: "Doação não encontrada" };
  }

  await prisma.donation.update({
    where: {
      id: donationId,
    },
    data: {
      status: "REPPROVED",
    },
  });

  revalidatePath("/user-announcements");
  revalidatePath("/admin");
}
