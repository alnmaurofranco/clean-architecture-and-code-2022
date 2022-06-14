import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      {
        category: "Café",
        description: "Melita",
        price: 13,
        width: 13,
        height: 13,
        length: 10,
        weight: 0.5,
      },
      {
        category: "Leite",
        description: "Parmalat",
        price: 5,
        width: 5,
        height: 5,
        length: 10,
        weight: 0.5,
      },
      {
        category: "Acuçar",
        description: "Barra",
        price: 3,
        width: 3,
        height: 3,
        length: 10,
        weight: 0.5,
      },
      {
        category: "Sucrilhos",
        description: "Nescau",
        price: 1000,
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
      },
      {
        category: "Sucrilhos",
        description: "Kellogrs",
        price: 5000,
        width: 100,
        height: 50,
        length: 50,
        weight: 2,
      },
      {
        category: "Sucrilhos",
        description: "Chocobolinha",
        price: 30,
        width: 10,
        height: 10,
        length: 10,
        weight: 0.9,
      },
    ],
  });

  await prisma.coupon.create({
    data: {
      code: "VALE5",
      percentage: 5,
      expire_date: new Date("2022-08-01"),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
