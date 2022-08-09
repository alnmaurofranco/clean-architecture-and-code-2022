-- CreateTable
CREATE TABLE "stock_entries" (
    "id_stock_entry" SERIAL NOT NULL,
    "idItem" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "operation" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_entries_pkey" PRIMARY KEY ("id_stock_entry")
);
