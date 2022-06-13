-- CreateTable
CREATE TABLE "items" (
    "id_item" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "coupons" (
    "code" TEXT NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "orders" (
    "id_order" TEXT NOT NULL,
    "coupon" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "freight" DECIMAL(65,30) NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "price" MONEY NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("order_id","item_id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id_item") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;
