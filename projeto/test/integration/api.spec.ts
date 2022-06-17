import axios from "axios";

test("Deve testar a API /oders (POST) ", async () => {
  const response = await axios.post("http://localhost:3333/orders", {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2022-06-05"),
    coupon: "VALE5",
  });

  const order = response.data;
  expect(order.total).toBe(75.65);
});

test("Deve testar a API /simulate-freight (POST) ", async () => {
  const response = await axios.post("http://localhost:3333/simulate-freight", {
    items: [
      {
        idItem: 4,
        quantity: 1,
      },
      {
        idItem: 5,
        quantity: 1,
      },
      {
        idItem: 6,
        quantity: 3,
      },
    ],
  });

  const simulateFreight = response.data;
  expect(simulateFreight.amount).toBe(80);
});
