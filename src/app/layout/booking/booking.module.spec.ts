import { BookingModule } from './booking.module';

describe('CompanyModule', () => {
  let bookingModule: BookingModule;

  beforeEach(() => {
    bookingModule = new BookingModule();
  });

  it('should create an instance', () => {
    expect(bookingModule).toBeTruthy();
  });
});
