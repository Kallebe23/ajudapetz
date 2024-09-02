/*
  Warnings:

  - The values [WAITING] on the enum `DonationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DonationStatus_new" AS ENUM ('PENDING_APPROVAL', 'OPEN', 'DONE', 'CANCELLED');
ALTER TABLE "Donation" ALTER COLUMN "status" TYPE "DonationStatus_new" USING ("status"::text::"DonationStatus_new");
ALTER TYPE "DonationStatus" RENAME TO "DonationStatus_old";
ALTER TYPE "DonationStatus_new" RENAME TO "DonationStatus";
DROP TYPE "DonationStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserPhoneToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '5 minutes';
