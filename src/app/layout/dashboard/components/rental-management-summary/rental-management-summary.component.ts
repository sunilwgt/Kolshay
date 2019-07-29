import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-rental-management-summary',
  templateUrl: './rental-management-summary.component.html',
  styleUrls: ['./rental-management-summary.component.scss']
})
export class RentalManagementSummaryComponent implements OnInit {

  countryForm: FormGroup;
  countries = [{
    id: '8f8c6e98',
    name: 'USA',
    code: 'USD'
   },
   {
    id: '169fee1a',
    name: 'Canada',
    code: 'CAD'
   },
   {
    id: '3953154c',
    name: 'UK',
    code: 'GBP'
   }];


  constructor(private fb: FormBuilder, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'Todays_Reservation',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Todays_Reservation.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Todays_Arivals',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Todays_Arivals.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Over_Dues',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Over_Dues.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Opened_Agreements',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Opened_Agreements.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Pending_Payment',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Pending_Payment.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Service_Alerts',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Service_Alerts.svg')
    );
  }

  ngOnInit() {
    this.countryForm = this.fb.group({
      countryControl: [this.countries[1]]
    });
  }

}
