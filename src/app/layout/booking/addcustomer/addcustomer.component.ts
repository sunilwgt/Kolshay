import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../customer/customer.service';
// import { CustomerService } from '../customer.service';
// import { RegisterationService } from '../registeration.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  selectedIndex: number = 0;
  maxNumberOfTabs: number = 2;
  registerationAddForm: FormGroup;
  formInvalid: boolean;
  foods: any = [
    { value: 'Doctor 1', viewValue: 'Doctor 1' },
    { value: 'Doctor 2', viewValue: 'Doctor 2' },
    { value: 'Doctor 3', viewValue: 'Doctor 3' }
  ];
  constructor(
    private router: Router,
    private companyService: CustomerService,
    private spinner: NgxSpinnerService,
    private _messageService: MessageService, private formBuilder: FormBuilder
  ) {
    this.formInvalid = true;
    this.registerationAddForm = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      // homephone: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      Address: new FormControl(''),
      city: new FormControl(''),
      policestation: new FormControl(''),
      postoffice: new FormControl(''),
      district: new FormControl(''),
      nationality: new FormControl(''),
      religion: new FormControl(''),

      liscencenumber: new FormControl('', [Validators.required]),
      liscenceissuedate: new FormControl('', [Validators.required]),
      liscenceexpirydate: new FormControl('', [Validators.required]),

      companyname: new FormControl('', [Validators.required]),
      policynumber: new FormControl('', [Validators.required]),
      insuranceexpirydate: new FormControl('', [Validators.required]),

      creditcardtype: new FormControl('', [Validators.required]),
      cardnumber: new FormControl('', [Validators.required]),
      creditexpirydate: new FormControl('', [Validators.required]),
      //  phone: new FormControl('', [  
      //   Validators.required,  
      //   Validators.minLength(8),  
      //   Validators.maxLength(12),  
      //   Validators.pattern('^[0-9]*$')]),
  
    });
  }

  ngOnInit() {
    // this.saves();
  }


  onsubmit() {
    const todaysdate = new Date();
    this.registerationAddForm.patchValue({ date: todaysdate });

    console.log('efo', this.registerationAddForm)
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
  // saves(){
  //   this.companyService.save('data').then((res)=>{
  //     console.log('ewfn' , res)
  //   })
  // }
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
