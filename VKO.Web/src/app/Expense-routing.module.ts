import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { ExpenseMasterComponent } from './Views/expense-master/expense-master.component';
import { ExpenseTranComponent } from './Views/expense-tran/expense-tran.component';
import { ExpensestatementComponent } from './Views/expensestatement/expensestatement.component';


const routes: Routes = [
  { path: 'Expense', component: ExpenseMasterComponent },
  { path: 'ExpTran', component: ExpenseTranComponent },
  { path: 'Expstatement', component: ExpensestatementComponent },
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
    ExpenseTranComponent,
    ExpenseMasterComponent,
    ExpensestatementComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpenseLazyRoutingModule { }
