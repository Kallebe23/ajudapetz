-- AlterTable
ALTER TABLE "UserPhoneToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '5 minutes';
