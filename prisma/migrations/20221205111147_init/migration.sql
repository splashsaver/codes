/*
  Warnings:

  - The primary key for the `BetaCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BetaCode` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BetaCode_code_key";

-- AlterTable
ALTER TABLE "BetaCode" DROP CONSTRAINT "BetaCode_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BetaCode_pkey" PRIMARY KEY ("code");
