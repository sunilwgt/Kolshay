import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterationRoutingModule } from './registeration-routing.module';
import { RegisterationService } from './registeration.service';
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

@NgModule({
  imports: [
    CommonModule,
    RegisterationRoutingModule,
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
    ToastModule
    
   
  ],
  declarations: [ListComponent, AddComponent, EditComponent],
  providers: [AngularFirestore, RegisterationService , MessageService]
})
export class RegisterationModule { }
