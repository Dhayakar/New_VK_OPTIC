import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { TaxSummaryComponent } from './Views/tax-summary/tax-summary.component';
import { StockreportComponent } from './Views/stockreport/stockreport.component';
import { ServicerevenueComponent } from './Views/servicerevenue/servicerevenue.component';
import { PoregisterComponent } from './Views/poregister/poregister.component';
import { MedicaprescriptionvsmedicalbillingComponent } from './Views/medicaprescriptionvsmedicalbilling/medicaprescriptionvsmedicalbilling.component';
import { PatientmedicinelistComponent } from './Views/patientmedicinelist/patientmedicinelist.component';
import { DrugStockSummaryComponent } from './Views/drug-stock-summary/drug-stock-summary.component';
import { IcdmasterComponent } from './Views/icdmaster/icdmaster.component';
import { MeterialReturnComponent } from './Views/meterial-return/meterial-return.component';
import { ItemvsvendorComponent } from './Views/itemvsvendor/itemvsvendor.component';
import { InterDepartmentTransferComponent } from './Views/inter-department-transfer/inter-department-transfer.component';
import { InterDepartmentReceiveComponent } from './Views/inter-department-receive/inter-department-receive.component';
import { MedicalbillregistersummaryComponent } from './Views/medicalbillregistersummary/medicalbillregistersummary.component';
import { PocanncelledregisterComponent } from './Views/pocanncelledregister/pocanncelledregister.component';
import { POCANCELLATIONPRINTComponent } from './Views/pocancellationprint/pocancellationprint.component';
import { POCANCELLATIONComponent } from './Views/pocancellation/pocancellation.component';
import { POPRINTComponent } from './Views/poprint/poprint.component';
import { StoremasterComponent } from './Views/storemaster/storemaster.component';
import { VendorMasterComponent } from './Views/vendor-master/vendor-master.component';
import { TaxMasterComponent } from './Views/tax-master/tax-master.component';
import { GRNComponent } from './Views/grn/grn.component';
import { GRNwithoutpoComponent } from './Views/grnwithoutpo/grnwithoutpo.component';
import { PurchaseorderComponent } from './Views/purchaseorder/purchaseorder.component';
import { IndentFormComponent } from './Views/indent-form/indent-form.component';
import { InvestigationBillingComponent } from './Views/investigationBilling/investigationbilling.component';
import { DrugstockledgerComponent } from './Views/drugstockledger/drugstockledger.component';

const routes: Routes = [
    { path: 'Storemaster', component: StoremasterComponent },
    { path: 'Vendormaster', component: VendorMasterComponent },
    { path: 'TAXmaster', component: TaxMasterComponent },
    { path: 'Goodsreceivenote', component: GRNComponent },
  { path: 'Goodsreceiptnote', component: GRNwithoutpoComponent },
  { path: 'Purchaseorder', component: PurchaseorderComponent },
  { path: 'POPRINT', component: POPRINTComponent },
  { path: 'POCANCELLED', component: PocanncelledregisterComponent },
  { path: 'POCANCEllation', component: POCANCELLATIONComponent },
  { path: 'POCENCELLEDPRINT', component: POCANCELLATIONPRINTComponent },
  { path: 'Material', component: MeterialReturnComponent },
  { path: 'ItemvsVendor', component: ItemvsvendorComponent },
  { path: 'InterDepartmentTransfer', component: InterDepartmentTransferComponent },
  { path: 'InterDepartmentReceive', component: InterDepartmentReceiveComponent },
  { path: 'MEDBILL', component: MedicalbillregistersummaryComponent },
  { path: 'TAXSummary', component: TaxSummaryComponent },
  { path: 'Stockreport', component: StockreportComponent },
  { path: 'Srevenue', component: ServicerevenueComponent },
  { path: 'PREGISTER', component: PoregisterComponent },
  { path: 'Precriptonvsbilling', component: MedicaprescriptionvsmedicalbillingComponent },
  { path: 'Pmedlist', component: PatientmedicinelistComponent },
  { path: 'DrugStockSummary', component: DrugStockSummaryComponent },
  { path: 'Indent', component: IndentFormComponent },
  { path: 'drugstockledger', component: DrugstockledgerComponent },
 
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
    IndentFormComponent,
    PurchaseorderComponent,
    GRNwithoutpoComponent,
    GRNComponent,
    TaxMasterComponent,
    VendorMasterComponent,
    StoremasterComponent,
    POPRINTComponent,
    POCANCELLATIONComponent,
    POCANCELLATIONPRINTComponent,
    PocanncelledregisterComponent,
    MedicalbillregistersummaryComponent,
    InterDepartmentReceiveComponent,
    InterDepartmentTransferComponent,
    ItemvsvendorComponent,
    MeterialReturnComponent,
    DrugStockSummaryComponent,
    PatientmedicinelistComponent,
    MedicaprescriptionvsmedicalbillingComponent,
    PoregisterComponent,
    ServicerevenueComponent,
    StockreportComponent,
    TaxSummaryComponent,
    DrugstockledgerComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InventoryLazyRoutingModule { }
