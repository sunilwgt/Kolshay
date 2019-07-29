import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TimelineComponent, NotificationComponent, ChatComponent } from './components';
import { StatModule } from '../../shared/index';
import { DashboardTopbarMenuComponent } from './dashboard-topbar-menu/dashboard-topbar-menu.component';
import { TranslateModule } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RentalManagementSummaryComponent } from './components/rental-management-summary/rental-management-summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuickLookupComponent } from './components/quick-lookup/quick-lookup.component';



@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule, TranslateModule,
        MatIconModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        NgbPaginationModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        DashboardTopbarMenuComponent,
        RentalManagementSummaryComponent,
        QuickLookupComponent,

    ]
})
export class DashboardModule {}
