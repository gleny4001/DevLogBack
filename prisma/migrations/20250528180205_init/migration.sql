-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "whatIDid" TEXT[],
    "whatsNext" TEXT[],
    "bug" TEXT,
    "score" INTEGER,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
