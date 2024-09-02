"use server";

import { auth } from "@/auth";
import { sendApprovalEmail } from "@/lib/mail/approval";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../prisma";

export default async function approveDonation(formData: FormData) {
  const session = await auth();

  if (session?.user?.email !== "kallebegomesmendes@gmail.com") redirect("/");

  const donationId = Number(formData.get("donationId"));

  const donation = await prisma.donation.findUnique({
    where: {
      id: donationId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
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
      status: "OPEN",
    },
  });

  const { data, error } = await sendApprovalEmail({
    to: donation.user.email,
    donationTitle: donation.title,
  });

  if (error) {
    console.log(error);
  }

  revalidatePath("/user-announcements");
  revalidatePath("/admin");
}
