const example2 = require("./example2-after");

test("Deve receber um CPF válido A", function () {
  const CPF = "935.411.347-80";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeTruthy();
});

test("Deve receber um CPF válido B", function () {
  const CPF = "357.188.378-05";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeTruthy();
});

test("Deve receber um CPF válido C", function () {
  const CPF = "987.654.321-00";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeTruthy();
});

test("Não deve validar o CPF vazio ou nulo", () => {
  const CPF = "";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeFalsy();
});

test("Não deve validar o CPF (todos os números iguais)", () => {
  const CPF = "111.111.111-11";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeFalsy();
});

test("Não deve validar o CPF (número aleatório)", () => {
  const CPF = "123.456.789-00";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeFalsy();
});

test("Não deve validar o CPF (além do limite)", () => {
  const CPF = "123.456.789-000000";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeFalsy();
});

test("Não deve validar o CPF (abaixo do limite)", () => {
  const CPF = "123456789";
  const isValid = example2.validate(CPF);
  expect(isValid).toBeFalsy();
});
