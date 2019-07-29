import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-dashboard-topbar-menu',
  templateUrl: './dashboard-topbar-menu.component.html',
  styleUrls: ['./dashboard-topbar-menu.component.scss'],
  animations: [routerTransition()]
})
export class DashboardTopbarMenuComponent implements OnInit {

  constructor(private translate: TranslateService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'Manage-Inquiries',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Manage-Inquiries.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Daily-Planner',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Daily-Planner.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Vehicle-Type',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Vehicle-Type.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'To-Do',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/To-Do.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Add-Customer',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Add-Customer.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Make-an-agreement',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/Make-an-agreement.svg')
    );
}

  ngOnInit() {
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

}
