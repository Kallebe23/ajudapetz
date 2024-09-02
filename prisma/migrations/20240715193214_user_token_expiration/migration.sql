/*
  Warnings:

  - The `expiresAt` column on the `UserPhoneToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPhoneValid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserPhoneToken" DROP COLUMN "expiresAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '5 minutes';
