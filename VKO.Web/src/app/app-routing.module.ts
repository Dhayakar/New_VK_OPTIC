import { Routes, RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { LoginComponent } from './Views/login/login.component';
import { AccessprivilegesComponent } from './Views/accessprivileges/accessprivileges.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'useraccess', component: AccessprivilegesComponent },
  {
    path: 'Commonmasterslazy',
    loadChildren: './Commonmasters.module#CommonmastersLazyModule'
  },
  {
    path: 'Administrationlazy',
    loadChildren: './Administration.module#AdminLazyModule'
  },
  {
    path: 'Opticalslazy',
    loadChildren: './Opticals.module#OpticalsLazyModule'
  },

  {
    path: 'Inventorylazy',
    loadChildren: './Inventory.module#InventoryLazyModule'
  },
  {
    path: 'ExpenseModule',
    loadChildren: './Expense.module#ExpenseLazyModule'
  },
  {
    path: 'Managementlazy',
    loadChildren: './Management.module#ManagementLazyModule'
  },

]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserModule, MatFormFieldModule, MatInputModule
  ],
  exports: [RouterModule, MatFormFieldModule, MatInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
