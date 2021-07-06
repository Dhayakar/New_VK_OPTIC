import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { OpticalOrderComponent } from './Views/optical-order/optical-order.component';
import { OpticalGrnComponent } from './Views/optical-grn/optical-grn.component';
import { LensMasterComponent } from './Views/lens-master/lens-master.component';
import { MaterialreturntovendorComponent } from './Views/materialreturntovendor/materialreturntovendor.component';

const routes: Routes = [
  { path: 'OpticalOrder', component: OpticalOrderComponent },
  { path: 'OpticalGrn', component: OpticalGrnComponent },
  { path: 'LensMaster', component: LensMasterComponent },
  { path: 'OpticalMaterialReturn', component: MaterialreturntovendorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDatepickerModule,
    WebcamModule,
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [
    OpticalOrderComponent,
    OpticalGrnComponent,
    LensMasterComponent,
    MaterialreturntovendorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpticalsLazyRoutingModule { }
