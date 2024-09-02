import { auth } from "@/auth";
import { GetSignedUrl } from "@/lib/actions/gcp";
import prisma from "@/lib/prisma";
import { Age, Sex, Species } from "@prisma/client";
import { redirect } from "next/navigation";

interface Params {
  species?: Species | "";
  sex?: Sex | "";
  age?: Age | "";
  page?: number;
}

export async function listDonations(searchParams?: Params) {
  const donationsCount = await prisma.donation.count({
    where: {
      sex: searchParams?.["sex"] || undefined,
      species: searchParams?.["species"] || undefined,
      age: searchParams?.["age"] || undefined,
      status: {
        equals: "OPEN",
      },
    },
  });

  let skip = 0;
  let take = 30;

  if (searchParams?.page) {
    skip = searchParams.page * take;
  }

  const donations = await prisma.donation.findMany({
    skip,
    take,
    where: {
      sex: searchParams?.["sex"] || undefined,
      species: searchParams?.["species"] || undefined,
      age: searchParams?.["age"] || undefined,
      status: {
        equals: "OPEN",
      },
    },
    include: {
      images: true,
      address: true,
      user: {
        select: {
          name: true,
          phone: true,
          useWhatsapp: true,
        },
      },
    },
  });

  const formattedDonations = await Promise.all(
    donations.map(async (donation) => {
      const formattedImages = await Promise.all(
        donation.images.map(async (image) => {
          const signedUrl = await GetSignedUrl(image.objectPath);
          return { url: signedUrl };
        }),
      );
      return { ...donation, images: formattedImages } as any;
    }),
  );
  return { donations: formattedDonations, metadata: { total: donationsCount } };
}

export async function findDonation(donationId?: number) {
  if (!donationId) return null;

  const donation = await prisma.donation.findUnique({
    where: {
      id: donationId,
    },
    include: {
      images: true,
      address: true,
      user: {
        select: {
          name: true,
          phone: true,
          useWhatsapp: true,
        },
      },
    },
  });

  if (!donation) redirect("/publish");

  const formattedImages = await Promise.all(
    donation.images.map(async (image) => {
      const signedUrl = await GetSignedUrl(image.objectPath);
      return { url: signedUrl };
    }),
  );

  const formattedDonation = { ...donation, images: formattedImages };

  return formattedDonation;
}

export async function listUserDonations() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const donations = await prisma.donation.findMany({
    where: {
      userId: session.user.id,
      status: {
        not: "CANCELLED",
      },
    },
    include: {
      images: true,
      address: true,
      user: {
        select: {
          name: true,
          phone: true,
          useWhatsapp: true,
        },
      },
    },
  });

  const formattedDonations = await Promise.all(
    donations.map(async (donation) => {
      const formattedImages = await Promise.all(
        donation.images.map(async (image) => {
          const signedUrl = await GetSignedUrl(image.objectPath);
          return { url: signedUrl };
        }),
      );
      return { ...donation, images: formattedImages } as any;
    }),
  );

  return formattedDonations;
}

export async function listPendingApprovalDonations() {
  const session = await auth();
  if (session?.user?.email !== "kallebegomesmendes@gmail.com") redirect("/");

  const donations = await prisma.donation.findMany({
    where: {
      status: "PENDING_APPROVAL",
    },
    include: {
      images: true,
      address: true,
      user: {
        select: {
          name: true,
          phone: true,
          useWhatsapp: true,
        },
      },
    },
  });

  const formattedDonations = await Promise.all(
    donations.map(async (donation) => {
      const formattedImages = await Promise.all(
        donation.images.map(async (image) => {
          const signedUrl = await GetSignedUrl(image.objectPath);
          return { url: signedUrl };
        }),
      );
      return { ...donation, images: formattedImages } as any;
    }),
  );

  return formattedDonations;
}
