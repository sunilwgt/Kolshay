import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicelRoutingModule } from './vehicle-routing.module';
import { PageHeaderModule } from '../../shared/index';
import { VehicleComponent } from './vehicle.component';

@NgModule({
  declarations: [VehicleComponent],
  imports: [ CommonModule, PageHeaderModule, VehicelRoutingModule ]
})
export class VehicleModule { }
