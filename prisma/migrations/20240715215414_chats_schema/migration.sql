/*
  Warnings:

  - You are about to drop the column `donorUserId` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[interestedUserId,donationId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_donorUserId_fkey";

-- DropIndex
DROP INDEX "Chat_interestedUserId_donorUserId_donationId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "donorUserId";

-- AlterTable
ALTER TABLE "UserPhoneToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '5 minutes';

-- CreateIndex
CREATE UNIQUE INDEX "Chat_interestedUserId_donationId_key" ON "Chat"("interestedUserId", "donationId");
