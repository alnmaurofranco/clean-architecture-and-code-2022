import { CPF } from "../../src/domain/entity/cpf";

test("Deve receber um CPF válido A", function () {
  const cpf = new CPF("935.411.347-80");
  expect(cpf).toBeTruthy();
});

test("Deve receber um CPF válido B", function () {
  const cpf = new CPF("357.188.378-05");
  expect(cpf).toBeTruthy();
});

test("Deve receber um CPF válido C", function () {
  const cpf = new CPF("987.654.321-00");
  expect(cpf).toBeTruthy();
});

test("Deve tentar validar um CPF inválido", () => {
  expect(() => new CPF("123.456.789-99")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um CPF com todos os dígitos iguais", () => {
  expect(() => new CPF("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um CPF inválido muito grande", () => {
  expect(() => new CPF("123.456.789-000000")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um CPF inválido muito pequeno", () => {
  expect(() => new CPF("123.456")).toThrow(new Error("Invalid CPF"));
});
