import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { BookingService } from '../booking.service';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchCustomerComponent } from '../searchcustomer/searchcustomer.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  height: string;
  selectedIndex: number = 0;
  maxNumberOfTabs: number = 2;
  registerationAddForm: FormGroup;
  formInvalid: boolean;
  //calculation variables
  totalcharge = 0;
  numberofdays: number = 4
  checkedcdw: boolean = false;
  showcdwcharge: boolean = false;
  checkedpai: boolean = false;
  showpaicharge: boolean = false;
  bookingtype: any = [
    { value: 'Daily', viewValue: 'Daily' },
    { value: 'Weekly', viewValue: 'Weekly' },
    { value: 'Monthly', viewValue: 'Monthly' }
  ];
  pickuplocation: any = [
    { value: 'Location 1', viewValue: 'Location 1' },
    { value: 'Location 2', viewValue: 'Location 2' },
    { value: 'Location 3', viewValue: 'Location 3' }
  ];
  tariffgroup: any = [
    { value: 'Class A', viewValue: 'Class A' },
    { value: 'Class B', viewValue: 'Class B' },
    { value: 'Class C', viewValue: 'Class C' }
  ];
  vehicle: any = [
    { value: 'vehicle 1', viewValue: 'vehicle 1' },
    { value: 'vehicle 2', viewValue: 'vehicle 2' },
    { value: 'vehicle 3', viewValue: 'vehicle 3' }
  ];
  customer: any = [
    { value: 'customer 1', viewValue: 'customer 1' },
    { value: 'customer 2', viewValue: 'customer 2' },
    { value: 'customer 3', viewValue: 'customer 3' }
  ];
  constructor(
    private router: Router,
    private companyService: BookingService,
    private spinner: NgxSpinnerService,
    private _messageService: MessageService, private formBuilder: FormBuilder,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private bookingservice: BookingService,

  ) {
    this.matIconRegistry.addSvgIcon(
      'Add-Customer',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Add-Customer.svg')
    );
    this.formInvalid = true;
    this.registerationAddForm = this.formBuilder.group({

      bookingtype: new FormControl('', [Validators.required]),
      pickupdate: new FormControl('', [Validators.required]),
      // homephone: new FormControl('', [Validators.required]),
      pickuplocation: new FormControl('', [Validators.required]),
      dropofdate: new FormControl('', [Validators.required]),
      dropofflocation: new FormControl(''),
      tariffgroup: new FormControl(''),
      vehicle: new FormControl(''),
      customer: null,

      rent: new FormControl('', [Validators.required]),
      rentcharge: new FormControl('', [Validators.required]),
      cdwperday: new FormControl(''),
      cdwtotalcharge: new FormControl(''),

      paiperday: new FormControl(''),
      paitotalcharge: new FormControl(''),

      fuel: new FormControl(''),
      fuelcharge: new FormControl(''),

      babyseatpertime: new FormControl(''),
      babyseattotalcharge: new FormControl(''),

      gpspertime: new FormControl(''),
      gpstotalcharge: new FormControl(''),

      liabilityinsuranceonetime: new FormControl(''),
      liabilityinsurencetotalcharge: new FormControl(''),

      othersperday: new FormControl(''),
      othercharge: new FormControl(''),

      discountcharge: new FormControl(''),
      taxcharge: new FormControl('', [Validators.required]),
      totalcharge: new FormControl('', [Validators.required]),
      grandtotal: new FormControl('', [Validators.required]),




      //  phone: new FormControl('', [  
      //   Validators.required,  
      //   Validators.minLength(8),  
      //   Validators.maxLength(12),  
      //   Validators.pattern('^[0-9]*$')]),

    });
  }


  calculateprice(type) {
    console.log('type ', type)
    if (type === 'rent') {
      let rentvalue = this.registerationAddForm.value.rent * this.numberofdays
      this.registerationAddForm.patchValue({ rentcharge: rentvalue })
      this.calculatetotalcharge();
    }
    if (type === 'cdwcharge') {
      let cdwvalue = this.registerationAddForm.value.cdwperday * this.numberofdays
      this.registerationAddForm.patchValue({ cdwtotalcharge: cdwvalue })
      this.calculatetotalcharge()
    } if (type === 'paicharge') {
      let cdwvalue = this.registerationAddForm.value.paiperday * this.numberofdays
      this.registerationAddForm.patchValue({ paitotalcharge: cdwvalue })
      this.calculatetotalcharge()
    }
    if (type === 'fuelcharge') {
      let fuelvalue = this.registerationAddForm.value.fuel * this.numberofdays
      this.registerationAddForm.patchValue({ fuelcharge: fuelvalue })
      this.calculatetotalcharge()
    }
    if (type === 'babyseatpertime') {
      let babyvalue = this.registerationAddForm.value.babyseatpertime
      this.registerationAddForm.patchValue({ babyseattotalcharge: babyvalue })
      this.calculatetotalcharge()
    }
    if (type === 'gpspertime') {
      let gpsvalue = this.registerationAddForm.value.gpspertime
      this.registerationAddForm.patchValue({ gpstotalcharge: gpsvalue })
      this.calculatetotalcharge()
    }

    if (type === 'liabilityinsuranceonetime') {
      let liabilityvalue = this.registerationAddForm.value.liabilityinsuranceonetime
      this.registerationAddForm.patchValue({ liabilityinsurencetotalcharge: liabilityvalue })
      this.calculatetotalcharge()
    }
    if (type === 'othersperday') {
      let othervalue = this.registerationAddForm.value.othersperday * this.numberofdays
      this.registerationAddForm.patchValue({ othercharge: othervalue })
      this.calculatetotalcharge()
    }
  }



  calculatediscount(d) {
    let v = this.registerationAddForm.value;
    let discount = v.discountcharge
    let a = Number(this.registerationAddForm.value.grandtotal);
    this.registerationAddForm.patchValue({ grandtotal: a - discount })
  }

  calculatetotalcharge() {
    let v = this.registerationAddForm.value;
    let tcharge = Number(v.rentcharge) + Number(v.cdwtotalcharge) + Number(v.paitotalcharge) + Number(v.fuelcharge) + Number(v.babyseattotalcharge) + Number(v.babyseattotalcharge) + Number(v.gpstotalcharge) + Number(v.liabilityinsurencetotalcharge) + Number(v.othercharge)
    this.registerationAddForm.patchValue({ totalcharge: tcharge })
    let p = this.registerationAddForm.value.totalcharge / 10
    this.registerationAddForm.patchValue({ taxcharge: p })

    // const grandto = this.registerationAddForm.value.taxcharge + this.registerationAddForm.value.totalcharge
    let a = Number(this.registerationAddForm.value.taxcharge);
    let b = Number(this.registerationAddForm.value.totalcharge);
    let c = Math.round(a) + b;
    this.registerationAddForm.patchValue({ grandtotal: c })
  }
  applydiscount(discount) {
    let disco = Number(this.registerationAddForm.value.discountcharge);
    let v = this.registerationAddForm.value;
    let grandtotal = Number(v.rentcharge) + Number(v.cdwtotalcharge) + Number(v.paitotalcharge) + Number(v.fuelcharge) + Number(v.babyseattotalcharge) + Number(v.babyseattotalcharge) + Number(v.gpstotalcharge) + Number(v.liabilityinsurencetotalcharge) + Number(v.othercharge)

    // let grandtotal = Number(v.rentcharge + v.cdwtotalcharge + v.paitotalcharge + v.fuelcharge + v.babyseattotalcharge + v.babyseattotalcharge + v.gpstotalcharge + v.liabilityinsurencetotalcharge + v.othercharge)
    let taxcharge = this.registerationAddForm.value.taxcharge;
    let total = grandtotal + taxcharge
    this.registerationAddForm.patchValue({ grandtotal: total - disco });
  }

  changecdw(e) {
    if (this.checkedcdw === false) {
      this.checkedcdw = true;
      this.showcdwcharge = true;
    } else {
      this.checkedcdw = false;
      this.showcdwcharge = false;
      this.registerationAddForm.patchValue({ cdwtotalcharge: 0 })
      this.registerationAddForm.patchValue({ cdwperday: '' })
      this.calculatetotalcharge()
    }
  }

  changepai(e) {
    if (this.checkedpai === false) {
      this.checkedpai = true;
      this.showpaicharge = true;
    } else {
      this.checkedpai = false;
      this.showpaicharge = false;
      this.registerationAddForm.patchValue({ paitotalcharge: 0 })
      this.registerationAddForm.patchValue({ paiperday: '' })
      this.calculatetotalcharge()
    }
  }




  ngOnInit() {
    this.bookingservice.selectedcustomer.subscribe((selectedcustomer) => {
      this.setcustomer(selectedcustomer);
    })
  }

  setcustomer(data) {
    if (data === 'default message') {
      return;
    } else {
      let c = [
        { value: '', viewValue: '' },
      ];
      c[0].value = data.id;
      c[0].viewValue = data.data.firstname
      this.customer = c;
      this.registerationAddForm.patchValue({ customer: this.customer[0] });
    }

  }


  searchcustomer() {
    let dialogRef = this.dialog.open(SearchCustomerComponent, {
      width: '65%',
      height: '80%',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.dialogResult = result;
    });
  }

  onsubmit() {
    const todaysdate = new Date();
    this.registerationAddForm.patchValue({ date: todaysdate });
    this.save(this.registerationAddForm.value)
  }

  nextstep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }
 
  save(data) {
    this.spinner.show();
    if (!this.registerationAddForm.valid) {
      Object.keys(this.registerationAddForm.controls).forEach(key => {
        this.registerationAddForm.get(key).markAsTouched({ onlySelf: true });
      });
    } else {
      this.formInvalid = false;
      this.companyService.save(data).then(res => {
        this.spinner.hide();
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Registeration Added successfully' });
        setTimeout(() => {
          this.router.navigate(['registeration/list']);
        }, 2000);
      }).catch(err => {
        this.spinner.hide();
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err['message'] });
      });
    }
  }

}
