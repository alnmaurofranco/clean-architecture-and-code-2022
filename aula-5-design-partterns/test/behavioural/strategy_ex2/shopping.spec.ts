import { BlackFridayDiscountStrategy } from "../../../src/behavioural/strategy_ex2/blackfriday-discount-strategy";
import { DefaultDiscount } from "../../../src/behavioural/strategy_ex2/default-discount";
import { ShoppingCart } from "../../../src/behavioural/strategy_ex2/shopping-cart";

test("Deve mostrar todos os produtos do carrinho", () => {
  const discountStrategy = new DefaultDiscount();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "Taça de Gin", price: 30 },
    { name: "RedBull", price: 9 },
    { name: "Gin Befeeater", price: 120 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getProducts()).toStrictEqual(products);
});

test("Deve calcular o total", () => {
  const discountStrategy = new DefaultDiscount();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "Produto 1", price: 100 },
    { name: "Produto 2", price: 60 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotal()).toBe(160);
});

test("Deve calcular o total com desconto de 10%", () => {
  const discountStrategy = new DefaultDiscount();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "Produto 1", price: 100 },
    { name: "Produto 2", price: 60 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotalWithDiscount()).toBe(144);
});

test("Deve calcular o total com desconto de 20%", () => {
  const discountStrategy = new DefaultDiscount();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "Produto 1", price: 200 },
    { name: "Produto 2", price: 90 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotalWithDiscount()).toBe(232);
});

test("Deve calcular o total com desconto de 30%", () => {
  const discountStrategy = new DefaultDiscount();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "Produto 1", price: 600 },
    { name: "Produto 2", price: 600 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotalWithDiscount()).toBe(840);
});

test("Deve calcular o total com descontos da black friday com 5%", () => {
  const discountStrategy = new BlackFridayDiscountStrategy();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "Produto 1", price: 100 },
    { name: "Produto 2", price: 60 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotalWithDiscount()).toBe(152);
});

test("Deve calcular o total com descontos da black friday com 10%", () => {
  const discountStrategy = new BlackFridayDiscountStrategy();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [
    { name: "JBL GO 3", price: 250 },
    { name: "Tênis", price: 250 },
  ];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotalWithDiscount()).toBe(450);
});

test("Deve calcular o total com descontos da black friday com 15%", () => {
  const discountStrategy = new BlackFridayDiscountStrategy();
  const shoppingCart = new ShoppingCart(discountStrategy);
  const products = [{ name: "JBL Boombox 3", price: 2650 }];
  shoppingCart.addProduct(...products);
  expect(shoppingCart.getTotalWithDiscount()).toBe(2252.5);
});
