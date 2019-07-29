import { CustomerModule } from './customer.module';

describe('CompanyModule', () => {
  let registerationModule: CustomerModule;

  beforeEach(() => {
    registerationModule = new CustomerModule();
  });

  it('should create an instance', () => {
    expect(registerationModule).toBeTruthy();
  });
});
