import { auth } from "@/auth";

import prisma from "@/lib/prisma";
import { generateUniqueCode } from "@/lib/utils";
import { redirect } from "next/navigation";
import twilio from "twilio";
import { VerifyPhoneForm } from "./Form";

async function LoadOtpMessage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/");

  const tokenAlreadyExists = await prisma.userPhoneToken.findFirst({
    where: {
      userId: user.id,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (tokenAlreadyExists) {
    return { message: "Token já foi enviado", phone: user.phone };
  }

  const phoneNumber = user?.phone;
  const newToken = generateUniqueCode();

  await prisma.userPhoneToken.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      token: newToken,
    },
  });

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  await client.messages.create({
    to: `+55${phoneNumber}`,
    from: "+15855231284",
    body: `AjudaPetz - Código de verificação ${newToken}`,
  });

  return {
    message: "Verifique o código enviado para o seu número",
    phone: user.phone,
  };
}

export default async function VerifyPhonePage() {
  const { phone } = await LoadOtpMessage();

  return (
    <div className="flex flex-1 items-center justify-center">
      <VerifyPhoneForm phone={phone} />
    </div>
  );
}
