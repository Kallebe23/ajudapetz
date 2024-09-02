import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useMemo } from "react";

import { FaWhatsapp } from "react-icons/fa";
import DonationCarousel from "./DonationCarousel";
import { Button } from "./ui/button";

export type DonationInfo = Prisma.DonationGetPayload<{
  include: {
    images: true;
    address: true;
    user: {
      select: {
        name: true;
        phone: true;
        useWhatsapp: true;
      };
    };
  };
}>;

interface Props {
  donation: DonationInfo;
}

export default function DonationCard({ donation }: Props) {
  const genre = useMemo(() => {
    switch (donation.sex) {
      case "FEMALE":
        return "Fêmea";
      case "MALE":
        return "Macho";
      default:
        return "";
    }
  }, [donation.sex]);

  const ageLabel = useMemo(() => {
    switch (donation.age) {
      case "ADULT":
        return "Adulto";
      case "PUPPY":
        return "Filhote";
      case "SENIOR":
        return "Idoso";
      default:
        return "";
    }
  }, [donation.age]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="min-w-72 cursor-pointer hover:scale-105 transition">
          <CardHeader>
            <CardTitle className="text-md">{donation.title}</CardTitle>
            <CardDescription>{donation.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-60 w-full">
              {!!(donation as any).images[0]?.url && (
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="border object-contain"
                  alt={donation.title}
                  src={(donation as any)?.images[0]?.url}
                />
              )}
            </div>

            <p className="p-2">
              {genre} - {ageLabel}
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <p className="text-sm">
              {donation.address.localidade} - {donation.address.uf}
            </p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>{donation.title}</DialogTitle>
          <DialogDescription>{donation.description}</DialogDescription>
        </DialogHeader>
        <div className="px-8">
          <DonationCarousel images={donation.images} title={donation.title} />
        </div>
        <p>
          {donation.address.bairro} - {donation.address.localidade} -{" "}
          {donation.address.uf}
        </p>
        <div className="flex justify-between items-center">
          <p>{donation.user.name}</p>
          {donation.user.useWhatsapp && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a
                href={`https://wa.me/${donation.user.phone?.replace(/\D/g, "")}`}
                target="_blank"
              >
                <FaWhatsapp className="h-6 w-6" color="green" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
