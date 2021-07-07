import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from './material.module';
import { WebcamModule } from 'ngx-webcam';
import { CustomerMasterComponent } from './Views/customer-master/customer-master.component';
import { BrandMasterComponent } from './Views/brand-master/brand-master.component';
import { OpticalOrderComponent } from './Views/optical-order/optical-order.component';
import { CustomerOrderComponent } from './Views/customer-order/customer-order.component';
import { CustomerOrderCancellationComponent } from './Views/customer-order-cancellation/customer-order-cancellation.component';
import { OpticalBillingComponent } from './Views/optical-billing/optical-billing.component';
import { OpticalGrnComponent } from './Views/optical-grn/optical-grn.component';
import { OpticalStockSummaryComponent } from './Views/optical-stock-summary/optical-stock-summary.component';
import { OpticalStockLedgerComponent } from './Views/optical-stock-ledger/optical-stock-ledger.component';
import { OpticalComponent } from './Views/optical/optical.component';
import { LensMasterComponent } from './Views/lens-master/lens-master.component';
import { OpticalBillingRegisterComponent } from './Views/optical-billing-register/optical-billing-register.component';
import { LensFrameUploadedComponent } from './Views/lens-frame-uploaded/lens-frame-uploaded.component';
import { LensframestockuploadComponent } from './Views/lensframestockupload/lensframestockupload.component';
import { MaterialreturntovendorComponent } from './Views/materialreturntovendor/materialreturntovendor.component';

const routes: Routes = [
  { path: 'CustomerMaster', component: CustomerMasterComponent },
  { path: 'Brandmaster', component: BrandMasterComponent },
  { path: 'OpticalOrder', component: OpticalOrderComponent },
  { path: 'CustomerOrder', component: CustomerOrderComponent },
  { path: 'CustomerOrderCancellation', component: CustomerOrderCancellationComponent },
  { path: 'OpticalBilling', component: OpticalBillingComponent },
  { path: 'OpticalGrn', component: OpticalGrnComponent },
  { path: 'OpticalStockSummary', component: OpticalStockSummaryComponent },
  { path: 'OpticalStockLedger', component: OpticalStockLedgerComponent },
  { path: 'Optical', component: OpticalComponent },
  { path: 'LensMaster', component: LensMasterComponent },
  { path: 'Opbillreg', component: OpticalBillingRegisterComponent },
  { path: 'LensFrameUploaded', component: LensFrameUploadedComponent },
  { path: 'Lensframestockupload', component: LensframestockuploadComponent },
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
    LensMasterComponent,
    OpticalComponent,
    CustomerMasterComponent,
    BrandMasterComponent,
    OpticalOrderComponent,
    CustomerOrderComponent,
    CustomerOrderCancellationComponent,
    OpticalBillingComponent,
    OpticalGrnComponent,
    OpticalStockSummaryComponent,    
    OpticalStockLedgerComponent,
    OpticalBillingRegisterComponent,
    LensFrameUploadedComponent,
    LensframestockuploadComponent,
    MaterialreturntovendorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpticalsLazyRoutingModule { }
