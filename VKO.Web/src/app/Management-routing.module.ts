import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from 'src/app/material.module';
import { WebcamModule } from 'ngx-webcam';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { OpticalDashboardComponent } from './Views/optical-dashboard/optical-dashboard.component';

const routes: Routes = [
  
  { path: 'OpticalDashboard', component: OpticalDashboardComponent },  
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
  declarations: [OpticalDashboardComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ManagementLazyRoutingModule { }
