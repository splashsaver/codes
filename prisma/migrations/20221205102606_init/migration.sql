/*
  Warnings:

  - The `id` column on the `BetaCode` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "BetaCode_id_key";

-- AlterTable
ALTER TABLE "BetaCode" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BetaCode_pkey" PRIMARY KEY ("id");
