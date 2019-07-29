import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from '../customer.service';
// import { RegisterationService } from '../registeration.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedIndex: number = 0;
  maxNumberOfTabs:number =2;
  companyEditForm: FormGroup;
  formInvalid: boolean;
  registerationEditForm: FormGroup;
  constructor(
    private companyService: CustomerService,
    private ac: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.formInvalid = true;
    this.companyEditForm = new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9._\s-]+$/)]),
    });
    this.registerationEditForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
       lastname: new FormControl('', [Validators.required]),
       gender: new FormControl('', [Validators.required]),
       bpl: new FormControl('', [Validators.required]),
       doctorunder: new FormControl('', [Validators.required]),
       profession: new FormControl('', [Validators.required]),
       phone: new FormControl('', [  
        Validators.required,  
        Validators.minLength(8),  
        Validators.maxLength(12),  
        Validators.pattern('^[0-9]*$')]),
       age: new FormControl('', [Validators.required]),
       notes: new FormControl('',),
       Address: new FormControl('',),
       city: new FormControl('',),
       policestation: new FormControl('',),
       postoffice: new FormControl('',),
       district: new FormControl('',),
       nationality: new FormControl('',),
       religion: new FormControl('',),
       emergencyperson: new FormControl('',),
       emergencypersonphone: new FormControl('',),
    });



  }

  ngOnInit() {
    this.spinner.show();
    this.ac.params.subscribe(params => {
      console.log('params' , params)
      this.companyService.getById(params.id).then(resp => {
        console.log('editdata' , resp)
        this.registerationEditForm.patchValue({
          id: params.id,
        });
        this.registerationEditForm.patchValue(resp.data);
        this.spinner.hide();
      }).catch(err => {
        console.log(err);
      });
    });
  }


  tolist(){
    this.router.navigate(['layout/registeration/list'])
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
    if (!this.companyEditForm.valid) {
      Object.keys(this.companyEditForm.controls).forEach(key => {
        this.companyEditForm.get(key).markAsTouched({ onlySelf: true });
      });
    } else {
      this.formInvalid = false;
      this.ac.params.subscribe(params => {
        data['id'] = params.id;
      });
      this.companyService.save(data).then(res => {
        this.spinner.hide();
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Field updated successfully' });
        setTimeout(() => {
          this.router.navigate(['app/company/list']);
        }, 2000);
      }).catch(err => {
        this.spinner.hide();
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err['message'] });
      });
    }
  }

}
