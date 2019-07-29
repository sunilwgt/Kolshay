import { RegisterationModule } from './registeration.module';

describe('CompanyModule', () => {
  let registerationModule: RegisterationModule;

  beforeEach(() => {
    registerationModule = new RegisterationModule();
  });

  it('should create an instance', () => {
    expect(registerationModule).toBeTruthy();
  });
});
