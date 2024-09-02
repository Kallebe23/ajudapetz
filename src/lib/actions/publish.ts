"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../prisma";
import { storage } from "../storage";

export default async function publishPet(
  initialState: any,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const title = formData.get("title") as any;
  const description = formData.get("description") as any;
  const species = formData.get("species") as any;
  const sex = formData.get("sex") as any;
  const age = formData.get("age") as any;
  const zipCode = formData.get("zipCode") as string;

  const images = formData.getAll("file") as File[];

  if (!images.length) {
    return { error: "Adicione pelo menos 1 imagem!", success: "" };
  }

  if (images.length > 6) {
    return { error: "Você pode adicionar no máximo 6 imagens", success: "" };
  }

  const cepInfoRes = await fetch(
    `https://viacep.com.br/ws/${zipCode.replace(/\D/g, "")}/json/`,
  );

  if (!cepInfoRes.ok) {
    return { error: "CEP inválido", success: "" };
  }

  const cepInfo = await cepInfoRes.json();

  if (!!cepInfo.erro) {
    return { error: "CEP inválido", success: "" };
  }

  const donation = await prisma.donation.create({
    data: {
      title,
      description,
      species,
      sex,
      age,
      zipCode,
      status: "PENDING_APPROVAL",
      user: {
        connect: {
          id: session.user.id,
        },
      },
      address: {
        create: {
          ...cepInfo,
        },
      },
    },
  });

  await Promise.all(
    images.map(async (image, index) => {
      const objectPath = `/donations/${donation.id}/${index}`;

      await prisma.donationImage.create({
        data: {
          objectPath: objectPath,
          donation: {
            connect: {
              id: donation.id,
            },
          },
        },
      });

      const buffer = await image.arrayBuffer();
      await storage
        .bucket("get-a-pet-images")
        .file(objectPath)
        .save(Buffer.from(buffer));
    }),
  );

  revalidatePath("/user-announcements");
  redirect("/user-announcements");
}
