import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./lib/authSendRequest";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "Ajuda Petz <info@ajudapetz.com.br>",
      sendVerificationRequest,
    }),
  ],
  pages: {
    verifyRequest: "verify-request",
  },
});
