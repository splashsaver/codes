/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `BetaCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BetaCode_code_key" ON "BetaCode"("code");
