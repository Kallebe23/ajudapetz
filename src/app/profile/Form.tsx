"use client";
import PhoneInput from "@/components/PhoneInput";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import updateUser from "@/lib/actions/user";
import { User } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

interface Props {
  user: User;
}

export default function ProfileForm({ user }: Props) {
  const [state, formAction] = useFormState(updateUser as any, null);

  useEffect(() => {
    if (state && !!(state as any)?.message) {
      toast.success((state as any).message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <Input
        className="w-72"
        required
        placeholder="Email"
        name="email"
        readOnly
        disabled
        defaultValue={user?.email || ""}
      />
      <Input
        className="w-72"
        spellCheck={false}
        required
        placeholder="Nome"
        name="name"
        defaultValue={user?.name || ""}
      />
      <PhoneInput
        isPhoneVerified={!!user?.isPhoneValid}
        userPhone={user.phone}
        className="w-72"
        spellCheck={false}
        placeholder="Celular"
        name="phone"
        defaultValue={user?.phone || ""}
      />
      <Alert variant="default" className="w-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Ao salvar, estou ciente de que meu número de celular será usado em
          todas as minhas publicações.
        </AlertDescription>
      </Alert>

      <SubmitButton className="max-w-40" type="submit">
        Salvar
      </SubmitButton>
    </form>
  );
}
