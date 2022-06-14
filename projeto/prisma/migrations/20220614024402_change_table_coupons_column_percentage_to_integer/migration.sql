/*
  Warnings:

  - You are about to alter the column `percentage` on the `coupons` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "coupons" ALTER COLUMN "percentage" SET DATA TYPE INTEGER,
ALTER COLUMN "expire_date" DROP NOT NULL;
