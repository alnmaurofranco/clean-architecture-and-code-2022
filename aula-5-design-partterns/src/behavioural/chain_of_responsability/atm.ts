export class Atm {
  constructor() {}

  withdraw(amount: number) {
    let remaining = amount;
    const bills: { type: number; quantity: number }[] = [];
    const availableBills = [100, 50, 20, 10, 5, 1];
    for (const availableBill of availableBills) {
      const quantity = Math.floor(remaining / availableBill);
      bills.push({ type: availableBill, quantity });
      remaining %= availableBill;
      if (remaining === 0) break;
    }
    return bills;
  }
}
