"use client";
import CEPInput from "@/components/CEPInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import publishPet from "@/lib/actions/publish";
import updatePublish from "@/lib/actions/update-publish";
import { User } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImagesInput from "./ImagesInput";

interface Props {
  donation: any;
  user: User;
}

export default function PublishForm({ donation, user }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [state, setState] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!state?.error) {
      toast.error(state.error);
    }
    if (!!state?.success) {
      toast.success(state.success);
    }
  }, [state]);

  useEffect(() => {
    if (!donation) return;
    (async () => {
      const donationImageFiles = [];
      for (const image of donation.images) {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const file = new File([blob], image.url, { type: blob.type });
        donationImageFiles.push(file);
      }
      setSelectedFiles(donationImageFiles);
    })();
  }, [donation]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      selectedFiles.forEach((file, index) => {
        formData.append("file", file);
      });

      if (!donation) {
        const res = await publishPet({}, formData);
        setState(res);
      } else {
        const res = await updatePublish({}, formData);
        setState(res);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user.phone) {
    return (
      <Alert variant="default" className="w-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Antes de continuar</AlertTitle>
        <AlertDescription>
          Você deve possuir um número de celular cadastrado para publicar um
          anúncio
        </AlertDescription>
        <a className="text-sm underline underline-offset-1" href="/profile">
          Clique aqui para definir um número de celular
        </a>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Input type="hidden" name="donationId" value={donation?.id || ""} />
      <ImagesInput
        selectedFiles={selectedFiles}
        onSelectedFilesChange={setSelectedFiles}
      />
      <Input
        defaultValue={donation?.title || ""}
        required
        placeholder="Título"
        name="title"
      />
      <Textarea
        defaultValue={donation?.description || ""}
        placeholder="Descrição"
        name="description"
      />
      <div className="flex flex-wrap gap-8">
        <Select defaultValue={donation?.species || ""} required name="species">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CAT">Gato</SelectItem>
            <SelectItem value="DOG">Cachorro</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={donation?.sex || ""} required name="sex">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Macho</SelectItem>
            <SelectItem value="FEMALE">Femea</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={donation?.age || ""} required name="age">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Idade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUPPY">Filhote</SelectItem>
            <SelectItem value="ADULT">Adulto</SelectItem>
            <SelectItem value="SENIOR">Idoso</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CEPInput
        defaultValue={donation?.zipCode || ""}
        required
        className="max-w-40"
        placeholder="CEP"
        name="zipCode"
      />
      <Button disabled={loading} className="max-w-40" type="submit">
        {!!donation ? "Salvar" : "Publicar"}
      </Button>
    </form>
  );
}
