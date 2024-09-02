"use client";

import { SubmitButton } from "@/components/SubmitButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import verifyPhone from "@/lib/actions/verify-phone";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export function VerifyPhoneForm({ phone }: { phone: string | null }) {
  const [state, formAction] = useFormState(verifyPhone, null);

  useEffect(() => {
    if (state && !!state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      className="p-4 flex max-w-72 border flex-col gap-4 rounded-lg min-w-80"
      action={formAction}
    >
      <h1 className="text-center text-lg font-bold">Verificar celular</h1>
      <p className="text-sm text-center">
        Digite o código enviado em seu celular <b>{phone}</b>
      </p>
      <div className="flex justify-center">
        <InputOTP required maxLength={6} name="token">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <SubmitButton>Validar celular</SubmitButton>
    </form>
  );
}
