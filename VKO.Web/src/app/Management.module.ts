import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManagementLazyRoutingModule } from './Management-routing.module';
//import { ManagementDashboardBottomComponent } from './ManagementDashboardBottom.component';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { MatFormFieldModule } from '@angular/material';
import { MaterialModule } from 'src/app/material.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { EncrDecrServiceService } from 'src/app/shared/encr-decr-service.service';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { CommonService } from 'src/app/shared/common.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ManagementLazyRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpClientModule,
    MatPasswordStrengthModule,
    NgxBarcodeModule,
    MaterialModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],

  providers: [CommonService, AuthGuard, DatePipe, EncrDecrServiceService],
})
export class ManagementLazyModule { }
