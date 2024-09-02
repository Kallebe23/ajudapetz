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

import DonationCarousel from "@/components/DonationCarousel";
import { Button } from "@/components/ui/button";
import approveDonation from "@/lib/actions/donation/approve";
import repproveDonation from "@/lib/actions/donation/repprove";
import { FaWhatsapp } from "react-icons/fa";

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

export default function UserAnnouncementCard({ donation }: Props) {
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

  const status = useMemo(() => {
    switch (donation.status) {
      case "CANCELLED":
        return "Cancelado";
      case "DONE":
        return "Concluído";
      case "OPEN":
        return "Publicado";
      case "PENDING_APPROVAL":
        return "Aguardando aprovação";
      default:
        return "";
    }
  }, [donation.status]);

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
      <Card className="min-w-72 transition">
        <CardHeader className="p-2">
          <CardTitle className="text-md flex justify-between">
            {donation.title}
          </CardTitle>
          <CardDescription>{donation.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DialogTrigger asChild>
            <div className="relative h-60 w-full cursor-pointer">
              {!!(donation as any).images[0]?.url && (
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="border object-cover"
                  alt={donation.title}
                  src={(donation as any)?.images[0]?.url}
                />
              )}
            </div>
          </DialogTrigger>

          <p className="p-2">
            {genre} - {ageLabel}
          </p>
          <p className="text-sm p-2">
            {donation.address.localidade} - {donation.address.uf}
          </p>
        </CardContent>
        <div className="w-full border rounded p-2">{status}</div>

        <CardFooter className="p-2 flex gap-2">
          <form className="flex flex-1" action={approveDonation}>
            <input type="hidden" name="donationId" value={donation.id} />
            <Button
              type="submit"
              className="flex-1 bg-green-700 hover:bg-green-400"
            >
              Aprovar
            </Button>
          </form>
          <form className="flex flex-1" action={repproveDonation}>
            <input type="hidden" name="donationId" value={donation.id} />
            <Button className="flex-1 bg-red-700 hover:bg-red-400">
              Reprovar
            </Button>
          </form>
        </CardFooter>
      </Card>
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
