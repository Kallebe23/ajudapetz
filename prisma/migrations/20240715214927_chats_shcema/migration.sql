/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `participantId` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[interestedUserId,donorUserId,donationId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorUserId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestedUserId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_donationId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_participantId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "ownerId",
DROP COLUMN "participantId",
ADD COLUMN     "donorUserId" TEXT NOT NULL,
ADD COLUMN     "interestedUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserPhoneToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '5 minutes';

-- CreateIndex
CREATE UNIQUE INDEX "Chat_interestedUserId_donorUserId_donationId_key" ON "Chat"("interestedUserId", "donorUserId", "donationId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_interestedUserId_fkey" FOREIGN KEY ("interestedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_donorUserId_fkey" FOREIGN KEY ("donorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
