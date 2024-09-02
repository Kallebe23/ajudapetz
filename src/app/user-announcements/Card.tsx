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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import disablePublish from "@/lib/actions/delete-publish";
import { MdMoreHoriz } from "react-icons/md";

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
      case "REPPROVED":
        return "Reprovado";
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
    <Card className="min-w-72 cursor-pointer transition">
      <CardHeader className="p-2">
        <CardTitle className="text-md flex justify-between">
          {donation.title}
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MdMoreHoriz className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href={`/publish?donationId=${donation.id}`}>Editar</a>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Deletar</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Tem certeza que deseja deletar este anúncio?
                </DialogTitle>
                <DialogDescription>
                  {donation.title}
                  <br />
                  {genre} - {ageLabel}
                </DialogDescription>
                <form action={disablePublish}>
                  <DialogFooter>
                    <input
                      type="hidden"
                      name="donationId"
                      value={donation.id}
                    />
                    <DialogClose asChild>
                      <Button type="submit">Deletar</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>{donation.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-60 w-full">
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

        <p className="p-2">
          {genre} - {ageLabel}
        </p>
        <p className="text-sm p-2">
          {donation.address.localidade} - {donation.address.uf}
        </p>
      </CardContent>

      <CardFooter className="p-2">
        <div className="w-full border rounded p-2">{status}</div>
      </CardFooter>
    </Card>
  );
}
