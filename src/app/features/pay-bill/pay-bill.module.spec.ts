import { PayBillModule } from './pay-bill.module';

describe('PayBillModule', () => {
  let payBillModule: PayBillModule;

  beforeEach(() => {
    payBillModule = new PayBillModule();
  });

  it('should create an instance', () => {
    expect(payBillModule).toBeTruthy();
  });
});
