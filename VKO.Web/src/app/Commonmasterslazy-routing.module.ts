import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { EmployeeformComponent } from './Views/employeeform/employeeform.component';
import { LocationmasterComponent } from './Views/locationmaster/locationmaster.component';
import { InvestigationRegisterComponent } from './Views/investigation-register/investigation-register.component';

const routes: Routes = [
  { path: 'Employeemaster', component: EmployeeformComponent },
  { path: 'Locationmaster', component: LocationmasterComponent },
  { path: 'InvestigationRegister', component: InvestigationRegisterComponent },
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
    EmployeeformComponent,
    LocationmasterComponent,
    InvestigationRegisterComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CommonmastersLazyRoutingModule { }
