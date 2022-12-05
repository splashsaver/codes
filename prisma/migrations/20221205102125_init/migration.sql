-- CreateTable
CREATE TABLE "BetaCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BetaCode_id_key" ON "BetaCode"("id");
