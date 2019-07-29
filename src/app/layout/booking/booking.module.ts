import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule, MatTableModule} from '@angular/material';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ToastModule} from 'primeng/toast';
import { RegisterationRoutingModule } from '../registeration/registeration-routing.module';
import { BookingService } from './booking.service';
import { BookingRoutingModule } from './booking-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchCustomerComponent } from './searchcustomer/searchcustomer.component';
import {MatDialogModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCustomerComponent } from './addcustomer/addcustomer.component';


@NgModule({
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    NgxSpinnerModule,
    ToastModule,
    BookingRoutingModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule

    
   
  ],
  declarations: [ListComponent, AddComponent, EditComponent,SearchCustomerComponent ,AddCustomerComponent],
  providers: [AngularFirestore, BookingService , MessageService],
  entryComponents: [SearchCustomerComponent ,AddCustomerComponent],
})
export class BookingModule { }
